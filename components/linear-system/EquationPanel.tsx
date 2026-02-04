type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function EquationPanel({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <header className="px-6 py-4 border-b border-white/10">
        <h2 className="font-medium">Equations</h2>
        <p className="text-xs text-slate-400">One equation per line</p>
      </header>

      <div className="p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`2x + y + 3z = 1
4x + 3y + 5z = 1
6x + 5y + 5z = -3`}
          className="
            w-full min-h-44 rounded-xl resize-none
            border border-white/10
            bg-black/40
            px-4 py-3
            font-mono text-sm
            outline-none
            focus:border-cyan-400/50
            focus:ring-2 focus:ring-cyan-400/20
          "
        />
      </div>
    </section>
  );
}
