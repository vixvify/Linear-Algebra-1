export default function luDecomposition(A: number[][]) {
  const n = A.length;

  // สร้างเมทริกซ์ L และ U (เริ่มจากศูนย์ทั้งหมด)
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));

  // P คือ permutation vector (ใช้แทนเมทริกซ์ P)
  // P[i] = แถวเดิมของ A ที่ถูกย้ายมาอยู่แถว i
  const P = Array.from({ length: n }, (_, i) => i);

  // M คือสำเนาของ A เอาไว้ทำ elimination จริง
  const M = A.map((r) => [...r]);

  // ไล่ทีละคอลัมน์ (pivot ทีละตัว)
  for (let i = 0; i < n; i++) {
    // ====== เลือก pivot (partial pivoting) ======
    let maxRow = i;
    let maxVal = Math.abs(M[i][i]);

    for (let r = i + 1; r < n; r++) {
      if (Math.abs(M[r][i]) > maxVal) {
        maxVal = Math.abs(M[r][i]);
        maxRow = r;
      }
    }

    // ถ้าพบแถวที่เหมาะกว่า → สลับแถว
    if (maxRow !== i) {
      [M[i], M[maxRow]] = [M[maxRow], M[i]];

      // บันทึกการสลับแถวไว้ใน P
      [P[i], P[maxRow]] = [P[maxRow], P[i]];

      // ต้องสลับค่าใน L ด้วย (เฉพาะคอลัมน์ก่อนหน้า)
      for (let j = 0; j < i; j++) {
        [L[i][j], L[maxRow][j]] = [L[maxRow][j], L[i][j]];
      }
    }

    // ====== คำนวณแถวที่ i ของ U ======
    // สูตร : U[i][k] = M[i][k] - sum(L[i][j] * U[j][k])
    for (let k = i; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = M[i][k] - sum;
    }

    // ถ้า pivot เป็นศูนย์ (หรือใกล้ศูนย์มาก)
    if (Math.abs(U[i][i]) < 1e-12) {
      throw new Error("Matrix is singular (no unique solution)");
    }

    // ค่าแนวทแยงของ L เป็น 1 เสมอ
    L[i][i] = 1;

    // ====== คำนวณคอลัมน์ที่ i ของ L ======
    // สูตร : L[k][i] = (M[k][i] - sum(L[k][j] * U[j][i])) / U[i][i]
    for (let k = i + 1; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[k][j] * U[j][i];
      }
      L[k][i] = (M[k][i] - sum) / U[i][i];
    }
  }

  // ได้ PA = LU  (โดย P เก็บในรูปเวกเตอร์)
  return { L, U, P };
}
