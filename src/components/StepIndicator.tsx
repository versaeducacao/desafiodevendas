import { MACRO_BLOCKS, BLOCKS } from "../data/questions";

interface Props {
  currentBlockId: string | null;
  completedBlocks: string[];
  onGoToBlock?: (blockId: string) => void;
}

const MACRO_COLORS: Record<string, string> = {
  loja: "var(--ev-gold-bright)",
  gestao: "#7fb0ff",
  time: "#5ad1b0",
};

export function StepIndicator({ currentBlockId, completedBlocks, onGoToBlock }: Props) {
  const currentMacro = MACRO_BLOCKS.find((m) =>
    currentBlockId ? m.blocks.includes(currentBlockId as never) : false
  );

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {MACRO_BLOCKS.map((macro) => {
        const color = MACRO_COLORS[macro.id];
        const isActive = currentMacro?.id === macro.id;
        const allDone = macro.blocks.every((b) => completedBlocks.includes(b));
        const doneCount = macro.blocks.filter((b) => completedBlocks.includes(b)).length;

        // sub-block dots inside active macro
        const dots = isActive ? macro.blocks.map((bid) => {
          const isDone = completedBlocks.includes(bid);
          const isCurrent = currentBlockId === bid;
          return { bid, isDone, isCurrent };
        }) : null;

        return (
          <div
            key={macro.id}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 12,
              border: `1px solid ${isActive ? color : allDone ? `${color}50` : "var(--ev-line-soft)"}`,
              background: isActive ? `${color}0d` : "transparent",
              transition: "all .3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              {/* Status icon */}
              <div style={{
                width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, fontWeight: 800,
                background: allDone ? color : isActive ? `${color}25` : "transparent",
                color: allDone ? "#1a1208" : color,
                border: `1.5px solid ${allDone ? "transparent" : color}`,
              }}>
                {allDone ? "✓" : ""}
              </div>

              <span style={{
                fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 12,
                color: isActive ? color : allDone ? `${color}cc` : "var(--ev-muted-2)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {macro.label}
              </span>
            </div>

            {/* Right side: sub-dots when active, counter when not */}
            {isActive && dots ? (
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                {dots.map(({ bid, isDone, isCurrent }) => (
                  <div
                    key={bid}
                    onClick={() => isDone && onGoToBlock?.(bid)}
                    title={BLOCKS.find((b) => b.id === bid)?.label}
                    style={{
                      width: isCurrent ? 20 : 6,
                      height: 6, borderRadius: 3,
                      background: isCurrent ? color : isDone ? `${color}80` : `${color}30`,
                      cursor: isDone && !isCurrent ? "pointer" : "default",
                      transition: "all .3s ease",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ) : (
              <span style={{ fontSize: 10, color: "var(--ev-muted-2)", flexShrink: 0 }}>
                {doneCount}/{macro.blocks.length}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
