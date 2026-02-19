import { useState, useEffect, useRef } from "react";
import navIcon from "../assets/images/5857c61bda31821663ec152af15db5e5a7b57d7b.png";

const dropdownCategories = [
  "FASHION", "BEAUTY", "JEWELERY", "WATCHES", "YACHTS",
  "CARS", "HOTEL & RESORTS", "TRAVEL", "WELLNESS", "DINING",
  "BAR", "CAFES", "F&B", "PEOPLE", "CULTURE", "ART",
  "PARTIES", "EDM", "REAL ESTATE", "TECH", "WAHT'S ON", "VIDEOS",
];

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    function update() {
      const now = new Date();
      const hk = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
      const h = String(hk.getHours()).padStart(2, "0");
      const m = String(hk.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

export default function Navbar({ active, onSelect }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = dropdownCategories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8e8e8",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* ── Row 1: Brand · Tagline · Mail icon ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 8px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#111",
            fontFamily: "'Instrument Sans', sans-serif",

            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          AWAY IN STYLE
        </div>

        <div
          style={{
            fontSize: 10,
            color: "#999",
            fontFamily: "'Instrument Sans', sans-serif",

            textAlign: "center",
            flex: 1,
            padding: "0 12px",
            letterSpacing: "0.01em",
          }}
        >
          Asia's Premier A.I. Powered Lifestyle Platform
        </div>

        {/* Dropdown trigger — top right */}
        <div ref={dropRef} style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setDropOpen((v) => !v)}
            style={{
              width: 28,
              height: 28,
              background: dropOpen ? "#f5f5f5" : "#f97316",
              border: "none",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dropOpen ? "#f97316" : "#f5f5f5"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: "transform 0.2s",
                transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown panel */}
          {dropOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "#fff",
                border: "1px solid #ececec",
                borderRadius: 8,
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                width: 200,
                zIndex: 200,
                overflow: "hidden",
              }}
            >
              {/* Search */}
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="search by city"
                  style={{
                    border: "none", outline: "none", fontSize: 11,
                    color: "#555", fontFamily: "'Instrument Sans', sans-serif",

                    background: "transparent", flex: 1,
                  }}
                />
              </div>

              {/* Category list */}
              <div style={{ maxHeight: 340, overflowY: "auto" }}>
                {filtered.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => { onSelect(cat); setDropOpen(false); setSearch(""); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: i === 0 ? "#fff8f3" : "none",
                      border: "none", borderBottom: "1px solid #f7f7f7",
                      padding: "9px 14px", fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.06em", color: "#f97316",
                      fontFamily: "'Instrument Sans', sans-serif",
 cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fff3e8"}
                    onMouseLeave={(e) => e.currentTarget.style.background = i === 0 ? "#fff8f3" : "none"}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Row 2: HK time · Sign in · Message · Join us · Avatar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 16px",
        }}
      >
        <div style={{ flex: 1 }} />

        <div
          style={{
            fontSize: 11,
            color: "#888",
            fontFamily: "'Instrument Sans', sans-serif",

            letterSpacing: "0.06em",
            flex: 1,
            textAlign: "center",
          }}
        >
          HK &nbsp;<Clock />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, justifyContent: "flex-end" }}>
          {["Sign in", "Message", "Join us 30K"].map((label) => (
            <button
              key={label}
              style={{
                background: "none", border: "none", padding: 0,
                fontSize: 11, color: "#555", fontFamily: "'Instrument Sans', sans-serif",

                fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              {label}
            </button>
          ))}
          <div
            style={{
              width: 30, height: 30, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            <img
              src={navIcon}
              alt="nav icon"
              style={{ width: 22, height: 25, objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* ── Row 3: Category pills ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #f0f0f0",
          padding: "6px 16px 10px",
          gap: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            scrollbarWidth: "none",
            flex: 1,
          }}
        >
        </div>
      </div>
    </div>
  );
}
