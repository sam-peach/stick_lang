import { CELL_SIZE } from "./constants.js";

let _state = {
  size: {
    height: 0, // canvas Height
    width: 0, // Canvas Width
    _height: 0, // Real Height
    _width: 0, // Real Width
    top: 0,
    left: 0,
    track: {
      // track how much have we moved in any direction
      top: 0,
      left: 0,
    },
  },
  pageOffsetX: 0,
  pageOffsetY: 0,
  currentSymbol: "",
  pipeStartRef: null,
  scale: 0,
  mouseX: 0,
  mouseY: 0,
  mouseXClamp: 0,
  mouseYClamp: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  mouseDown: false,
  mouseBtn: "",
  tool: "hand",
  canvas: null,
  ctx: null,
  keys: [],
  prototyping: null,
  debounceClick: false,
  leafRefs: {},
  symbolList: {},
  pointTable: {},
};

let _state_subs = [];

export const initState = () => {
  const c = document.getElementById("c");
  const offsetX = c.offsetLeft;
  const offsetY = c.offsetTop;

  c.width = window.innerWidth - offsetX;
  c.height = window.innerHeight - offsetY;

  c.addEventListener("mousemove", (e) => {
    updateState("MOUSE_MOVE", { mouseX: e.clientX, mouseY: e.clientY });
  });

  c.addEventListener("mousedown", (e) => {
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

    if (!_state.debounceClick) {
      updateState("MOUSE_DOWN", {
        mouseDown: true,
        mouseBtn: mouseBtn,
        debounceClick: true,
      });

      setTimeout(() => {
        updateState(
          "SET",
          {
            debounceClick: false,
          },
          500
        );
      });
    }
  });

  c.addEventListener("mouseup", (_e) => {
    updateState("MOUSE_UP", { mouseDown: false });
  });

  document.addEventListener("keydown", (e) => {
    updateState("KEY_DOWN", { key: e.key.toLowerCase() });
  });

  document.addEventListener("keyup", (e) => {
    updateState("KEY_UP", { key: e.key.toLowerCase() });
  });

  _state = {
    size: {
      height: window.innerHeight, // canvas Height
      width: window.innerWidth, // Canvas Width
      _height: 0, // Real Height
      _width: 0, // Real Width
      top: 0,
      left: 0,
      track: {
        // track how much have we moved in any direction
        top: 0,
        left: 0,
      },
    },
    pageOffsetX: offsetX,
    pageOffsetY: offsetY,
    mouseBtn: "",
    currentSymbol: "TRUE",
    pipeStartRef: null,
    scale: 1.0,
    mouseX: 0,
    mouseY: 0,
    tool: "hand",
    canvas: c,
    ctx: c.getContext("2d"),
    keys: [],
    prototyping: null,
    debounceClick: false,
    symbolList: [],
    pointTable: {},
  };

  return _state;
};

export const updateState = (action, payload) => {
  switch (action) {
    case "MOUSE_MOVE": {
      const [clampX, clampY] = calcMouseClamp(
        payload.mouseX,
        payload.mouseY,
        _state.size.track.left,
        _state.size.track.top,
        _state.pageOffsetX,
        _state.pageOffsetY
      );
      const newState = {
        prevMouseX: _state.mouseX,
        prevMouseY: _state.mouseY,
        mouseX: payload.mouseX,
        mouseY: payload.mouseY,
        mouseXClamp: clampX,
        mouseYClamp: clampY,
      };

      _state = { ..._state, ...newState };
      break;
    }
    case "MOUSE_DOWN":
    case "MOUSE_UP": {
      _state = { ..._state, ...payload };
      break;
    }
    case "SET_SIZE": {
      const newSize = { ..._state.size, ...payload };
      _state = { ..._state, size: newSize };
      break;
    }
    case "SET_SYM": {
      _state = { ..._state, ...payload, pipeStartRef: null };
      break;
    }
    case "KEY_DOWN": {
      if (!_state.keys.includes(payload.key)) {
        const newState = {
          keys: [..._state.keys, payload.key],
          pipeStartRef: payload.key === "b" ? null : _state.pipeStartRef,
        };
        _state = { ..._state, ...newState };
      }
      break;
    }
    case "KEY_UP": {
      const newState = {
        keys: _state.keys.filter((k) => k !== payload.key),
      };
      _state = { ..._state, ...newState };
      break;
    }

    case "SET": {
      _state = { ..._state, ...payload };
      break;
    }
    default:
      break;
  }

  _state.debounceClick;
  _state.ctx.clearRect(0, 0, _state.size.width, _state.size.height);
  pushUpdate(action, _state);
};

const pushUpdate = (action, payload) => {
  _state_subs.forEach((s) => {
    s.onStateChange(action, payload);
  });
};

export const subscribe = (sub) => {
  _state_subs = [..._state_subs, sub];
  return _state;
};

export const registerSym = (sym) => {
  const coords = sym.getCoordinates();
  const pTable = {};

  for (let idx = 0; idx < coords.length; idx++) {
    pTable[coords[idx]] = sym;
  }

  const foundSyms = lookupCurrentSymbols(sym, _state.pointTable);
  if (foundSyms) {
    foundSyms.map((s) => sym.connect(s));
  }

  _state.pointTable = { ..._state.pointTable, ...pTable };

  if (sym.type !== "PIPE") {
    _state.symbolList = [..._state.symbolList, sym];
  }
};

export const registerPoint = (pipe, point) => {
  const fauxSym = {
    getCoordinates: () => [point],
  };

  const foundSyms = lookupCurrentSymbols(fauxSym, _state.pointTable);
  if (foundSyms) {
    foundSyms.map((s) => pipe.connect(s));
  }
};

const lookupCurrentSymbols = (sym, pointTable) => {
  const coords = sym.getCoordinates();

  let foundSyms = [];

  for (let idx = 0; idx < coords.length; idx++) {
    const maybeSym = pointTable[coords[idx]];

    if (maybeSym) {
      foundSyms.push(maybeSym);
    }
  }

  return foundSyms;
};

export const getState = () => _state;

const calcMouseClamp = (
  mouseX,
  mouseY,
  trackLeft,
  trackTop,
  pageOffsetX,
  pageOffsetY
) => {
  const xOffset = Math.round(trackLeft % CELL_SIZE);
  const yOffset = Math.round(trackTop % CELL_SIZE);
  const clampX = Math.floor(mouseX / CELL_SIZE);
  const clampY = Math.floor(mouseY / CELL_SIZE);

  const x = clampX * CELL_SIZE - xOffset - pageOffsetX;
  const y = clampY * CELL_SIZE - yOffset - pageOffsetY;

  return [x, y];
};
