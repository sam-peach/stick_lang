import GuiElement from "./gui_element.js";
import { CELL_SIZE } from "./constants.js";
import { drawTrue, drawFalse } from "./sym_util.js";
import Symbol from "./symbol.js";

class CurrCell extends GuiElement {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  render({ ctx, currentSymbol }) {
    this.drawPoint(ctx);
    this.drawSymbol(ctx, currentSymbol);
  }

  onChange(action, { mouseX, mouseY, size, mouseBtn, currentSymbol }) {
    switch (action) {
      case "MOUSE_MOVE":
        const xOffset = Math.round(size.track.left % CELL_SIZE);
        const yOffset = Math.round(size.track.top % CELL_SIZE);
        const clampX = Math.floor(mouseX / CELL_SIZE);
        const clampY = Math.floor(mouseY / CELL_SIZE);

        this.x = clampX * CELL_SIZE - xOffset;
        this.y = clampY * CELL_SIZE - yOffset;
        break;
      case "MOUSE_DOWN":
        if (mouseBtn === "LEFT_CLICK") {
          new Symbol(
            currentSymbol,
            this.x,
            this.y,
            size.track.left,
            size.track.top
          );
        }
        break;
    }
  }

  drawPoint(ctx) {
    ctx.fillStyle = "#999";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  drawSymbol(ctx, currentSymbol) {
    switch (currentSymbol) {
      case "TRUE":
        drawTrue(ctx, this.x, this.y);
        break;
      case "FALSE":
        drawFalse(ctx, this.x, this.y);
        break;
    }
  }
}

export default CurrCell;
