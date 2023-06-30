import GuiElement from "./gui_element.js";
import { drawFalse, drawTrue } from "./sym_util.js";

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

  render({ ctx, size }) {
    switch (this.type) {
      case "TRUE":
        drawTrue(ctx, this.x - this.xOffset, this.y - this.yOffset);
        break;
      case "FALSE":
        drawFalse(ctx, this.x - this.xOffset, this.y - this.yOffset);
        break;
    }
  }

  onChange(action, { size }) {
    switch (action) {
      case "SET_SIZE":
        this.xOffset = size.track.left - this.xOffsetWorld;
        this.yOffset = size.track.top - this.yOffsetWorld;
    }
  }
}

export default Symbol;
