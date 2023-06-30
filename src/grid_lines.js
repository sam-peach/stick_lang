import GuiElement from "./gui_element.js";
import { updateState } from "./state.js";
import { CELL_SIZE } from "./constants.js";

export default class GridLines extends GuiElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.color = "green";
  }

  render({ ctx, size }) {
    const space = CELL_SIZE;
    // const size = getState("size");
    // top is the position where the first line should be drawn (it's this part that gives the scrolling illusion)
    // left is the position where the first line should be drawn
    const top = -size.track.top % space;
    const left = -size.track.left % space; // - space is used only to reverse the direction of the lines

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";

    // clear the canvas
    ctx.clearRect(0, 0, size.width, size.height);

    // draw the 1px grid lines on the x axis
    for (let i = top; i < size.height; i += space) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size.width, i);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }

    // draw the 1px grid lines on the y axis
    for (let i = left; i < size.width; i += space) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size.height);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }
  }

  onChange(action, newState) {
    switch (action) {
      case "MOUSE_MOVE":
        if (newState.mouseDown) {
          this.handelMouseScroll(newState);
          return true;
        }
    }
  }

  handelMouseScroll({ size, mouseX, mouseY, prevMouseX, prevMouseY }) {
    // if the mouse is down and the tool is hand
    // if (this.mouse.down && this.tool === "hand") {
    const xDistance = mouseX - prevMouseX;
    const yDistance = mouseY - prevMouseY;
    const newSize = { ...size };

    // handel Y Scrolling
    if (yDistance >= 0) {
      // Up
      if (size.top === 0) {
        // When reaching top
        newSize._height += yDistance;
      } else {
        // When There is space to scroll
        newSize.top = size.top - yDistance >= 0 ? size.top - yDistance : 0;
      }
      newSize.track.top -= yDistance;
    } else {
      // DOWN
      if (size.top + size.height === size._height) {
        // when reaching bottom
        newSize._height -= yDistance;
        newSize.top -= yDistance;
      } else {
        // When there is space to scroll
        newSize.top =
          size.top - yDistance <= size._height - size.height
            ? size.top - yDistance
            : size._height - size.height;
      }
      newSize.track.top -= yDistance;
    }

    // handel X Scrolling
    if (xDistance >= 0) {
      // Right
      if (size.left === 0) {
        // When reaching right
        newSize._width += xDistance;
      } else {
        // When There is space to scroll
        newSize.left = size.left - xDistance >= 0 ? size.left - xDistance : 0;
      }
      newSize.track.left -= xDistance;
    } else {
      // Left
      if (size.left + size.width === size._width) {
        // when reaching left
        newSize._width -= xDistance;
        newSize.left -= xDistance;
      } else {
        // When there is space to scroll
        newSize.left =
          size.left - xDistance <= size._width - size.width
            ? size.left - xDistance
            : size._width - size.width;
      }
      newSize.track.left -= xDistance;
    }

    updateState("SET_SIZE", newSize);
  }
}
