// import { useState } from "react";

// const bottomNavItems = [
//   { label: "Home", icon: "🏠" },
//   { label: "Discover", icon: "🔍" },
//   { label: "Post", icon: "➕" },
//   { label: "Alerts", icon: "🔔" },
//   { label: "Profile", icon: "👤" },
// ];

// export default function BottomNav() {
//   const [active, setActive] = useState("Home");

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: 0,
//         left: "50%",
//         transform: "translateX(-50%)",
//         width: "100%",
//         maxWidth: 480,
//         background: "#fff",
//         borderTop: "1px solid #ede9e3",
//         display: "flex",
//         justifyContent: "space-around",
//         padding: "8px 0 12px",
//         zIndex: 20,
//       }}
//     >
//       {bottomNavItems.map((item) => (
//         <button
//           key={item.label}
//           onClick={() => setActive(item.label)}
//           style={{
//             background: "none",
//             border: "none",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 2,
//             padding: "4px 8px",
//             color: active === item.label ? "#f97316" : "#bbb",
//             cursor: "pointer",
//           }}
//         >
//           <span style={{ fontSize: 18 }}>{item.icon}</span>
//           <span
//             style={{
//               fontSize: 9,
//               fontFamily: "'Instrument Sans', sans-serif",

//               fontWeight: 500,
//               letterSpacing: "0.04em",
//             }}
//           >
//             {item.label}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// }
