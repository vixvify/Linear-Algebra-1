import SolverPageShell from "@/components/linear-system/SolverPageShell";

export default function Page() {
  return (
    <SolverPageShell
      method="GaussJordan"
      title="Gauss Jordan"
      subtitle="Reduced row echelon form"
    />
  );
}
