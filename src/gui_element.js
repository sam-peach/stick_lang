import { subscribe, registerSym } from "./state.js";

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

  arePointsEqual(a, b) {
    if (a.length !== b.length) return false;

    for (let idx = 0; idx < a.length; idx++) {
      if (a[idx] !== b[idx]) return false;
    }

    return true;
  }

  connect(sym) {
    const myCoords = this.getCoordinates();
    const symCoords = sym.getCoordinates();

    const [longest, longCoords, shortest, shortCoords] =
      myCoords.length > symCoords.length
        ? [this, myCoords, sym, symCoords]
        : [sym, symCoords, this, myCoords];

    for (let i = 0; i < longCoords.length; i++) {
      for (let j = 0; j < shortCoords.length; j++) {
        if (this.arePointsEqual(longCoords[i], shortCoords[j])) {
          longest.setConnection(longCoords[i], shortest);
          shortest.setConnection(shortCoords[j], longest);
        }
      }
    }
  }

  getCoordSetters() {
    return this.coordSetters;
  }

  setConnection(coord, sym) {
    const coordSetters = this.getCoordSetters();
    const setter = coordSetters[coord];

    setter.bind(this)(sym);
  }
}

export default GuiElement;
