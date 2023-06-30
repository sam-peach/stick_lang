import GuiElement from "./gui_element.js";
import { drawTrue, drawFalse, drawVariable } from "./sym_util.js";
import { handleTrue, handleFalse, handleVar, handlePipe } from "./handlers.js";

class Pointer extends GuiElement {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  render({ ctx, currentSymbol }) {
    this.drawPoint(ctx, 10, "#999");
    this.drawSymbol(ctx, currentSymbol);
  }

  onChange(action, state) {
    switch (action) {
      case "MOUSE_MOVE":
        this.x = state.mouseXClamp;
        this.y = state.mouseYClamp;
        break;
      case "MOUSE_DOWN":
        if (state.mouseBtn === "LEFT_CLICK") {
          switch (state.currentSymbol) {
            case "TRUE": {
              handleTrue(this, state);
              break;
            }
            case "FALSE": {
              handleFalse(this, state);
              break;
            }
            case "VAR": {
              handleVar(this, state);
              break;
            }
            case "PIPE":
              handlePipe(this, state);
              break;
          }
        }
        break;
    }
  }

  drawPoint(ctx, r, fill) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, 2 * Math.PI);
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
      case "VAR":
        drawVariable(ctx, this.x, this.y);
        break;
      case "PIPE":
        this.drawPoint(ctx, 5, "black");
        break;
    }
  }
}

export default Pointer;
