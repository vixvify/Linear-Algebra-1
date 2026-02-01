import luDecomposition from "./luDecomposition";

export default function luSolve(A: number[][], b: number[]) {
  // แยก A เป็น L U และ P
  const { L, U, P } = luDecomposition(A);
  const n = A.length;

  // คำนวณ pb = P b
  // เพราะจริง ๆ เราแก้ระบบ
  //    PAx = Pb
  const pb = new Array(n);
  for (let i = 0; i < n; i++) {
    pb[i] = b[P[i]];
  }

  // ====== แก้ Ly = pb (forward substitution) ======
  const y = new Array(n);

  for (let i = 0; i < n; i++) {
    let sum = pb[i];
    for (let j = 0; j < i; j++) {
      sum -= L[i][j] * y[j];
    }
    // เพราะ L[i][i] = 1 เลยไม่ต้องหาร
    y[i] = sum;
  }

  // ====== แก้ Ux = y (back substitution) ======
  const x = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < n; j++) {
      sum -= U[i][j] * x[j];
    }
    x[i] = sum / U[i][i];
  }

  return x;
}
