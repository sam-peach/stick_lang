import GuiElement from "./gui_element.js";
import { drawFalse, drawTrue, drawPipe } from "./sym_util.js";

class Symbol extends GuiElement {
  constructor(type, x, y, xOffsetWorld, yOffsetWorld) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.xOffsetWorld = xOffsetWorld;
    this.yOffsetWorld = yOffsetWorld;
    this.xOffset = 0;
    this.yOffset = 0;
  }

  render({ ctx, mouseXClamp, mouseYClamp }) {
    switch (this.type) {
      case "TRUE":
        drawTrue(ctx, this.x - this.xOffset, this.y - this.yOffset);
        break;
      case "FALSE":
        drawFalse(ctx, this.x - this.xOffset, this.y - this.yOffset);
        break;
      case "PIPE":
        if (this.x2 && this.y2) {
          drawPipe(
            ctx,
            this.x - this.xOffset,
            this.y - this.yOffset,
            this.x2 - this.xOffset,
            this.y2 - this.yOffset
          );
        } else {
          drawPipe(
            ctx,
            this.x - this.xOffset,
            this.y - this.yOffset,
            mouseXClamp,
            mouseYClamp
          );
        }
        break;
    }
  }

  onChange(
    action,
    { size, mouseX, mouseY, mouseBtn, pageOffsetX, pageOffsetY }
  ) {
    switch (action) {
      case "SET_SIZE":
        this.xOffset = size.track.left - this.xOffsetWorld;
        this.yOffset = size.track.top - this.yOffsetWorld;
        break;
      case "MOUSE_DOWN":
        if (
          mouseBtn === "LEFT_CLICK" &&
          this.type === "PIPE" &&
          !this.x2 &&
          !this.y2
        ) {
          this.x2 = mouseX - pageOffsetX;
          this.y2 = mouseY - pageOffsetY;
        }
    }
  }
}

export default Symbol;
