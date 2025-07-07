// import React, { useState } from "react";
// import AuthPage from "./AuthPage";
// import DashboardPage from "./DashBoardPage";
// import ImpactPage from "./ImpactPage"
// import SatellitePage from "./SatellitePage"
// import AutoContentPage from "./AutoContentPage"

// const Sidebar = ({ setMode }) => (
//   <div style={{ width: "200px", background: "#eee", height: "150vh", padding: "10px" }}>
//     <h3>Menu</h3>
//     <button onClick={() => setMode("dashboard")}>Dashboard</button><br />
//     <button onClick={() => setMode("impact")}>Impact Analysis</button><br />
//     <button onClick={() => setMode("satellite")}>Satellite Analysis</button><br />
//     <button onClick={() => setMode("auto-content")}>Auto-Content Generation</button>
//   </div>
// );

// const App = () => {
//   const [user, setUser] = useState(null); // user = null means show login/signup
//   const [mode, setMode] = useState("auth"); // "auth" or "dashboard"

//   if (mode === "auth") {
//     return <AuthPage setUser={setUser} setMode={setMode} />;
//   }

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar setMode={setMode} />
//       <div style={{ flex: 1, padding: "20px" }}>
//         {mode === "dashboard" && <DashboardPage user={user} setMode={setMode} />}
//         {mode === "impact" && < ImpactPage user={user} setMode={setMode}/>}
//         {mode === "satellite" && <SatellitePage user={user} setMode={setMode}/>}
//         {mode === "auto-content" && <AutoContentPage user={user} setMode={setMode}/>}
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import AuthPage from "./AuthPage";
// import DashboardPage from "./DashBoardPage";
// import ImpactPage from "./ImpactPage";
// import SatellitePage from "./SatellitePage";
// import AutoContent from "./AutoContentPage"

// const Sidebar = ({setMode}) => (
//   <div style= {{width:"200px",height:"100vh",background:"#eee",padding:"10px"}}>
//     <h3>Menu</h3>
//     <button onClick={() => setMode("dashboard")}>Dashboard</button><br />
//     <button onClick={() => setMode("impact")}>Impact Analysis</button><br />
//     <button onClick={() => setMode("auto-content")}>Auto Content Generation</button><br />
//     <button onClick={() => setMode("satellite")}>Satellite</button><br />
//   </div>
// );

// const App = () => {
//   const [user,setUser] = useState(null);
//   const [mode,setMode] = useState("auth");

//   if (mode === "auth"){
//     return <AuthPage setUser={setUser} setMode={setMode}/>;
//   }

//   return (
//     <div style={{display:"flex"}}>
//         <Sidebar setMode={setMode} />
//         <div style={{flex:1,padding:"20px"}}> 
//           {mode === "dashboard" && <DashboardPage user={user} setMode={setMode} />}
//           {mode === "impact" && <ImpactPage user={user} setMode={setMode} />}
//           {mode === "auto-content" && <AutoContent user={user} setMode={setMode} />}
//           {mode === "satellite" && <SatellitePage user={user} setMode={setMode} />}
//         </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import AuthPage from "./AuthPage";
// import DashboardPage from "./DashBoardPage";
// import ImpactPage from "./ImpactPage";
// import SatellitePage from "./SatellitePage";
// import AutoContent from "./AutoContentPage";


// const Sidebar = ({ setMode }) => (
//   <div style={styles.sidebar}>
//     <div style={styles.logoBox}>
//       <img src="/logo.png" alt="Jal Saathi" style={styles.logo} />
//       <h2 style={styles.brand}>Jal Saathi</h2>
//     </div>
//     <div style={styles.menu}>
//       <MenuButton label=" Dashboard" onClick={() => setMode("dashboard")} />
//       <MenuButton label=" Impact Analysis" onClick={() => setMode("impact")} />
//       <MenuButton label=" Content Generation" onClick={() => setMode("auto-content")} />
//       <MenuButton label="Eco Change Visualizer" onClick={() => setMode("satellite")} />
//     </div>
//   </div>
// );


// const App = () => {
//   const [user, setUser] = useState(null);
//   const [mode, setMode] = useState("auth");

//   if (mode === "auth") {
//     return <AuthPage setUser={setUser} setMode={setMode} />;
//   }

