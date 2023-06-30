import GuiElement from "./gui_element.js";
import { SYM_LINE_WIDTH, SYM_LINE_COLOR } from "./constants.js";
import { registerSym, registerPoint } from "./state.js";

class PipeSym extends GuiElement {
  constructor(x, y, xOffsetWorld, yOffsetWorld) {
    super();
    this.x = x;
    this.y = y;
    this.xOffsetWorld = xOffsetWorld;
    this.yOffsetWorld = yOffsetWorld;
    this.xOffset = 0;
    this.yOffset = 0;
    this.points = [];
    this.input = null;
    this.output = null;
    this.type = "PIPE";

    registerSym(this);
  }

  render({ ctx, size }) {
    ctx.lineWidth = SYM_LINE_WIDTH * 0.8;
    ctx.strokeStyle = SYM_LINE_COLOR;
    ctx.lineJoin = "round";
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(this.x - this.xOffset, this.y - this.yOffset, 8, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.setLineDash([15, 10]);
    ctx.moveTo(this.x - this.xOffset, this.y - this.yOffset);

    for (let idx = 0; idx < this.points.length; idx++) {
      const [x, y, xOffset, yOffset] = this.points[idx];
      ctx.lineTo(x - size.track.left + xOffset, y - size.track.top + yOffset);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    if (this.points.length > 0) {
      const [lastX, lastY, xOffset, yOffset] =
        this.points[this.points.length - 1];
      ctx.beginPath();
      ctx.arc(
        lastX - size.track.left + xOffset,
        lastY - size.track.top + yOffset,
        8,
        0,
        2 * Math.PI
      );

      ctx.closePath();
      ctx.fill();
    }
  }

  onChange(action, { size }) {
    switch (action) {
      case "SET_SIZE":
        this.xOffset = size.track.left - this.xOffsetWorld;
        this.yOffset = size.track.top - this.yOffsetWorld;
        break;
    }
  }

  pushEnd(point) {
    this.points.push(point);

    const [x, y, xOffset, yOffset] = point;
    registerPoint(this, [x + xOffset, y + yOffset]);
  }

  getCoordinates() {
    let output = [];
    if (this.points.length > 0) {
      const [lastX, lastY, lastXOffset, lastYOffset] =
        this.points[this.points.length - 1];
      output = [lastX + lastXOffset, lastY + lastYOffset];
    }

    return output.length > 0
      ? [[this.x + this.xOffsetWorld, this.y + this.yOffsetWorld], output]
      : [[this.x + this.xOffsetWorld, this.y + this.yOffsetWorld]];
  }

  getCoordSetters() {
    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    let output = [];
    if (this.points.length > 0) {
      const [lastX, lastY, lastXOffset, lastYOffset] =
        this.points[this.points.length - 1];
      output = [lastX + lastXOffset, lastY + lastYOffset];
    }

    return {
      [[worldX, worldY]]: (val) => (this.input = val),
      [output]: (val) => (this.output = val),
    };
  }

  evaluate() {
    return this.input.evaluate();
  }
}

export default PipeSym;
