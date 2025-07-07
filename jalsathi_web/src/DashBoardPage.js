// DashboardPage.js – For Organizer and Admin Dashboards
import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardPage = ({ user, setMode }) => {
  const [form, setForm] = useState({});
  const [pendingDrives, setPendingDrives] = useState([]);
  const [completedDrives, setCompletedDrives] = useState([]);
  const [unverified, setUnverified] = useState([]);

  const loadDrives = async () => {
    if (user.email === "admin@example.com") {
      const res = await axios.get("http://localhost:5000/admin/unverified");
      setUnverified(res.data);
    } else {
      const [p, c] = await Promise.all([
        axios.post("http://localhost:5000/drives-pending", { org: user.organization }),
        axios.post("http://localhost:5000/drives-completed", { org: user.organization })
      ]);
      setPendingDrives(p.data);
      setCompletedDrives(c.data);
    }
  };

  useEffect(() => { loadDrives(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const addDrive = async () => {
    await axios.post("http://localhost:5000/add-drive-pending", {
      ...form,
      organization: user.organization,
      status: "upcoming"
    });
    setForm({});
    loadDrives();
  };
  const addCompletedDrive = async () => {
  await axios.post("http://localhost:5000/drives-completed", {
    title: form.ctitle,
    date: form.cdate,
    location: form.clocation,
    organization: user.organization,
    waste_collected_kg: parseFloat(form.waste_collected_kg),
    plastic_items: parseInt(form.plastic_items),
    glass_items: parseInt(form.glass_items)
  });
  setForm({});
  loadDrives();
};

  const verifyUser = async (id) => {
    await axios.post(`http://localhost:5000/admin/verify/${id}`);
    loadDrives();
  };

  return (
    // <div>
    //   <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
    //     <div><strong>Welcome, {user.name}</strong></div>
    //     <button onClick={() => setMode("auth")}>Logout</button>
    //   </div>

    //   {user.email === "admin@example.com" ? (
    //     <div>
    //       <h3>Admin Panel - Verify Organizations</h3>
    //       {unverified.map((u, i) => (
    //         <div key={i}>
    //           <p><strong>{u.name}</strong> ({u.organization}) - {u.email}</p>
    //           <p>Phone: {u.phone}</p>
    //           <p>Instagram: {u.instagram} | Facebook: {u.facebook} | Website: {u.website}</p>
    //           <button onClick={() => verifyUser(u.id)}>Verify</button>
    //           <hr />
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <div>
    //       <h2>Add Upcoming Drive</h2>
    //       <input name="title" onChange={handleChange} placeholder="Title" value={form.title || ""} /><br />
    //       <input name="date" onChange={handleChange} placeholder="Date" value={form.date || ""} /><br />
    //       <input name="location" onChange={handleChange} placeholder="Location" value={form.location || ""} /><br />
    //       <input name="description" onChange={handleChange} placeholder="Description" value={form.description || ""} /><br />
    //       <button onClick={addDrive}>Add Drive</button>

    //       <h2>Add Completed Drive</h2>
    //       <input name="ctitle" onChange={handleChange} placeholder="Title" value={form.ctitle || ""} /><br />
    //       <input name="cdate" onChange={handleChange} placeholder="Date" value={form.cdate || ""} /><br />
    //       <input name="clocation" onChange={handleChange} placeholder="Location" value={form.clocation || ""} /><br />
    //       <input name="waste_collected_kg" onChange={handleChange} placeholder="Waste Collected (kg)" value={form.waste_collected_kg || ""} /><br />
    //       <input name="plastic_items" onChange={handleChange} placeholder="Plastic Items" value={form.plastic_items || ""} /><br />
    //       <input name="glass_items" onChange={handleChange} placeholder="Glass Items" value={form.glass_items || ""} /><br />
    //       <button onClick={addCompletedDrive}>Add Completed Drive</button>
    //       <hr />
    //       <div>
    //         <h3>Upcoming Drives</h3>
    //         {pendingDrives.map((d, i) => (
    //           <p key={i}>{d.title} - {d.date} - {d.location} - {d.description}</p>
    //         ))}
    //         <h3>Completed Drives</h3>
    //         {completedDrives.map((d, i) => (
    //         <p key={i}>
    //             {d.title} - {d.date} - {d.location} <br />
    //             Waste Collected: {d.waste_collected_kg} kg<br />
    //             Plastic Items: {d.plastic_items} | Glass Items: {d.glass_items}
    //         </p>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div style={styles.container}>
  <div style={styles.header}>
    <div style={styles.welcome}><strong>Welcome, {user.name}</strong></div>
    <button style={styles.logoutBtn} onClick={() => setMode("auth")}>Logout</button>
  </div>

  {user.email === "admin@example.com" ? (
    <div style={styles.section}>
      <h3 style={styles.subheading}>Admin Panel - Verify Organizations</h3>
      {unverified.map((u, i) => (
        <div key={i} style={styles.verifyCard}>
          <p><strong>{u.name}</strong> ({u.organization}) - {u.email}</p>
          <p>Phone: {u.phone}</p>
          <p>Instagram: {u.instagram} | Facebook: {u.facebook} | Website: {u.website}</p>
          <button style={styles.verifyBtn} onClick={() => verifyUser(u.id)}>Verify</button>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <div style={styles.section}>
        <h2 style={styles.subheading}>Add Upcoming Drive</h2>
        <input style={styles.input} name="title" onChange={handleChange} placeholder="Title" value={form.title || ""} />
        <input style={styles.input} name="date" onChange={handleChange} placeholder="Date" value={form.date || ""} />
        <input style={styles.input} name="location" onChange={handleChange} placeholder="Location" value={form.location || ""} />
        <input style={styles.input} name="description" onChange={handleChange} placeholder="Description" value={form.description || ""} />
        <button style={styles.button} onClick={addDrive}>Add Drive</button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>Add Completed Drive</h2>
        <input style={styles.input} name="ctitle" onChange={handleChange} placeholder="Title" value={form.ctitle || ""} />
        <input style={styles.input} name="cdate" onChange={handleChange} placeholder="Date" value={form.cdate || ""} />
        <input style={styles.input} name="clocation" onChange={handleChange} placeholder="Location" value={form.clocation || ""} />
        <input style={styles.input} name="waste_collected_kg" onChange={handleChange} placeholder="Waste Collected (kg)" value={form.waste_collected_kg || ""} />
        <input style={styles.input} name="plastic_items" onChange={handleChange} placeholder="Plastic Items" value={form.plastic_items || ""} />
        <input style={styles.input} name="glass_items" onChange={handleChange} placeholder="Glass Items" value={form.glass_items || ""} />
        <button style={styles.button} onClick={addCompletedDrive}>Add Completed Drive</button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>Upcoming Drives</h3>
        {pendingDrives.map((d, i) => (
          <div key={i} style={styles.driveItem}>
            <strong>{d.title}</strong> - {d.date} - {d.location} <br />
            {d.description}
          </div>
        ))}
        <h3 style={styles.subheading}>Completed Drives</h3>
        {completedDrives.map((d, i) => (
          <div key={i} style={styles.driveItem}>
            <strong>{d.title}</strong> - {d.date} - {d.location}<br />
            Waste Collected: {d.waste_collected_kg} kg<br />
            Plastic Items: {d.plastic_items} | Glass Items: {d.glass_items}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
};


const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#ffffff',
    padding: 0,
    margin: 0
  },
  
  header: {
    backdropFilter: 'blur(10px)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid rgba(14, 165, 233, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  },
  
  welcome: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#103c66',
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
  
  section: {
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#1e3a8a',
    margin: '30px 40px',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(14, 165, 233, 0.2)'
  },
  
  subheading: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '25px',
    paddingBottom: '10px',
    borderBottom: '3px solid #0ea5e9',
    display: 'inline-block'
  },
  
  input: {
    width: '100%',
    padding: '15px 20px',
    margin: '10px 0',
    border: '2px solid rgba(14, 165, 233, 0.3)',
    borderRadius: '12px',
    fontSize: '16px',
    fontFamily: 'inherit',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#1e3a8a',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  
  button: {
    background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)',
    color: '#ffffff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)',
    marginTop: '15px'
  },
  
  verifyCard: {
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(56, 189, 248, 0.1))',
    border: '2px solid rgba(14, 165, 233, 0.2)',
    borderRadius: '15px',
    padding: '20px',
    margin: '15px 0',
    transition: 'all 0.3s ease'
  },
  
  verifyBtn: {
    background: 'linear-gradient(45deg, #10b981, #34d399)',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)',
    marginTop: '10px'
  },
  
  driveItem: {
    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(14, 165, 233, 0.1))',
    border: '1px solid rgba(14, 165, 233, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    margin: '15px 0',
    borderLeft: '5px solid #0ea5e9',
    transition: 'all 0.3s ease'
  }
};

export default DashboardPage;
