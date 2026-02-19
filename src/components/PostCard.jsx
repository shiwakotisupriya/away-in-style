import { useState } from "react";

// Icons matching the image: comment, repost, like, share
const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const RepostIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const LikeIcon = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#e74c3c" : "none"} stroke={filled ? "#e74c3c" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

// Category badge — orange circle for every category
function CategoryBadge({ category }) {
  const label = category.charAt(0) + category.slice(1).toLowerCase();
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "100%",
        background: "#f97316",
        border: "1px solid #fbb37a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginLeft: 8,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontSize: 5,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 4px",
          wordBreak: "break-word",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function PostCard({ post, index }) {
  const [liked, setLiked] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const [thought, setThought] = useState("");

  return (
    <div style={{ background: "#fff" }}>
      <div style={{ padding: "16px 16px 0" }}>

        {/* ── CHANGE 1: Author row — avatar is inline with text only ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>

            {/* Avatar — circular, sits only next to author text */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: post.avatarColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Instrument Sans', sans-serif",
                flexShrink: 0,
              }}
            >
              {post.avatar}
            </div>

            {/* Author text */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111", fontFamily: "'DM Sans', sans-serif" }}>
                {post.author}
              </div>
              <div style={{ fontSize: 11, color: "#999", fontFamily: "'Instrument Sans', sans-serif", marginTop: 1 }}>
                {post.handle} | {post.category.charAt(0) + post.category.slice(1).toLowerCase()}
              </div>
              <div style={{ fontSize: 10, color: "#c0b8b0", fontFamily: "'Instrument Sans', sans-serif", marginTop: 1 }}>
                Hong Kong · Jun 2024
              </div>
            </div>
          </div>

          {/* Badge top-right */}
          <CategoryBadge category={post.category} />
        </div>

        {/* ── CHANGE 2: Everything below is full width — same left margin as title ── */}

        {/* Title */}
        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#111",
            fontFamily: "'Instrument Sans', sans-serif",
            lineHeight: 1.3,
            marginBottom: 7,
          }}
        >
          {post.title}
        </div>

        {/* Excerpt */}
        <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888", fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.65 }}>
          {post.excerpt.slice(0, 130)}...{" "}
          <span style={{ color: "#f97316", fontWeight: 600, cursor: "pointer", fontSize: 11 }}>
            <br />View Content
          </span>
        </p>

        {/* Image with hover zoom */}
        <div
          style={{
            borderRadius: 2,
            overflow: "hidden",
            width: "100%",
            marginBottom: 12,
            cursor: "pointer",
          }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.35s ease",
              transform: imgHovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        </div>

        {/* Engagement row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, paddingBottom: 10 }}>
          {/* Like */}
          <button onClick={() => setLiked(!liked)} style={{ ...iconBtn, color: liked ? "#e74c3c" : "#555" }}>
            <LikeIcon filled={liked} />
            <span style={iconCount}>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          {/* Comment */}
          <button style={iconBtn}>
            <CommentIcon />
            <span style={iconCount}>{post.comments}</span>
          </button>
          {/* Repost */}
          <button style={iconBtn}>
            <RepostIcon />
          </button>
          {/* Share */}
          <button style={iconBtn}>
            <ShareIcon />
          </button>
        </div>

        {/* Your thoughts */}
        <div style={{ paddingTop: 12, paddingBottom: 16, width: "60%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Underline input */}
            <div style={{ flex: 1, borderBottom: "1px solid #f0a060", paddingBottom: 4 }}>
              <input
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="your thoughts"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: 10,
                  color: "#333",
                  fontFamily: "'Instrument Sans', sans-serif",
                  background: "transparent",
                  padding: 0,
                }}
              />
            </div>

            {/* Icons: envelope, play, loop */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              {/* Envelope */}
              <div style={thoughtIconBox}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              {/* Play */}
              <div style={thoughtIconBox}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#666" stroke="none" />
                </svg>
              </div>
              {/* Loop / refresh */}
              <div style={thoughtIconBox}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6" />
                  <path d="M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Shared button style
const iconBtn = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#555",
  padding: 0,
};

const iconCount = {
  fontSize: 12,
  fontFamily: "'Instrument Sans', sans-serif",
  color: "#777",
};

const thoughtIconBox = {
  width: 26,
  height: 26,
  border: "1px solid #e0e0e0",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "#fafafa",
};
