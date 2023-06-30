import TrueSym from "./true_sym.js";
import FalseSym from "./false_sym.js";
import VarSym from "./var_sym.js";
import PipeSym from "./pipe_sym.js";
import { updateState } from "./state.js";

export const handleTrue = (pointer, { size }) => {
  new TrueSym(pointer.x, pointer.y, size.track.left, size.track.top);
};

export const handleFalse = (pointer, { size }) => {
  new FalseSym(pointer.x, pointer.y, size.track.left, size.track.top);
};

export const handleVar = (pointer, { size }) => {
  new VarSym(pointer.x, pointer.y, size.track.left, size.track.top);
};

export const handlePipe = (pointer, { pipeStartRef, size }) => {
  if (pipeStartRef) {
    pipeStartRef.pushEnd([
      pointer.x,
      pointer.y,
      size.track.left,
      size.track.top,
    ]);
  } else {
    const pipe = new PipeSym(
      pointer.x,
      pointer.y,
      size.track.left,
      size.track.top
    );

    updateState("SET", { pipeStartRef: pipe });
  }
};
