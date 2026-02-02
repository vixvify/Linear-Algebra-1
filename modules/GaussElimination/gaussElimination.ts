export default function gaussEliminationPivot(A: number[][], b: number[]) {
  const n = A.length;

  // สร้างสำเนา matrix A และ vector b เพื่อไม่ให้ไปแก้ค่าต้นฉบับ
  const M = A.map((row) => [...row]);
  const B = [...b];

  // Forward Elimination ทำให้ matrix อยู่ในรูปสามเหลี่ยมบน
  for (let k = 0; k < n - 1; k++) {
    // 1) Partial Pivoting เลือกแถวที่มีค่าสัมบูรณ์ของ pivot มากที่สุดเพื่อให้การคำนวณเสถียรขึ้น
    let maxRow = k;
    let maxVal = Math.abs(M[k][k]);

    for (let i = k + 1; i < n; i++) {
      if (Math.abs(M[i][k]) > maxVal) {
        maxVal = Math.abs(M[i][k]);
        maxRow = i;
      }
    }

    if (Math.abs(maxVal) < 1e-12) {
      throw new Error("Matrix is singular");
    }

    // สลับแถว เพื่อให้ pivot อยู่ตำแหน่งบนสุด
    if (maxRow !== k) {
      [M[k], M[maxRow]] = [M[maxRow], M[k]];
      [B[k], B[maxRow]] = [B[maxRow], B[k]];
    }

    // 2) Elimination ทำให้ค่าด้านล่าง pivot เป็น 0
    for (let i = k + 1; i < n; i++) {
      const factor = M[i][k] / M[k][k];

      // ลบสมการแถวบนออกจากแถวล่าง
      for (let j = k; j < n; j++) {
        M[i][j] -= factor * M[k][j];
      }

      B[i] -= factor * B[k];
    }
  }

  // Back Substitution แก้สมการจากแถวล่างขึ้นบน
  const x = new Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let sum = B[i];

    // ย้ายตัวแปรที่รู้ค่าแล้วไปอีกฝั่ง
    for (let j = i + 1; j < n; j++) {
      sum -= M[i][j] * x[j];
    }
    if (Math.abs(M[i][i]) < 1e-12) {
      if (Math.abs(sum) < 1e-12) {
        throw new Error("Infinite solutions");
      } else {
        throw new Error("No solution");
      }
    }

    // หาค่าตัวแปรตัวที่ i
    x[i] = sum / M[i][i];
  }

  // vector x คือคำตอบของระบบสมการ
  return x;
}
