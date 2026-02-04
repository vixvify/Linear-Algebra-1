"use client";

import { useState } from "react";

import EquationPanel from "@/components/linear-system/EquationPanel";
import ResultPanel from "@/components/linear-system/ResultPanel";
import useLinearSolver from "@/hooks/useLinearSolver";

type Method = "GaussElimination" | "GaussJordan" | "Lu" | "Inverse";

type Props = {
  method: Method;
  title: string;
  subtitle: string;
};

const presets = [
  {
    name: "ตัวอย่าง 3 ตัวแปร",
    value: `2x + y + 3z = 1
4x + 3y + 5z = 1
6x + 5y + 5z = -3`,
  },
  {
    name: "ตัวอย่าง 2 ตัวแปร",
    value: `x + y = 2
2x - y = 0`,
  },
];

const methodExplain: Record<
  Method,
  {
    overview: string;
    tip: string;
  }
> = {
  GaussElimination: {
    overview:
      "วิธี Gaussian Elimination ใช้การแปลงแถวของเมทริกซ์ทีละขั้น เพื่อทำให้เมทริกซ์อยู่ในรูปสามเหลี่ยมบน แล้วจึงหาคำตอบด้วยการแทนค่าย้อนกลับ",
    tip: "เหมาะกับการแก้ระบบสมการทั่วไป และเป็นพื้นฐานของหลายอัลกอริทึมทางตัวเลข",
  },
  GaussJordan: {
    overview:
      "วิธี Gauss–Jordan จะจัดรูปเมทริกซ์ไปจนอยู่ใน reduced row echelon form ทำให้สามารถอ่านคำตอบออกมาได้โดยตรง",
    tip: "เหมาะสำหรับการเรียนรู้ขั้นตอนการแปลงแถว และการหาคำตอบแบบเห็นภาพชัด",
  },
  Lu: {
    overview:
      "วิธี LU factorization คือการแยกเมทริกซ์ A ออกเป็นเมทริกซ์ L และ U จากนั้นใช้การแทนค่าไป–กลับเพื่อหาคำตอบ",
    tip: "เหมาะมากเมื่อใช้เมทริกซ์ A เดิม แต่เปลี่ยนเวกเตอร์ b หลายครั้ง",
  },
  Inverse: {
    overview:
      "วิธีเมทริกซ์ผกผัน (Inverse method) ใช้การคำนวณ A⁻¹ แล้วนำไปคูณกับเวกเตอร์ b เพื่อหาคำตอบ",
    tip: "มักใช้เพื่อสาธิตแนวคิดทางทฤษฎี มากกว่าการคำนวณเชิงตัวเลขจริงในระบบขนาดใหญ่",
  },
};

export default function SolverPageShell({ method, title, subtitle }: Props) {
  const [equation, setEquation] = useState("");

  const { result, inverse_matrix } = useLinearSolver(equation, method);

  const explain = methodExplain[method];

  return (
    <div className="mt-10 space-y-10 animate-in fade-in duration-500">
      {/* header */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="animate-in slide-in-from-left-4 duration-500">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>

        {/* quick actions */}
        <div className="flex flex-wrap gap-2 animate-in slide-in-from-right-4 duration-500">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => setEquation(p.value)}
              className="
                rounded-lg
                border border-white/10
                bg-black/40
                px-3 py-1.5
                text-xs
                text-slate-300
                transition
                hover:-translate-y-0.5
                hover:border-cyan-400/40
                hover:bg-white/5
                active:scale-95
              "
            >
              {p.name}
            </button>
          ))}

          <button
            onClick={() => setEquation("")}
            className="
              rounded-lg
              border border-white/10
              bg-black/40
              px-3 py-1.5
              text-xs
              text-slate-300
              transition
              hover:-translate-y-0.5
              hover:border-red-400/40
              active:scale-95
            "
          >
            ล้างข้อมูล
          </button>
        </div>
      </header>

      {/* workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* input */}
        <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            input
          </div>

          <EquationPanel value={equation} onChange={setEquation} />
        </section>

        {/* output */}
        <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            output
          </div>

          <ResultPanel
            methods={method}
            result={result}
            inverse={inverse_matrix}
          />
        </section>
      </div>

      {/* explanation panel */}
      <section
        className="
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
          space-y-3
          animate-in fade-in duration-700
        "
      >
        <div className="text-xs uppercase tracking-wider text-slate-400">
          คำอธิบายวิธีคำนวณ
        </div>

        <p className="text-sm leading-relaxed text-slate-200">
          {explain.overview}
        </p>

        <p className="text-sm leading-relaxed text-slate-400">{explain.tip}</p>
      </section>
    </div>
  );
}
