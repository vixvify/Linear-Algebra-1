export default function inverseMatrix(A: number[][]) {
  const n = A.length;

  // สร้างเมทริกซ์เสริม [A | I]
  const aug = A.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  for (let i = 0; i < n; i++) {
    // เลือกแถว pivot (partial pivoting)
    // หาแถวที่ |aug[row][i]| มากที่สุด
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) {
        maxRow = k;
      }
    }

    // สลับแถว i กับ maxRow
    if (maxRow !== i) {
      [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];
    }

    const pivot = aug[i][i];

    // ถ้า pivot เป็นศูนย์ (หรือใกล้ศูนย์มาก)
    // แปลว่าไม่สามารถทำ inverse ได้
    if (Math.abs(pivot) < 1e-12) {
      throw new Error("Matrix is singular or nearly singular");
    }

    // ทำให้ pivot เป็น 1
    for (let j = 0; j < 2 * n; j++) {
      aug[i][j] /= pivot;
    }

    // ทำให้สมาชิกคอลัมน์ i
    // ในแถวอื่นเป็น 0
    for (let k = 0; k < n; k++) {
      if (k === i) continue;

      const factor = aug[k][i];
      for (let j = 0; j < 2 * n; j++) {
        aug[k][j] -= factor * aug[i][j];
      }
    }
  }

  // ดึงฝั่งขวาออกมาเป็น A^{-1}
  return aug.map((r) => r.slice(n));
}
