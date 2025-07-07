// import React, { useState } from "react";
// import axios from "axios";

// const AuthPage = ({ setUser, setMode }) => {
//   const [form, setForm] = useState({});
//   const [isSignup, setIsSignup] = useState(true);
//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = async () => {
//     const url = isSignup ? "/signup" : "/login";
//     try {
//       const res = await axios.post(`http://localhost:5000${url}`, form);
//       const { user, message } = res.data;
//       if (user.email === "admin@example.com") {
//         setUser(user);
//         setMode("admin");
//       } else {
//         setUser(user);
//         setMode("dashboard");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div>
//       <h2>{isSignup ? "Sign Up" : "Login"}</h2>
//       {isSignup && (
//         <>
//           <input name="name" onChange={handleChange} placeholder="Name" /><br />
//           <input name="organization" onChange={handleChange} placeholder="Organization" /><br />
//           <input name="phone" onChange={handleChange} placeholder="Phone" /><br />
//           <input name="instagram" onChange={handleChange} placeholder="Instagram (optional)" /><br />
//           <input name="website" onChange={handleChange} placeholder="Website (optional)" /><br />
//           <input name="facebook" onChange={handleChange} placeholder="Facebook (optional)" /><br />
//         </>
//       )}
//       <input name="email" onChange={handleChange} placeholder="Email" /><br />
//       <input name="password" type="password" onChange={handleChange} placeholder="Password" /><br />
//       <button onClick={submit}>{isSignup ? "Sign Up" : "Login"}</button><br />
//       <button onClick={() => setIsSignup(!isSignup)}>
//         {isSignup ? "Already have account? Login" : "New user? Sign up"}
//       </button>
//     </div>
//   );
// };

// export default AuthPage;


import React, { useState } from "react";
import axios from "axios";

const AuthPage = ({ setUser, setMode }) => {
  const [form, setForm] = useState({});
  const [isSignup, setIsSignup] = useState(true);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const url = isSignup ? "/signup" : "/login";
    try {
      const res = await axios.post(`http://localhost:5000${url}`, form);
      const { user } = res.data;
      if (user.email === "admin@example.com") {
        setUser(user);
        setMode("admin");
      } else {
        setUser(user);
        setMode("dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT: Auth Form */}
      <div style={styles.authPane}>
        <div style={styles.authBox}>
          <h2 style={styles.mainTitle}>{isSignup ? "Sign Up" : "Login"}</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <>
                <input style={styles.input} name="name" onChange={handleChange} placeholder="Full Name" />
                <input style={styles.input} name="organization" onChange={handleChange} placeholder="Organization Name" />
                <input style={styles.input} name="phone" onChange={handleChange} placeholder="Contact Number" />
                <input style={styles.input} name="instagram" onChange={handleChange} placeholder="Instagram (optional)" />
                <input style={styles.input} name="website" onChange={handleChange} placeholder="Website (optional)" />
                <input style={styles.input} name="facebook" onChange={handleChange} placeholder="Facebook (optional)" />
              </>
            )}
            <input style={styles.input} name="email" onChange={handleChange} placeholder="Email Address" />
            <input style={styles.input} name="password" type="password" onChange={handleChange} placeholder="Password" />
            <button style={styles.primaryBtn} onClick={submit}>
              {isSignup ? "Create Account" : "Login"}
            </button>
            <button style={styles.toggleBtn} onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Already have an account? Log in" : "New user? Sign up"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT: Brand Panel */}
      <div style={styles.brandPane}>
        <div style={styles.brandBox}>
          <img src="/logo.png" alt="Jal Saathi Logo" style={styles.logo} />
          <h1 style={styles.heading}>Welcome to <span style={{ color: "#ffffff" }}>Jal Saathi</span></h1>
          <p style={styles.tagline}><em>Empowering those who protect our shores.</em></p>
          <ul style={styles.features}>
            <li>🌊 Organize impactful cleanups with ease</li>
            <li>📍 Track volunteers and real-time locations</li>
            <li>📈 Showcase environmental impact visually</li>
            <li>🎖️ Reward community participation</li>
          </ul>
          <p style={styles.footer}>Be a Saathi to our oceans. 💙</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  authPane: {
    width: "50%",
    backgroundColor: "#e8f3f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  authBox: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  },
  mainTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#001f4d",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
  },
  primaryBtn: {
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    marginTop: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  toggleBtn: {
    marginTop: "10px",
    fontSize: "14px",
    textDecoration: "underline",
    background: "none",
    border: "none",
    color: "#007acc",
    cursor: "pointer",
    fontWeight: "500",
  },
  brandPane: {
    width: "50%",
    background: "radial-gradient(circle at center, #00cfff, #001f4d)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px",
    textAlign: "left",
  },
  brandBox: {
    maxWidth: "500px",
  },
logo: {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  border: "4px solid white",
  objectFit: "cover",
  margin: "0 auto ",
  display: "block",
}
,
  heading: {
    fontSize: "2.5rem",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "12px",
  },
  tagline: {
    fontSize: "1.7rem",
    fontStyle: "italic",
    marginBottom: "20px",
    color: "#e0f7ff",
  },
  features: {
    listStyle: "none",
    paddingLeft: 0,
    fontSize: "1.4rem",
    lineHeight: "1.6",
    fontWeight: "500",
  },
  footer: {
    marginTop: "30px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
  },
};

export default AuthPage;


