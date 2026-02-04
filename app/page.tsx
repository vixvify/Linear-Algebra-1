"use client";

import Link from "next/link";

const pages = [
  {
    href: "/gauss-elimination",
    title: "Gauss Elimination",
    sub: "Partial pivoting",
    desc: "ใช้การกำจัดตัวแปรทีละขั้นพร้อมการเลือก pivot เพื่อช่วยลดความคลาดเคลื่อนเชิงตัวเลข เหมาะสำหรับการแก้ระบบสมการเชิงเส้นทั่วไป",
    tag: "เสถียร / เร็ว",
  },
  {
    href: "/gauss-jordan",
    title: "Gauss Jordan",
    sub: "Reduced row form",
    desc: "แปลงเมทริกซ์เสริมให้อยู่ในรูปแบบ reduced row echelon form ทำให้สามารถอ่านคำตอบของระบบสมการออกมาได้โดยตรง",
    tag: "เห็นขั้นตอนชัด",
  },
  {
    href: "/lu",
    title: "LU factorization",
    sub: "Matrix decomposition",
    desc: "แยกเมทริกซ์สัมประสิทธิ์ออกเป็นเมทริกซ์ L และ U เพื่อให้สามารถนำไปแก้ระบบสมการหลายครั้งได้อย่างมีประสิทธิภาพ",
    tag: "เหมาะกับใช้ซ้ำ",
  },
  {
    href: "/inverse",
    title: "Inverse method",
    sub: "A⁻¹ b",
    desc: "หาคำตอบของระบบสมการด้วยการคำนวณเมทริกซ์ผกผันแล้วนำไปคูณกับเวกเตอร์ด้านขวา เหมาะสำหรับการสาธิตแนวคิดทางทฤษฎี",
    tag: "เชิงสาธิต",
  },
];

export default function LinearSystemHome() {
  return (
    <div className="space-y-12 mt-20">
      {/* Hero */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          Linear System Solver
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Explore classical numerical methods for solving systems of linear
          equations. Each method is implemented as an independent playground.
        </p>
      </header>

      {/* Method grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="
              group relative overflow-hidden
              rounded-2xl
              border border-white/10
              bg-black/40
              backdrop-blur-xl
              p-6
              transition
              hover:-translate-y-1
              hover:border-cyan-400/40
              hover:shadow-[0_15px_50px_-20px_rgba(34,211,238,0.35)]
            "
          >
            {/* gradient accent */}
            <div
              className="
                pointer-events-none absolute inset-x-0 top-0 h-[2px]
                bg-gradient-to-r from-cyan-400 to-fuchsia-500
                opacity-0 group-hover:opacity-100 transition
              "
            />

            <div className="flex flex-col h-full space-y-4">
              {/* header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium text-lg">{p.title}</h2>

                  <span
                    className="
                      text-[10px] px-2 py-0.5 rounded-full
                      border border-cyan-400/30
                      text-cyan-300
                      bg-cyan-400/10
                    "
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="text-xs text-slate-400">{p.sub}</div>
              </div>

              {/* description */}
              <p className="text-sm text-slate-300 leading-relaxed flex-1">
                {p.desc}
              </p>

              {/* footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Open playground</span>

                <span
                  className="
                    text-sm
                    text-cyan-300
                    opacity-0
                    translate-x-[-6px]
                    transition
                    group-hover:opacity-100
                    group-hover:translate-x-0
                  "
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