//   return (
//     <div style={styles.appContainer}>
//       <Sidebar setMode={setMode} />
//       <div style={styles.mainContent}>
//         {mode === "dashboard" && <DashboardPage user={user} setMode={setMode} />}
//         {mode === "impact" && <ImpactPage user={user} setMode={setMode} />}
//         {mode === "auto-content" && <AutoContent user={user} setMode={setMode} />}
//         {mode === "satellite" && <SatellitePage user={user} setMode={setMode} />}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   appContainer: {
//     display: "flex",
//     minHeight: "100vh",
//     backgroundColor: "#f0f8ff",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   sidebar: {
//     width: "240px",
//     background: "linear-gradient(180deg, #001f4d, #00bcd4)",
//     color: "#fff",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
//   },
//   logoBox: {
//     textAlign: "center",
//     marginBottom: "30px",
//   },
//   logo: {
//     width: "60px",
//     height: "60px",
//     borderRadius: "50%",
//     border: "3px solid #fff",
//     marginBottom: "10px",
//   },
//   brand: {
//     fontSize: "2.5rem",
//     fontWeight: "800",
//   },
//   menu: {
//     width: "100%",
//   },
//   menuButton: {
//     width: "100%",
//     background: "transparent",
//     color: "#fff",
//     border: "none",
//     padding: "12px 16px",
//     textAlign: "left",
//     fontSize: "16px",
//     fontWeight: "500",
//     borderRadius: "6px",
//     marginBottom: "8px",
//     cursor: "pointer",
//     transition: "background 0.2s",
//   },
//   mainContent: {
//     flex: 1,
//     padding: "30px",
//     backgroundColor: "#ffffff",
//     boxShadow: "inset 0 0 4px rgba(0,0,0,0.05)",
//   },
// };

// export default App;

import React, { useState } from "react";
import AuthPage from "./AuthPage";
import DashboardPage from "./DashBoardPage";
import ImpactPage from "./ImpactPage";
import SatellitePage from "./SatellitePage";
import AutoContent from "./AutoContentPage";

// MenuButton Component with Hover Effect
const MenuButton = ({ label, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.menuButton,
        backgroundColor: hover ? "rgba(255, 255, 255, 0.15)" : "transparent",
        transform: hover ? "translateX(6px)" : "none",
      }}
    >
      {label}
    </button>
  );
};

const Sidebar = ({ setMode }) => (
  <div style={styles.sidebar}>
    <div style={styles.logoBox}>
      <img src="/logo.png" alt="Jal Saathi" style={styles.logo} />
      <h2 style={styles.brand}>Jal Saathi</h2>
    </div>
    <div style={styles.menu}>
      <MenuButton label=" Dashboard" onClick={() => setMode("dashboard")} />
      <MenuButton label=" Impact Analysis" onClick={() => setMode("impact")} />
      <MenuButton label=" Content Generation" onClick={() => setMode("auto-content")} />
      <MenuButton label=" Eco Change Visualizer" onClick={() => setMode("satellite")} />
    </div>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("auth");

  if (mode === "auth") {
    return <AuthPage setUser={setUser} setMode={setMode} />;
  }

  return (
    <div style={styles.appContainer}>
      <Sidebar setMode={setMode} />
      <div style={styles.mainContent}>
        {mode === "dashboard" && <DashboardPage user={user} setMode={setMode} />}
        {mode === "impact" && <ImpactPage user={user} setMode={setMode} />}
        {mode === "auto-content" && <AutoContent user={user} setMode={setMode} />}
        {mode === "satellite" && <SatellitePage user={user} setMode={setMode} />}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f0f8ff",
    fontFamily: "'Segoe UI', sans-serif",
  },
  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #001f4d, #00bcd4)",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
  },
  logoBox: {
    textAlign: "center",
    marginBottom: "30px",
  },
  logo: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "3px solid #fff",
    marginBottom: "10px",
  },
  brand: {
    fontSize: "2.5rem",
    fontWeight: "800",
  },
  menu: {
    width: "100%",
  },
  menuButton: {
    width: "100%",
    background: "transparent",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "6px",
    marginBottom: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#ffffff",
    boxShadow: "inset 0 0 4px rgba(0,0,0,0.05)",
  },
};

export default App;
