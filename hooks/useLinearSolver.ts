"use client";

import { useMemo } from "react";

import gaussEliminationPivot from "@/modules/GaussElimination/gaussElimination";
import gaussJordan from "@/modules/GaussJordan/gaussJordan";
import inverseSolve from "@/modules/Inverse/inverseSolve";
import luSolve from "@/modules/Lu/luSolve";
import parseEquations from "@/modules/parseEquations";
import { SolveResult } from "@/components/linear-system/ResultPanel";

export default function useLinearSolver(equation: string, methods: string) {
  const result = useMemo<SolveResult>(() => {
    if (!equation || !methods) return null;

    try {
      const { A, b } = parseEquations(equation);

      if (methods === "GaussElimination") {
        return { ok: true, x: gaussEliminationPivot(A, b) };
      }

      if (methods === "GaussJordan") {
        return { ok: true, x: gaussJordan(A, b) };
      }

      if (methods === "Lu") {
        return { ok: true, x: luSolve(A, b) };
      }

      if (methods === "Inverse") {
        return { ok: true, x: inverseSolve(A, b).x };
      }

      return null;
    } catch (err) {
      console.error(err);
      return {
        ok: false,
        message: "Cannot Solve This Equation",
      };
    }
  }, [equation, methods]);

  const inverse_matrix = useMemo(() => {
    if (!equation || !methods) return null;

    try {
      const { A, b } = parseEquations(equation);

      if (methods === "Inverse") {
        return inverseSolve(A, b).inv;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [equation, methods]);

  return { result, inverse_matrix };
}
