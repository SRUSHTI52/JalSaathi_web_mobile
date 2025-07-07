from flask import Flask, request, jsonify
from transformers import AutoImageProcessor, AutoModelForImageClassification, AutoModelForCausalLM, AutoTokenizer
from PIL import Image
import torch
import io
from flask_cors import CORS
#from llama_cpp import Llama

app = Flask(__name__)
CORS(app)  # To allow Flutter to call the API

# Load model and processor once at startup
processor = AutoImageProcessor.from_pretrained("prithivMLmods/Augmented-Waste-Classifier-SigLIP2",  use_fast=False)
model = AutoModelForImageClassification.from_pretrained("prithivMLmods/Augmented-Waste-Classifier-SigLIP2")

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    image_bytes = file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()

    label = model.config.id2label[predicted_class_idx]
    return jsonify({'prediction': label})



# Load the tokenizer and model
model_name_chat = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer_chat = AutoTokenizer.from_pretrained(model_name_chat)
model_chat = AutoModelForCausalLM.from_pretrained(model_name_chat, torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "Message field is required"}), 400
    print(user_input)
    # Use chat-style format
    prompt = f"<|system|>You are a helpful assistant.<|user|>{user_input}<|assistant|>"

    inputs = tokenizer_chat(prompt, return_tensors="pt").to(model_chat.device)

    output = model_chat.generate(
        **inputs,
        max_new_tokens=100,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        pad_token_id=tokenizer_chat.eos_token_id
    )

    reply = tokenizer_chat.decode(output[0], skip_special_tokens=True)

    # Clean reply (remove prompt)
    assistant_reply = reply.split("<|assistant|>")[-1].strip()
    print(assistant_reply)
    return jsonify({"reply": assistant_reply})


#Load GGUF model
# MODEL_PATH = "./models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
# llm = Llama(model_path=MODEL_PATH, n_ctx=2048, n_threads=8, chat_format="chatml")  # tune threads as per your CPU
#
# @app.route('/chat_new', methods=['POST'])
# def chat():
#     user_input = request.json.get("message")
#     if not user_input:
#         return jsonify({"error": "Message field is required"}), 400
#
#     messages = [
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": user_input}
#     ]
#
#     output = llm.create_chat_completion(messages)
#     reply = output["choices"][0]["message"]["content"]
#
#     return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
