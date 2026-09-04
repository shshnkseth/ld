import dynamic from "next/dynamic";

// R3F Canvas cannot run on the server — dynamic import with SSR disabled
const WorldExperience = dynamic(
  () => import("@/world/WorldExperience"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#F5F0EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.14em",
            color: "#B0A898",
            textTransform: "uppercase",
          }}
        >
          Loading world…
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return <WorldExperience />;
}
