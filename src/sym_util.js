import { CELL_SIZE, SYM_LINE_WIDTH, SYM_LINE_COLOR } from "./constants.js";

export const drawTrue = (ctx, x, y) => {
  ctx.lineWidth = SYM_LINE_WIDTH;
  ctx.strokeStyle = SYM_LINE_COLOR;
  ctx.beginPath();
  // Straight line
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + CELL_SIZE * 2);

  // Bend
  ctx.moveTo(x + CELL_SIZE, y);
  ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
  ctx.lineTo(x, y + CELL_SIZE);

  ctx.stroke();
};

export const drawFalse = (ctx, x, y) => {
  ctx.lineWidth = SYM_LINE_WIDTH;
  ctx.strokeStyle = SYM_LINE_COLOR;
  ctx.beginPath();
  // Straight line
  ctx.moveTo(x + CELL_SIZE, y);
  ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE * 2);
  // Bend
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + CELL_SIZE);
  ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);

  ctx.stroke();
};
