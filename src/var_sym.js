import GuiElement from "./gui_element.js";
import { drawVariable } from "./sym_util.js";
import { registerSym } from "./state.js";
import { CELL_SIZE } from "./constants.js";

class VarSym extends GuiElement {
  constructor(x, y, xOffsetWorld, yOffsetWorld) {
    super();
    this.x = x;
    this.y = y;
    this.xOffsetWorld = xOffsetWorld;
    this.yOffsetWorld = yOffsetWorld;
    this.xOffset = 0;
    this.yOffset = 0;

    this.type = "VAR";
    this.inputTopLeft = null;
    this.inputTopRight = null;
    this.inputLeft = null;
    this.inputRight = null;
    this.outputLeft = null;
    this.outputRight = null;

    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    this.coordSetters = {
      [[worldX, worldY]]: (val) => (this.inputTopLeft = val),
      [[worldX + CELL_SIZE, worldY]]: (val) => (this.inputTopRight = val),
      [[worldX - CELL_SIZE, worldY + CELL_SIZE]]: (val) =>
        (this.inputLeft = val),
      [[worldX + 2 * CELL_SIZE, worldY + CELL_SIZE]]: (val) =>
        (this.inputRight = val),
      [[worldX, worldY + 2 * CELL_SIZE]]: (val) => (this.outputLeft = val),
      [[worldX + CELL_SIZE, worldY + 2 * CELL_SIZE]]: (val) =>
        (this.outputRight = val),
    };

    registerSym(this);
  }

  render({ ctx }) {
    drawVariable(ctx, this.x - this.xOffset, this.y - this.yOffset);
  }

  onChange(action, { size }) {
    switch (action) {
      case "SET_SIZE":
        this.xOffset = size.track.left - this.xOffsetWorld;
        this.yOffset = size.track.top - this.yOffsetWorld;
        break;
    }
  }

  getCoordinates() {
    const worldX = this.x + this.xOffsetWorld;
    const worldY = this.y + this.yOffsetWorld;

    return [
      [worldX, worldY],
      [worldX + CELL_SIZE, worldY],
      [worldX - CELL_SIZE, worldY + CELL_SIZE],
      [worldX + 2 * CELL_SIZE, worldY + CELL_SIZE], // right side
      [worldX, worldY + 2 * CELL_SIZE], // bottom outputs
      [worldX + CELL_SIZE, worldY + 2 * CELL_SIZE], // bottom outputs
    ];
  }

  evaluate() {
    const inputVal = this.inputLeft
      ? this.inputLeft.evaluate()
      : this.inputRight.evaluate();

    return inputVal
      ? this.inputTopLeft.evaluate()
      : this.inputTopRight.evaluate();
  }
}

export default VarSym;
