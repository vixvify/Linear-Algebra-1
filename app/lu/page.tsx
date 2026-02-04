import SolverPageShell from "@/components/linear-system/SolverPageShell";

export default function Page() {
  return (
    <SolverPageShell
      method="Lu"
      title="LU factorization"
      subtitle="Matrix decomposition"
    />
  );
}
