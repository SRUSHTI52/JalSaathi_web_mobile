from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import base64
import cv2
import numpy as np
import requests
from bson import ObjectId
import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("nomura-9ed47-firebase-adminsdk-fbsvc-94dd9a0fbe.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://srushtiporiwade02:happy49@cluster0.qa50c0v.mongodb.net/nomura?retryWrites=true&w=majority")
db = client["nomura"]
users = db["users"]
drives_pending = db["drives_pending"]
drives_completed = db["drives_completed"]

MY_DEVICE_TOKEN = "f0NqsOtnSFuxqJUmT6_6st:APA91bGyEJBGLcvbehg7HpZf92J10yP93GSHGnYVexCNgzhqrUQh62ew1JPLKJQidcCnq37mepFLigo-oEkFW9hfNsgcS49MDvlt6Aq_Tyt5ReqjMdRxW5g"

def send_fcm_message(token, title, body):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=token,
    )

    try:
        response = messaging.send(message)
        print('✅ FCM message sent:', response)
    except Exception as e:
        print('❌ Error sending FCM message:', str(e))


@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already registered"}), 400
    data["verified"] = False
    users.insert_one(data)
    return jsonify({"message": "Signup successful, pending admin approval"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["email"] == "admin@example.com" and data["password"] == "admin123":
        return jsonify({
            "message": "Admin login successful",
            "user": {
                "name": "Admin",
                "organization": "Admin Panel",
                "email": "admin@example.com"
            }
        })
    user = users.find_one({"email": data["email"], "password": data["password"]})
    if user:
        if not user["verified"] and user["email"] != "admin@example.com":
            return jsonify({"message": "Not yet verified by admin"}), 403
        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user.get("name"),
                "email": user.get("email"),
                "organization": user.get("organization")
            }
        })
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/admin/unverified", methods=["GET"])
def get_unverified():
    all_users = users.find({"verified": False})
    return jsonify([
        {
            "id": str(user["_id"]),
            "name": user.get("name"),
            "organization": user.get("organization"),
            "email": user.get("email"),
            "phone": user.get("phone", ""),
            "instagram": user.get("instagram", ""),
            "website": user.get("website", ""),
            "facebook": user.get("facebook", "")
        } for user in all_users
    ])

@app.route("/admin/verify/<user_id>", methods=["POST"])
def verify_user(user_id):
    users.update_one({"_id": ObjectId(user_id)}, {"$set": {"verified": True}})
    return jsonify({"message": "User verified"})

# @app.route("/add-drive-pending", methods=["POST"])
# def add_drive_pending():
#     data = request.json
#     drives_pending.insert_one(data)
#     return jsonify({"message": "Pending drive added"})

@app.route("/add-drive-pending", methods=["POST"])
def add_drive():
    data = request.json
    db["drives"].insert_one(data)

    # Send notification to the one device
    send_fcm_message(
        MY_DEVICE_TOKEN,
        "📣 New Beach Drive!",
        f"{data['title']} on {data['date']} at {data['location']}"
    )

    return jsonify({"message": "Drive added and notification sent!"})

@app.route("/drives-pending", methods=["POST"])
def get_pending():
    org = request.json.get("org")
    data = drives_pending.find({"organization": org})
    return jsonify([{**d, "_id": str(d["_id"])} for d in data])

@app.route("/drives-completed", methods=["POST"])
def get_completed_drives():
    org = request.json.get("org")
    completed = drives_completed.find({"organization": org})
    return jsonify([
        {
            "_id": str(d["_id"]),
            "title": d["title"],
            "date": d["date"],
            "location": d["location"],
            "organization": d["organization"],
            "waste_collected_kg": d.get("waste_collected_kg", 0),
            "plastic_items": d.get("plastic_items", 0),
            "glass_items": d.get("glass_items", 0)
        }
        for d in completed
    ])

@app.route("/impact-analytics", methods=["POST"])
def get_impact_analytics():
    org = request.json.get("org")
    
    # Get all completed drives for the organization
    completed_drives = list(drives_completed.find({"organization": org}))
    
    # Calculate totals
    total_waste = sum(d.get("waste_collected_kg", 0) for d in completed_drives)
    total_plastic = sum(d.get("plastic_items", 0) for d in completed_drives)
    total_glass = sum(d.get("glass_items", 0) for d in completed_drives)
    total_drives = len(completed_drives)
    
    # Group drives by month for trend analysis
    monthly_data = {}
    for drive in completed_drives:
        date = drive.get("date", "")
        if date:
            try:
                # Assume date format is YYYY-MM-DD or similar
                month = date[:7]  # Extract YYYY-MM
                if month not in monthly_data:
                    monthly_data[month] = {"waste": 0, "plastic": 0, "glass": 0, "drives": 0}
                monthly_data[month]["waste"] += drive.get("waste_collected_kg", 0)
                monthly_data[month]["plastic"] += drive.get("plastic_items", 0)
                monthly_data[month]["glass"] += drive.get("glass_items", 0)
                monthly_data[month]["drives"] += 1
            except:
                pass
    
    # Convert monthly data to chart format
    chart_data = []
    for month, data in sorted(monthly_data.items()):
        chart_data.append({
            "month": month,
            "waste": data["waste"],
            "plastic": data["plastic"],
            "glass": data["glass"],
            "drives": data["drives"]
        })
    
    return jsonify({
        "totals": {
            "total_waste": total_waste,
            "total_plastic": total_plastic,
            "total_glass": total_glass,
            "total_drives": total_drives
        },
        "monthly_data": chart_data,
        "waste_classification": {
            "plastic": total_plastic,
            "glass": total_glass,
            "other": max(0, total_waste - (total_plastic * 0.1 + total_glass * 0.2))  # Rough estimate
        }
    })

