// import React, { useState } from "react";
// import axios from "axios";

// const ContentPage = () => {
//   const [form, setForm] = useState({ drive: "", location: "", date: "", theme: "" });
//   const [text, setText] = useState("");
//   const [image, setImage] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const generateText = async () => {
//     const res = await axios.post("http://localhost:5000/generate-text", form);
//     setText(res.data.text);
//   };

//   const generateImage = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/generate-image", form);
//       // Backend now returns image_base64 instead of image_url
//       setImage(res.data.image_base64);
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
//   };

//   return (
//     <div>
//       <input name="drive" placeholder="Drive Name" onChange={handleChange} /><br />
//       <input name="location" placeholder="Location" onChange={handleChange} /><br />
//       <input name="date" placeholder="Date" onChange={handleChange} /><br />
//       <input name="theme" placeholder="Theme" onChange={handleChange} /><br />
//       <button onClick={generateText}>Generate Text</button>
//       <button onClick={generateImage}>Generate Image</button>

//       <div><strong>Generated Text:</strong><p>{text}</p></div>
//       {image && (
//         <div>
//           <img src={`data:image/png;base64,${image}`} alt="Generated Poster" style={{maxWidth: '300px'}} />
//         </div>
//       )}
//     </div>
//   );
// };


// const styles = {
//   container: {
//     background: "linear-gradient(to bottom right, #f0f8ff, #d7f0ff)",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "40px",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "30px",
//     borderRadius: "16px",
//     boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "500px",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "24px",
//     color: "#001f4d",
//     fontSize: "24px",
//     fontWeight: "700",
//   },
//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     marginBottom: "12px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     outline: "none",
//   },
//   buttonRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: "10px",
//     marginTop: "10px",
//     marginBottom: "20px",
//   },
//   buttonPrimary: {
//     flex: 1,
//     padding: "12px",
//     backgroundColor: "#007acc",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   buttonOutline: {
//     flex: 1,
//     padding: "12px",
//     backgroundColor: "#fff",
//     color: "#007acc",
//     border: "2px solid #007acc",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   output: {
//     backgroundColor: "#f2f9ff",
//     padding: "16px",
//     borderRadius: "10px",
//     border: "1px solid #cce6ff",
//   },
//   subheading: {
//     fontWeight: "600",
//     marginBottom: "8px",
//     color: "#004080",
//   },
//   imageContainer: {
//     textAlign: "center",
//     marginTop: "20px",
//   },
//   image: {
//     maxWidth: "100%",
//     borderRadius: "12px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//   },
// };

// export default ContentPage;                  

import React, { useState } from "react";
import axios from "axios";

const ContentPage = () => {
  const [form, setForm] = useState({ drive: "", location: "", date: "", theme: "" });
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generateText = async () => {
    const res = await axios.post("http://localhost:5000/generate-text", form);
    setText(res.data.text);
  };

  const generateImage = async () => {
    const res = await axios.post("http://localhost:5000/generate-image", form);
    setImage(res.data.image_base64);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Auto Content Generator</h2>
      <input name="drive" onChange={handleChange} placeholder="Drive Name" /><br />
      <input name="location" onChange={handleChange} placeholder="Location" /><br />
      <input name="date" onChange={handleChange} placeholder="Date" /><br />
      <input name="theme" onChange={handleChange} placeholder="Theme" /><br />

      {/* <button onClick={generateText}>Generate Caption</button> */}
      <button onClick={generateImage}>Generate Poster</button>

      <div>
        <h3>Generated Caption</h3>
        <p>{text}</p>
      </div>

      {image && (
        <div>
          <h3>Poster</h3>
          <img src={`data:image/png;base64,${image}`} alt="Poster" style={{ maxWidth: "400px" }} />
        </div>
      )}
    </div>
  );
};

export default ContentPage;