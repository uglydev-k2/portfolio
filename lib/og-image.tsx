import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

export function OgCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#101315",
        color: "#e9ecea",
        padding: "72px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "#34d399",
            marginRight: 16,
          }}
        />
        <div style={{ display: "flex", fontSize: 28, color: "#3cc2bf" }}>
          {profile.availability}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 300, letterSpacing: -2 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 36,
            color: "#a1a1aa",
          }}
        >
          {profile.heroLine}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#e4e4e7" }}>{profile.tagline}</div>
    </div>
  );
}
