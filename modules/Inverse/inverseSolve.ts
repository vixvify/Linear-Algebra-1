import inverseMatrix from "./inverseMatrix";

export default function inverseSolve(A: number[][], b: number[]) {
  // หาเมทริกซ์ผกผัน A^{-1}
  const inv = inverseMatrix(A);

  const n = A.length;

  // เวกเตอร์คำตอบ x (เริ่มต้นเป็นศูนย์)
  const x = new Array(n).fill(0);

  // คูณเมทริกซ์ A^{-1} กับเวกเตอร์ b
  // x = A^{-1} b
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      x[i] += inv[i][j] * b[j];
    }
  }

  // ส่งทั้งคำตอบ x และ inverse ของ A กลับไป
  return { x, inv };
}
