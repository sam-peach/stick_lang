import GuiElement from "./gui_element.js";
import { drawTrue } from "./sym_util.js";
import { registerSym } from "./state.js";
import { CELL_SIZE } from "./constants.js";

class TrueSym extends GuiElement {
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

    this.type = "TRUE";
    this.inputLeft = inputLeft;
    this.inputRight = inputRight;
    this.output = output;

    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    this.coordSetters = {
      [[worldX, worldY]]: (val) => (this.inputLeft = val),
      [[worldX + CELL_SIZE, worldY]]: (val) => (this.inputRight = val),
      [[worldX, worldY + 2 * CELL_SIZE]]: (val) => (this.output = val),
    };

    registerSym(this);
  }

  render({ ctx }) {
    drawTrue(ctx, this.x - this.xOffset, this.y - this.yOffset);
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
    return this.inputLeft ? this.inputLeft.evaluate() : 1;
  }

  getCoordinates() {
    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    return [
      [worldX, worldY],
      [worldX + CELL_SIZE, worldY],
      [worldX, worldY + 2 * CELL_SIZE],
    ];
  }
}

export default TrueSym;
