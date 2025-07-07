// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const ImpactPage = ({ user, setMode }) => {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetch("http://localhost:5000/impact-analytics", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ org: user.organization })
//       })
//       .then(res => res.json())
//       .then(data => { setAnalytics(data); setLoading(false); })
//       .catch(() => setLoading(false));
//     }
//   }, [user]);

//   if (loading) return <div>Loading...</div>;
//   if (!analytics) return <div>No data available</div>;

//   const { totals, monthly_data, waste_classification } = analytics;

//   const wasteData = [
//     { name: 'Plastic', value: waste_classification.plastic },
//     { name: 'Glass', value: waste_classification.glass },
//     { name: 'Other', value: waste_classification.other }
//   ].filter(item => item.value > 0);

//   const colors = ['#4CAF50', '#2196F3', '#FF9800'];

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//         <h2>Impact Dashboard</h2>
//         <button onClick={() => setMode("auth")}>Logout</button>
//       </div>

//       {/* Summary Cards */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div style={{ border: "2px solid #4CAF50", padding: "15px", borderRadius: "8px", textAlign: "center", minWidth: "150px" }}>
//           <h2 style={{ color: "#4CAF50", margin: "0" }}>{totals.total_waste.toFixed(2)}</h2>
//           <p style={{ margin: "5px 0" }}>Total Waste (kg)</p>
//         </div>
//         <div style={{ border: "2px solid #2196F3", padding: "15px", borderRadius: "8px", textAlign: "center", minWidth: "150px" }}>
//           <h2 style={{ color: "#2196F3", margin: "0" }}>{totals.total_drives}</h2>
//           <p style={{ margin: "5px 0" }}>Completed Drives</p>
//         </div>
//       </div>

//       {/* Charts */}
//       {monthly_data.length > 0 ? (
//         <>
//           {/* Waste Chart */}
//           <div style={{ marginBottom: "30px" }}>
//             <h3>Monthly Waste (kg)</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={monthly_data}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="waste" fill="#4CAF50" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Drives Chart */}
//           <div style={{ marginBottom: "30px" }}>
//             <h3>Monthly Drives</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={monthly_data}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="drives" fill="#2196F3" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart */}
//           {wasteData.length > 0 && (
//             <div style={{ marginBottom: "30px" }}>
//               <h3>Waste Types</h3>
//               <ResponsiveContainer width="100%" height={400}>
//                 <PieChart>
//                   <Pie 
//                     data={wasteData} 
//                     dataKey="value" 
//                     nameKey="name" 
//                     cx="50%" 
//                     cy="50%" 
//                     outerRadius={100} 
//                     label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
//                   >
//                     {wasteData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={colors[index]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value, name) => [`${value} items`, name]} />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </>
//       ) : (
//         <div style={{ textAlign: "center", padding: "40px", border: "2px dashed #ddd", borderRadius: "8px" }}>
//           <h3>No data yet</h3>
//           <p>Add completed drives to see analytics!</p>
//         </div>
//       )}
//     </div>
//   );
// };



// export default ImpactPage;

import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const ImpactPage = ({ user, setMode }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
const dashboardRef = useRef();

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/impact-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ org: user.organization }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAnalytics(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (!analytics) return <div style={styles.container}>No data available</div>;

  const { totals, monthly_data, waste_classification } = analytics;

  const wasteData = [
    { name: "Plastic", value: waste_classification.plastic },
    { name: "Glass", value: waste_classification.glass },
    { name: "Other", value: waste_classification.other },
  ].filter((item) => item.value > 0);

  const colors = ["#4CAF50", "#2196F3", "#FF9800"];


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
  pdf.save("JalSaathi_Impact_Report.pdf");
};
  return (
          <div ref={dashboardRef} style={{ padding: "20px" }}>

    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Impact Dashboard</h2>

<div style={styles.divstyle}>
  <button style={styles.downloadButton} onClick={downloadPDFReport}>
    Download as PDF
  </button>
  <button style={styles.logoutBtn} onClick={() => setMode("auth")}>
    Logout
  </button>
</div>

        
      </div>

      <div style={styles.cardsRow}>
        <div style={{ ...styles.card, ...styles.cardGreen }}>
          <h2 style={{ ...styles.cardValue, color: "#4CAF50" }}>
            {totals.total_waste.toFixed(2)}
          </h2>
          <p style={styles.cardTitle}>Total Waste (kg)</p>
        </div>
        <div style={{ ...styles.card, ...styles.cardBlue }}>
          <h2 style={{ ...styles.cardValue, color: "#2196F3" }}>
            {totals.total_drives}
          </h2>
          <p style={styles.cardTitle}>Completed Drives</p>
        </div>
      </div>

      {monthly_data.length > 0 ? (
        <>
          <div style={styles.chartSection}>
            <h3 style={styles.chartTitle}>Monthly Waste (kg)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthly_data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="waste" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartSection}>
            <h3 style={styles.chartTitle}>Monthly Drives</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthly_data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="drives" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {wasteData.length > 0 && (
            <div style={styles.chartSection}>
              <h3 style={styles.chartTitle}>Waste Types</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={wasteData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {wasteData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} items`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      ) : (
        <div style={styles.emptyState}>
          <h3>No data yet</h3>
          <p>Add completed drives to see analytics!</p>
        </div>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "30px 40px",
    color: "#002244",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#004080",
  },
  logoutBtn: {
  backgroundColor: " #00bcd4",
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
  cardsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1",
    minWidth: "200px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#eafbf9",
    boxShadow: "0 8px 20px rgba(209, 175, 175, 0.05)",
    textAlign: "center",
    borderLeft: "5px solid #007acc",
  },
  cardGreen: {
    borderLeft: "5px solid #4CAF50",
  },
  cardBlue: {
    borderLeft: "5px solid #2196F3",
  },
  cardTitle: {
    fontSize: "15px",
    color: "#555",
    marginTop: "8px",
  },
  cardValue: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0",
  },
  chartSection: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    marginBottom: "40px",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#004080",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px",
    border: "2px dashed #ccc",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    marginTop: "40px",
  },
    downloadButton: {
  backgroundColor: " #00bcd4",
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

divstyle:{
   display: "flex", justifyContent: "space-around", padding: "10px"
}
};

export default ImpactPage;
