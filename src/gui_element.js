import { subscribe } from "./state.js";

class GuiElement {
  constructor() {
    subscribe(this);
  }

  draw(state) {
    this.render(state);
  }

  onStateChange(action, newState) {
    this.onChange(action, newState);
    this.draw(newState);
  }
}

export default GuiElement;
