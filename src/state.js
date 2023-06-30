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
  currentSymbol: "",
  scale: 0,
  mouseX: 0,
  mouseY: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  mouseDown: false,
  mouseBtn: "",
  tool: "hand",
  canvas: null,
  ctx: null,
  keys: [],
  prototyping: null,
};

let _state_subs = [];

export const initState = () => {
  const c = document.getElementById("c");
  const offsetX = c.offsetLeft;
  const offsetY = c.offsetTop;
  c.width = window.innerWidth - offsetX;
  c.height = window.innerHeight - offsetY;

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
    mouseBtn: "",
    currentSymbol: "TRUE",
    scale: 1.0,
    mouseX: 0,
    mouseY: 0,
    tool: "hand",
    canvas: c,
    ctx: c.getContext("2d"),
    keys: [],
    prototyping: null,
  };

  return _state;
};

export const updateState = (action, payload) => {
  switch (action) {
    case "MOUSE_MOVE": {
      const newState = {
        prevMouseX: _state.mouseX,
        prevMouseY: _state.mouseY,
        mouseX: payload.mouseX,
        mouseY: payload.mouseY,
      };
      _state = { ..._state, ...newState };
      break;
    }
    case "MOUSE_DOWN": {
      _state = { ..._state, ...payload };
      break;
    }
    case "SET_SIZE": {
      const newSize = { ..._state.size, ...payload };
      _state = { ..._state, size: newSize };
      break;
    }
    case "KEY_DOWN": {
      if (!_state.keys.includes(payload.key)) {
        const newState = {
          keys: [..._state.keys, payload.key],
          currentSymbol: payload.key === "f" ? "FALSE" : "TRUE",
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
    default:
      break;
  }

  _state.ctx.clearRect(0, 0, _state.size.width, _state.size.height);
  pushUpdate(action, _state);
};

export const getState = (key) => state[key];

const pushUpdate = (action, payload) => {
  _state_subs.forEach((s) => {
    s.onStateChange(action, payload);
  });
};

export const subscribe = (sub) => {
  _state_subs = [..._state_subs, sub];
  return _state;
};

export const useState = () => {
  return [STATE, updateState];
};
