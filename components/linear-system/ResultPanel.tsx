import matrixToPrettyString from "@/modules/matrixToPrettyString";

type SolveSuccess = {
  ok: true;
  x: number[];
};

type SolveError = {
  ok: false;
  message: string;
};

export type SolveResult = SolveSuccess | SolveError | null;

type Props = {
  methods: string;
  result: SolveResult;
  inverse: number[][] | null;
};

export default function ResultPanel({ methods, result, inverse }: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <header className="px-6 py-4 border-b border-white/10">
        <h2 className="font-medium">Result</h2>
      </header>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solution */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-5 space-y-4">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Solution {methods && `(${methods})`}
          </div>

          <div className="flex flex-wrap gap-3">
            {result?.ok &&
              result?.x?.map((v: number, i: number) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm"
                >
                  x{i + 1} = {v.toFixed(4)}
                </div>
              ))}

            {result && !result.ok && (
              <div className="text-red-400 text-sm">{result.message}</div>
            )}

            {!result && <div className="text-slate-500 text-sm">No result</div>}
          </div>
        </div>

        {/* Inverse */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-5 space-y-4">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Inverse matrix
          </div>

          {inverse ? (
            <pre className="font-mono text-xs leading-relaxed max-h-64 overflow-auto">
              {matrixToPrettyString(inverse)}
            </pre>
          ) : (
            <div className="text-slate-500 text-sm">
              Only available for inverse method
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
