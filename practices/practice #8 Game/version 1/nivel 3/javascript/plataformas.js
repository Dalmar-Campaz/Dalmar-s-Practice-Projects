
export const plataformas = [
    { x: 310, y: 745, width: 102, height: 3 },
    { x: 160, y: 655, width: 120, height: 3 },
    { x: 377, y: 622, width: 162, height: 3 },
    { x: 290, y: 575, width: 62, height: 3 },
    { x: 60, y: 522, width: 136, height: 3 },
    { x: 236, y: 495, width: 85, height: 3 },
    { x: 372, y: 435, width: 155, height: 3 },
    { x: 138, y: 387, width: 130, height: 3 },
    { x: 312, y: 315, width: 112, height: 3 },
    { x: 68, y: 267, width: 160, height: 3 },
    { x: 383, y: 229, width: 170, height: 3 },
    { x: 200, y: 190, width: 200, height: 3 },
  ];
  
export function drawPlataformas(ctx) {
    ctx.fillStyle = "red";
    plataformas.forEach((p) => {
      ctx.fillRect(p.x, p.y, p.width, p.height);
    });
  }