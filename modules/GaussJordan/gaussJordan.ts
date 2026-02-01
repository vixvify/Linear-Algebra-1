export default function gaussJordan(A: number[][], b: number[]) {

  const n = A.length;

  // สร้างสำเนา matrix A และ vector b เพื่อไม่ให้ไปแก้ค่าต้นฉบับ
  const M = A.map(row => [...row]);
  const B = [...b];

  // ทำทีละ column (pivot ทีละตัว)
  for (let k = 0; k < n; k++) {

    // 1) Partial Pivoting เลือกแถวที่มีค่าสัมบูรณ์ของ pivot มากที่สุด
    // เพื่อเพิ่มความแม่นยำและเลี่ยงการหารด้วยเลขเล็กมาก
    let maxRow = k;
    let maxVal = Math.abs(M[k][k]);

    for (let i = k + 1; i < n; i++) {
      if (Math.abs(M[i][k]) > maxVal) {
        maxVal = Math.abs(M[i][k]);
        maxRow = i;
      }
    }

    // ถ้า pivot = 0 แปลว่าไม่มีคำตอบแบบ unique
    if (M[maxRow][k] === 0) {
      throw new Error("Matrix is singular (no unique solution)");
    }

    // สลับแถว เพื่อให้ pivot อยู่ตำแหน่งที่ถูกต้อง
    if (maxRow !== k) {
      [M[k], M[maxRow]] = [M[maxRow], M[k]];
      [B[k], B[maxRow]] = [B[maxRow], B[k]];
    }

    // 2) Normalize pivot row ทำให้ pivot = 1
    const pivot = M[k][k];

    for (let j = 0; j < n; j++) {
      M[k][j] /= pivot;
    }
    B[k] /= pivot;

    // 3) Eliminate other rows ทำให้ตัวเลขเหนือและใต้ pivot เป็น 0
    for (let i = 0; i < n; i++) {
      if (i !== k) {
        const factor = M[i][k];

        for (let j = 0; j < n; j++) {
          M[i][j] -= factor * M[k][j];
        }

        B[i] -= factor * B[k];
      }
    }
  }

  // เมื่อจบแล้ว matrix A จะกลายเป็น Identity Matrix
  // และ vector B จะเป็นคำตอบของระบบสมการ
  return B;
}

