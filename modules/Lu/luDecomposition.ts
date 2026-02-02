export default function luDecomposition(A: number[][]) {
  const n = A.length;

  // U เริ่มจาก A
  const U = A.map((r) => [...r]);

  // L เริ่มเป็น identity
  const L: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );

  // permutation vector
  const P = Array.from({ length: n }, (_, i) => i);

  for (let i = 0; i < n; i++) {
    // ===== เลือก pivot (partial pivoting) =====
    let maxRow = i;
    let maxVal = Math.abs(U[i][i]);

    for (let r = i + 1; r < n; r++) {
      if (Math.abs(U[r][i]) > maxVal) {
        maxVal = Math.abs(U[r][i]);
        maxRow = r;
      }
    }

    if (Math.abs(maxVal) < 1e-12) {
      throw new Error("Matrix is singular");
    }

    // ===== สลับแถว =====
    if (maxRow !== i) {
      [U[i], U[maxRow]] = [U[maxRow], U[i]];
      [P[i], P[maxRow]] = [P[maxRow], P[i]];

      // ต้องสลับเฉพาะส่วนที่สร้าง L ไปแล้ว
      for (let j = 0; j < i; j++) {
        [L[i][j], L[maxRow][j]] = [L[maxRow][j], L[i][j]];
      }
    }

    // ===== elimination =====
    for (let k = i + 1; k < n; k++) {
      // ตัวคูณ m
      const m = U[k][i] / U[i][i];

      // เก็บลง L
      L[k][i] = m;

      // Rk = Rk - m Ri
      for (let j = i; j < n; j++) {
        U[k][j] -= m * U[i][j];
      }
    }
  }

  // ได้ PA = LU
  return { L, U, P };
}
