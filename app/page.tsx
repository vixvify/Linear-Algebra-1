"use client";

import { useState } from "react";

import SolverLayout from "@/components/linear-system/SolverLayout";
import EquationPanel from "@/components/linear-system/EquationPanel";
import MethodPanel from "@/components/linear-system/MethodPanel";
import ResultPanel from "@/components/linear-system/ResultPanel";

import useLinearSolver from "@/hooks/useLinearSolver";

export default function LinearSystemPage() {
  const [equation, setEquation] = useState("");
  const [methods, setMethods] = useState("");

  const { result, inverse_matrix } = useLinearSolver(equation, methods);

  return (
    <SolverLayout>
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          Linear System Solver
        </h1>
        <p className="text-sm text-slate-400">
          Numerical linear algebra playground
        </p>
      </header>

      <EquationPanel value={equation} onChange={setEquation} />

      <MethodPanel value={methods} onSelect={setMethods} />

      <ResultPanel methods={methods} result={result} inverse={inverse_matrix} />
    </SolverLayout>
  );
}
