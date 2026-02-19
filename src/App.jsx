import { useState } from "react";
import { posts } from "./data/posts";
import Navbar from "./components/Navbar";
// import BottomNav from "./components/BottomNav";
import Billboard from "./components/Billboard";
import PostCard from "./components/PostCard";
import InlineAd from "./components/InlineAd";

export default function App() {
  const [activeNav, setActiveNav] = useState("Fashion");

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        background: "#fff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar active={activeNav} onSelect={setActiveNav} />

      {/* Scrollable content */}
      <div style={{ padding: "0 0 80px" }}>
        <Billboard />

        {/* Divider */}
        {/* <div style={{ height: 18 }} /> */}

        <div style={{ padding: "0 14px" }}>
          {posts.map((post, i) => (
            <div key={post.id}>
              <PostCard post={post} />
              {/* Show inline ad after 2nd post */}
              {i === 1 && <InlineAd />}
              {/* {i === 1 && <div style={{ height: 4 }} />} */}
            </div>
          ))}
        </div>
      </div>

      {/* <BottomNav /> */}
    </div>
  );
}