@app.route('/analyze_satellite', methods=['POST'])
def analyze_satellite():
    try:
        # Check if files are present
        if 'before_image' not in request.files or 'after_image' not in request.files:
            return jsonify({'error': 'Both images are required'}), 400
        
        before_file = request.files['before_image']
        after_file = request.files['after_image']
        
        # Read images
        before_bytes = np.frombuffer(before_file.read(), np.uint8)
        after_bytes = np.frombuffer(after_file.read(), np.uint8)
        
        before_img = cv2.imdecode(before_bytes, cv2.IMREAD_COLOR)
        after_img = cv2.imdecode(after_bytes, cv2.IMREAD_COLOR)
        
        # Resize images
        before_img = cv2.resize(before_img, (512, 512))
        after_img = cv2.resize(after_img, (512, 512))
        
        # Convert to grayscale
        gray_before = cv2.cvtColor(before_img, cv2.COLOR_BGR2GRAY)
        gray_after = cv2.cvtColor(after_img, cv2.COLOR_BGR2GRAY)
        
        # Calculate difference (match Streamlit exactly)
        diff = cv2.absdiff(gray_after, gray_before)
        diff_normalized = cv2.normalize(diff, None, 0, 255, cv2.NORM_MINMAX)
        heatmap = cv2.applyColorMap(diff_normalized, cv2.COLORMAP_JET)
        
        # Convert heatmap from BGR to RGB for web display
        heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
        
        # Convert to base64 (fix color channels for web display)
        def to_base64(img):
            # Convert BGR to RGB for web display (except heatmap which is already correct)
            _, buffer = cv2.imencode('.jpg', img)
            return base64.b64encode(buffer).decode('utf-8')
        
        # Calculate change percentage
        change_pixels = np.sum(diff > 30)
        total_pixels = diff.size
        change_percent = round((change_pixels / total_pixels) * 100, 2)
        
        # Convert BGR to RGB for proper web display
        before_rgb = cv2.cvtColor(before_img, cv2.COLOR_BGR2RGB)
        after_rgb = cv2.cvtColor(after_img, cv2.COLOR_BGR2RGB)
        
        return jsonify({
            'success': True,
            'before_image': f"data:image/jpeg;base64,{to_base64(before_rgb)}",
            'after_image': f"data:image/jpeg;base64,{to_base64(after_rgb)}",
            'heatmap': f"data:image/jpeg;base64,{to_base64(heatmap)}",
            'change_percentage': change_percent
        })
        
    except Exception as e:
        print(f"Error in analyze_satellite: {str(e)}")  # This will show in your console
        return jsonify({'error': 'Processing failed'}), 500
        
KAKUSHIN_API_KEY = "your_kakushin_api_key_here"
KAKUSHIN_BASE_URL = "https://kakushin-api.nomura.com"  # Example URL - actual will be provided

@app.route("/generate-text", methods=["POST"])
def generate_text():
    try:
        data = request.json
        prompt = f"Create promotional content for a beach cleanup drive called '{data.get('drive')}' at {data.get('location')} on {data.get('date')} with theme '{data.get('theme')}'. Include compelling call-to-action and environmental impact messaging."

        # Using KakushIN LLM for Claude 4 text generation
        response = requests.post(
            f"{KAKUSHIN_BASE_URL}/text-generation",  # Actual endpoint will be provided
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {KAKUSHIN_API_KEY}",
                "Accept": "application/json"
            },
            json={
                "prompt": prompt,
                "max_tokens": 500,
                "temperature": 0.7,
                "model": "claude-4"  # This might be specified or automatic
            }
        )

        if response.status_code == 200:
            result = response.json()
            # Adjust field name based on actual KakushIN response format
            generated_text = result.get("text") or result.get("generated_text") or result.get("response")
            return jsonify({"text": generated_text})
        else:
            print("KakushIN Text API Error:", response.text)
            return jsonify({"error": "Text generation failed"}), 500

    except Exception as e:
        print("Flask Error:", str(e))
        return jsonify({"error": "Server error"}), 500

@app.route("/generate-image", methods=["POST"])
def generate_image():
    try:
        data = request.json
        prompt = f"A professional poster for beach cleanup event: '{data.get('drive')}' at {data.get('location')} on {data.get('date')}. Theme: {data.get('theme')}. Include ocean, beach, volunteers cleaning, eco-friendly design, modern poster layout"

        # Using KakushIN LLM for Stability AI image generation
        response = requests.post(
            f"{KAKUSHIN_BASE_URL}/image-generation",  # Actual endpoint will be provided
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {KAKUSHIN_API_KEY}",
                "Accept": "application/json"
            },
            json={
                "prompt": prompt,
                "width": 512,
                "height": 512,
                "steps": 30,
                "cfg_scale": 7
            }
        )

        if response.status_code == 200:
            result = response.json()
            # Adjust field name based on actual KakushIN response format
            image_base64 = result.get("image_base64") or result.get("image") or result.get("base64")
            return jsonify({"image_base64": image_base64})
        else:
            print("KakushIN Image API Error:", response.text)
            return jsonify({"error": "Image generation failed"}), 500

    except Exception as e:
        print("Flask Error:", str(e))
        return jsonify({"error": "Server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
