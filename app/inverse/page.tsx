import SolverPageShell from "@/components/linear-system/SolverPageShell";

export default function Page() {
  return (
    <SolverPageShell
      method="Inverse"
      title="Inverse method"
      subtitle="Solve by A⁻¹ b"
    />
  );
}
