import { useState } from "react";
import { posts } from "./data/posts";
import Navbar from "./components/Navbar";
import Billboard from "./components/Billboard";
import PostCard from "./components/PostCard";
import InlineAd from "./components/InlineAd";

export default function App() {
  const [activeNav, setActiveNav] = useState("Fashion");

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/*  FULL WIDTH — Navbar */}
      <Navbar active={activeNav} onSelect={setActiveNav} />

      {/*  FULL WIDTH — Billboard */}
      <Billboard />

      {/*  750pxCENTERED — Posts and Ads */}
      <div
        style={{
          width: "100%",
          maxWidth: 750,
          margin: "0 auto",
          background: "#fff",
          paddingBottom: 80,
        }}
      >
        <div style={{ padding: "0 14px" }}>
          {posts.map((post, i) => (
            <div key={post.id}>
              <PostCard post={post} />
              {i === 1 && <InlineAd />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
