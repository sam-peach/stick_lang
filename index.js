// import { Canvas } from "./canvas.js";
import { initState, updateState } from "./src/state.js";
import GridLines from "./src/grid_lines.js";
import CurrCell from "./src/curr_cell.js";

const s = initState();
const c = new GridLines();

new CurrCell();

c.draw(s);

window.addEventListener("mousemove", (e) => {
  updateState("MOUSE_MOVE", { mouseX: e.clientX, mouseY: e.clientY });
});

window.addEventListener("mousedown", (e) => {
  let mouseBtn;
  switch (e.button) {
    case 0:
      mouseBtn = "LEFT_CLICK";
      break;
    case 1:
      mouseBtn = "WHEEL_CLICK";
    case 2:
      mouseBtn = "RIGHT_CLICK";
  }

  updateState("MOUSE_DOWN", { mouseDown: true, mouseBtn: mouseBtn });
});

window.addEventListener("mouseup", (_e) => {
  updateState("MOUSE_DOWN", { mouseDown: false });
});

window.addEventListener("keydown", (e) => {
  updateState("KEY_DOWN", { key: e.key.toLowerCase() });
});

window.addEventListener("keyup", (e) => {
  updateState("KEY_UP", { key: e.key.toLowerCase() });
});
