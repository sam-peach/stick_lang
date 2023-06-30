import GuiElement from "./gui_element.js";
import { drawFalse } from "./sym_util.js";
import { registerSym } from "./state.js";
import { CELL_SIZE } from "./constants.js";

class FalseSym extends GuiElement {
  constructor(
    x,
    y,
    xOffsetWorld,
    yOffsetWorld,
    inputLeft = null,
    inputRight = null,
    output = null
  ) {
    super();
    this.x = x;
    this.y = y;
    this.xOffsetWorld = xOffsetWorld;
    this.yOffsetWorld = yOffsetWorld;
    this.xOffset = 0;
    this.yOffset = 0;

    this.type = "FALSE";
    this.inputLeft = inputLeft;
    this.inputRight = inputRight;
    this.output = output;

    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    this.coordSetters = {
      [[worldX, worldY]]: (val) => (this.inputLeft = val),
      [[worldX + CELL_SIZE, worldY]]: (val) => (this.inputRight = val),
      [[worldX + CELL_SIZE, worldY + 2 * CELL_SIZE]]: (val) =>
        (this.output = val),
    };

    registerSym(this);
  }

  render({ ctx }) {
    drawFalse(ctx, this.x - this.xOffset, this.y - this.yOffset);
  }

  onChange(action, { size }) {
    switch (action) {
      case "SET_SIZE":
        this.xOffset = size.track.left - this.xOffsetWorld;
        this.yOffset = size.track.top - this.yOffsetWorld;
        break;
    }
  }

  evaluate() {
    return this.inputRight ? this.inputRight.evaluate() : 0;
  }

  getCoordinates() {
    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    return [
      [worldX, worldY],
      [worldX + CELL_SIZE, worldY],
      [worldX + CELL_SIZE, worldY + 2 * CELL_SIZE],
    ];
  }
}

export default FalseSym;
