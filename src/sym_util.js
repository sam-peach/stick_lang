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

export const drawVariable = (ctx, x, y) => {
  const lineWidth = SYM_LINE_WIDTH / 3;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = SYM_LINE_COLOR;

  const baseX = x - lineWidth;
  ctx.beginPath();
  // Segment 1
  ctx.moveTo(baseX, y);
  ctx.lineTo(baseX, y + CELL_SIZE - lineWidth);
  ctx.lineTo(baseX - CELL_SIZE + lineWidth, y - lineWidth + CELL_SIZE);

  // Segment 2
  ctx.moveTo(baseX - CELL_SIZE + lineWidth, y + lineWidth + CELL_SIZE);
  ctx.lineTo(baseX, y + lineWidth + CELL_SIZE);
  ctx.lineTo(baseX, y + 2 * CELL_SIZE);

  // Segment 3
  ctx.moveTo(baseX + 2 * lineWidth, y + 2 * CELL_SIZE);
  ctx.lineTo(baseX + 2 * lineWidth, y + lineWidth + CELL_SIZE);
  ctx.lineTo(baseX + CELL_SIZE, y + lineWidth + CELL_SIZE);
  ctx.lineTo(baseX + CELL_SIZE, y + 2 * CELL_SIZE);

  // Segment 4
  ctx.moveTo(baseX + CELL_SIZE + 2 * lineWidth, y + 2 * CELL_SIZE);
  ctx.lineTo(baseX + CELL_SIZE + 2 * lineWidth, y + lineWidth + CELL_SIZE);
  ctx.lineTo(baseX + 2 * CELL_SIZE + 2 * lineWidth, y + lineWidth + CELL_SIZE);

  // Segment 5
  ctx.moveTo(baseX + 2 * CELL_SIZE + 2 * lineWidth, y - lineWidth + CELL_SIZE);
  ctx.lineTo(baseX + CELL_SIZE + 2 * lineWidth, y - lineWidth + CELL_SIZE);
  ctx.lineTo(baseX + CELL_SIZE + 2 * lineWidth, y);

  // Segment 6
  ctx.moveTo(baseX + CELL_SIZE, y);
  ctx.lineTo(baseX + CELL_SIZE, y + CELL_SIZE - lineWidth);
  ctx.lineTo(baseX + 2 * lineWidth, y + CELL_SIZE - lineWidth);
  ctx.lineTo(baseX + 2 * lineWidth, y);

  ctx.stroke();
};

export const drawPipe = (ctx, x1, y1, x2, y2) => {
  ctx.lineWidth = SYM_LINE_WIDTH;
  ctx.strokeStyle = SYM_LINE_COLOR;

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.stroke();
};
