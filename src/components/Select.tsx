import { useState, useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}

export function Select({ value, onChange, options, placeholder = "Selecione…" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", padding: "11px 36px 11px 14px",
          borderRadius: "var(--ev-radius-sm)",
          border: `1px solid ${open ? "var(--ev-gold)" : "var(--ev-line)"}`,
          background: "rgba(255,255,255,.04)",
          color: value ? "var(--ev-ink)" : "var(--ev-muted-2)",
          fontSize: 14, fontFamily: "var(--ev-font-body)",
          textAlign: "left", cursor: "pointer",
          transition: "border-color .2s",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || placeholder}
        </span>
        <span style={{
          color: "var(--ev-muted-2)", fontSize: 11, flexShrink: 0,
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform .2s", marginLeft: 8,
        }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          zIndex: 100, borderRadius: "var(--ev-radius-md)",
          border: "1px solid var(--ev-line)",
          background: "var(--ev-panel)",
          boxShadow: "0 12px 40px rgba(0,0,0,.6)",
          maxHeight: 240, overflowY: "auto",
        }}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                width: "100%", padding: "10px 14px",
                textAlign: "left", background: "none", border: "none",
                fontSize: 14, fontFamily: "var(--ev-font-body)",
                color: opt === value ? "var(--ev-gold-bright)" : "var(--ev-ink)",
                backgroundColor: opt === value ? "rgba(201,162,75,.12)" : "transparent",
                cursor: "pointer",
                transition: "background .15s, color .15s",
              }}
              onMouseEnter={(e) => {
                if (opt !== value) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,.06)";
              }}
              onMouseLeave={(e) => {
                if (opt !== value) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
