// import React, { useState } from 'react';

// const SatelliteAnalysis = () => {
//   const [files, setFiles] = useState({ before: null, after: null });
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = (e, type) => {
//     setFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
//   };

//   const analyze = async () => {
//     if (!files.before || !files.after) return alert('Upload both images');
    
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('before_image', files.before);
//     formData.append('after_image', files.after);

//     try {
//       const res = await fetch('http://localhost:5000/analyze_satellite', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//       setResults(data.success ? data : null);
//     } catch (error) {
//       alert('Error: ' + error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Satellite Image Analysis</h1>
      
//       <div>
//         <div>
//           <label>Before Image: </label>
//           <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} />
//         </div>
//         <div>
//           <label>After Image: </label>
//           <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} />
//         </div>
//         <button onClick={analyze} disabled={loading}>
//           {loading ? 'Analyzing...' : 'Analyze'}
//         </button>
//       </div>

//       {results && (
//         <div>
//           <h3>Results</h3>
//           <div style={{ display: 'flex', gap: '10px' }}>
//             <img src={results.before_image} alt="Before" style={{ width: '200px' }} />
//             <img src={results.after_image} alt="After" style={{ width: '200px' }} />
//           </div>
//           <div>
//             <h4>Change Heatmap</h4>
//             <img src={results.heatmap} alt="Heatmap" style={{ width: '400px' }} />
//             <p>Change: {results.change_percentage}%</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SatelliteAnalysis;


import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const SatelliteAnalysis = () => {
  const [files, setFiles] = useState({ before: null, after: null });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
const dashboardRef = useRef();

  const handleUpload = (e, type) => {
    setFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
  };

  const analyze = async () => {
    if (!files.before || !files.after) return alert('Upload both images');

    setLoading(true);
    const formData = new FormData();
    formData.append('before_image', files.before);
    formData.append('after_image', files.after);

    try {
      const res = await fetch('http://localhost:5000/analyze_satellite', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResults(data.success ? data : null);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };
const downloadPDFReport = async () => {
  const input = dashboardRef.current;

  if (!input) return;

  const canvas = await html2canvas(input, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("JalSaathi_EcoChangeVisualizer_Report.pdf");
};



  return (
      <div ref={dashboardRef} style={{ padding: "20px" }}>

    <div style={styles.container}>
      <h1 style={styles.title}> Satellite Image Analyzer</h1>
      <p style={styles.subtitle}>Compare before & after images of coastal zones to measure impact</p>

      <div style={styles.uploadSection}>
        <div style={styles.uploadCard}>
          <label style={styles.label}>Before Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} />
        </div>
        <div style={styles.uploadCard}>
          <label style={styles.label}>After Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} />
        </div>
      </div>

      <button onClick={analyze} disabled={loading} style={styles.button}>
        {loading ? 'Analyzing...' : 'Analyze Changes'}
      </button>

      {results && (
        <div style={styles.resultsContainer}>
          <h3 style={styles.sectionTitle}>Analysis Report</h3>

          <div style={styles.imageRow}>
            <div style={styles.imageBox}>
              <h4>Before</h4>
              <img src={results.before_image} alt="Before" style={styles.image} />
            </div>
            <div style={styles.imageBox}>
              <h4>After</h4>
              <img src={results.after_image} alt="After" style={styles.image} />
            </div>
          </div>

          <div style={styles.heatmapSection}>
            <h4 style={{ marginBottom: 10 }}>Change Heatmap</h4>
            <img src={results.heatmap} alt="Heatmap" style={styles.heatmapImage} />
            <p style={styles.changeText}>Detected Change: <strong>{results.change_percentage}%</strong></p>
                <button style={styles.downloadButton} onClick={downloadPDFReport} >
       Download as PDF
    </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: '40px',
    background: ' #ffffff',
    minHeight: '100vh',
    color: '#003366',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '16px',
    color: '#555',
  },
  uploadSection: {
    display: 'flex',
    gap: '40px',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  uploadCard: {
    background: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '240px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007acc',
    color: '#fff',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto 40px auto',
    transition: 'all 0.3s',
  },
  resultsContainer: {
    background: '#f9f9f9',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    maxWidth: '900px',
    margin: '0 auto',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '22px',
    marginBottom: '30px',
  },
  imageRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '30px',
  },
  imageBox: {
    textAlign: 'center',
  },
  image: {
    width: '250px',
    borderRadius: '8px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
  },
  heatmapSection: {
    textAlign: 'center',
  },
  heatmapImage: {
    width: '400px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '10px',
  },
  changeText: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#333',
  },
  downloadButton: {
  background: "linear-gradient(to right, #001f4d, #00bcd4)",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "600",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
},

};

export default SatelliteAnalysis;
