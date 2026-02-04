import SolverPageShell from "@/components/linear-system/SolverPageShell";

export default function Page() {
  return (
    <SolverPageShell
      method="GaussElimination"
      title="Gauss Elimination"
      subtitle="Partial pivoting"
    />
  );
}
