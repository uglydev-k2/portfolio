import { profile } from "@/data/profile";
import { initials } from "@/lib/initials";

export function IconMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0b6e70",
        color: "#ffffff",
        fontSize: Math.round(size * 0.38),
        fontWeight: 700,
        borderRadius: Math.round(size * 0.22),
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {initials(profile.name)}
    </div>
  );
}
