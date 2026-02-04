type Props = {
  value: string;
  onSelect: (v: string) => void;
};

const methods = [
  ["GaussElimination", "Gauss Elimination", "Partial pivoting"],
  ["GaussJordan", "Gauss–Jordan", "Reduced row form"],
  ["Lu", "LU factorization", "Matrix decomposition"],
  ["Inverse", "Inverse matrix", "A⁻¹ b"],
] as const;

export default function MethodPanel({ value, onSelect }: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <header className="px-6 py-4 border-b border-white/10">
        <h2 className="font-medium">Method</h2>
        <p className="text-xs text-slate-400">Choose solving algorithm</p>
      </header>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {methods.map(([key, title, sub]) => {
          const active = value === key;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`
                relative overflow-hidden rounded-xl
                border bg-black/40 px-5 py-5 text-left
                transition
                ${
                  active
                    ? "border-cyan-400/60 shadow-[0_0_40px_-10px_rgba(34,211,238,0.45)]"
                    : "border-white/10 hover:border-cyan-400/40"
                }
              `}
            >
              <div
                className={`
                  absolute inset-x-0 top-0 h-[2px]
                  bg-gradient-to-r from-cyan-400 to-fuchsia-500
                  transition
                  ${active ? "opacity-100" : "opacity-0"}
                `}
              />

              <div className="space-y-1">
                <div className="font-medium">{title}</div>
                <div className="text-xs text-slate-400">{sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
