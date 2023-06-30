import { initState, updateState, getState } from "./src/state.js";
import GridLines from "./src/grid_lines.js";
import Pointer from "./src/pointer.js";

// Init sidebar
initSidebar();
// Init state and the canvas
const s = initState();
// Init grid
const grid = new GridLines();
// Init pointer
new Pointer();
// Draw grid lines
grid.draw(s);

function initSidebar() {
  const sideBar = document.getElementById("side-bar");
  for (let c of sideBar.children) {
    c.onclick = function () {
      let sym;
      switch (this.children[0].id) {
        case "run":
          const state = getState();
          if (state.symbolList.length === 0) {
            window.alert("Please place some symbols!");
            break;
          }
          const res = state.symbolList[state.symbolList.length - 1].evaluate();

          window.alert(`RESULT: ${res}`);
          break;
        case "sym-true":
          sym = "TRUE";
          break;
        case "sym-false":
          sym = "FALSE";
          break;
        case "sym-pipe":
          sym = "PIPE";
          break;
        case "sym-var":
          sym = "VAR";
          break;
        case "sym-erase":
          sym = "ERASE";
          break;
      }
      updateState("SET_SYM", { currentSymbol: sym });
    };
  }
}
