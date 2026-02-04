export default function SolverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
      </div>

      <main className="mx-auto max-w-7xl px-5 py-14 space-y-10">
        {children}
      </main>
    </div>
  );
}
