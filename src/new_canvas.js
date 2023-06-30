function Canvas() {
  this.size = {
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
  };
  this.mouse = {
    down: false,
    before: {
      x: 0,
      y: 0,
    },
    now: {
      x: 0,
      y: 0,
    },
  };
  this.tool = "hand";
  this.canvas = null;
  this.ctx = null;
  this.keys = [];
  this.prototyping = null;
}

Canvas.prototype.init = function () {
  this.canvas = document.getElementById("c");
  this.ctx = this.canvas.getContext("2d");

  this.size.height = window.innerHeight;
  this.size.width = window.innerWidth;

  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;

  this.ctx.fillStyle = "blue";

  this.drawGrid();

  const prototyping = document.getElementById("prototyping-space");
  prototyping.setAttribute("width", this.size.width);
  prototyping.setAttribute("height", this.size.height);
  this.prototyping = prototyping.getContext("2d");

  window.addEventListener("mousemove", (e) => {
    if (this.mouse.down && this.tool === "hand") {
      this.mouse.now.x = e.clientX;
      this.mouse.now.y = e.clientY;

      this.handelMouseScroll();
    } else if (this.mouse.down && this.tool === "cursor") {
      this.mouse.now.x = e.clientX;
      this.mouse.now.y = e.clientY;

      this.handelCursor();
    }
  });

  window.addEventListener("wheel", (e) => {
    this.handelWheelScroll(e);
  });

  window.addEventListener("mousedown", (e) => {
    this.mouse.down = true;
    this.mouse.before.x = e.clientX;
    this.mouse.before.y = e.clientY;
    this.mouse.now.x = e.clientX;
    this.mouse.now.y = e.clientY;
  });

  window.addEventListener("mouseup", (e) => {
    this.mouse.down = false;

    if (this.tool === "cursor") {
      this.handelCursor();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (!this.keys.includes(e.key.toLowerCase()))
      this.keys.push(e.key.toLowerCase());
  });

  window.addEventListener("keyup", (e) => {
    if (this.keys.includes(e.key.toLowerCase()))
      this.keys = this.keys.filter((k) => k !== e.key.toLowerCase());
  });

  // Tools Changing Events
  document.querySelectorAll(".tools [data-tool]").forEach((e) => {
    e.addEventListener("click", (e) => {
      this.tool = e.target.getAttribute("data-tool");
      document
        .querySelector(".tools [data-tool].active")
        .classList.remove("active");
      e.target.classList.add("active");
    });
  });
};

Canvas.prototype.drawGrid = function () {
  const space = 150;
  // top is the position where the first line should be drawn (it's this part that gives the scrolling illusion)
  // left is the position where the first line should be drawn
  const top = -this.size.track.top % space;
  const left = -this.size.track.left % space; // - space is used only to reverse the direction of the lines

  // clear the canvas
  this.ctx.clearRect(0, 0, this.size.width, this.size.height);

  // draw the 1px grid lines on the x axis
  for (let i = top; i < this.size.height; i += space) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, i);
    this.ctx.lineTo(this.size.width, i);
    this.ctx.strokeStyle = "#ccc";
    this.ctx.stroke();
  }

  // draw the 1px grid lines on the y axis
  for (let i = left; i < this.size.width; i += space) {
    this.ctx.beginPath();
    this.ctx.moveTo(i, 0);
    this.ctx.lineTo(i, this.size.height);
    this.ctx.strokeStyle = "#ccc";
    this.ctx.stroke();
  }

  // draw Both X and Y Scrollbars to show the scrolling animation and percentage
  // const yHeight = (this.size.height / this.size._height) * this.size.height;
  // const xWidth = (this.size.width / this.size._width) * this.size.width;
  // const yTop = (this.size.top / this.size._height) * this.size.height;
  // const xLeft = (this.size.left / this.size._width) * this.size.width;
  // const sSize = 10; // scrollbar size
  // this.ctx.fillStyle = "rgba(79,79,79,0.42)";
  // this.ctx.beginPath();
  // this.ctx.moveTo(this.size.width - sSize, yTop);
  // this.ctx.arcTo(
  //   this.size.width,
  //   yTop,
  //   this.size.width,
  //   yTop + sSize,
  //   sSize / 2
  // );
  // this.ctx.arcTo(
  //   this.size.width,
  //   yTop + yHeight,
  //   this.size.width - sSize,
  //   yTop + yHeight,
  //   sSize / 2
  // );
  // this.ctx.arcTo(
  //   this.size.width - sSize,
  //   yTop + yHeight,
  //   this.size.width - sSize,
  //   yTop + yHeight - sSize,
  //   sSize / 2
  // );
  // this.ctx.arcTo(
  //   this.size.width - sSize,
  //   yTop,
  //   this.size.width,
  //   yTop,
  //   sSize / 2
  // );
  // this.ctx.fill();
  // this.ctx.beginPath();
  // this.ctx.moveTo(xLeft, this.size.height - sSize);
  // this.ctx.arcTo(
  //   xLeft,
  //   this.size.height,
  //   xLeft + sSize,
  //   this.size.height,
  //   sSize / 2
  // );
  // this.ctx.arcTo(
  //   xLeft + xWidth,
  //   this.size.height,
  //   xLeft + xWidth,
  //   this.size.height - sSize,
  //   sSize / 2
  // );
  // this.ctx.arcTo(
  //   xLeft + xWidth,
  //   this.size.height - sSize,
  //   xLeft + xWidth - sSize,
  //   this.size.height - sSize,
  //   sSize / 2
  // );
  // this.ctx.arcTo(
  //   xLeft,
  //   this.size.height - sSize,
  //   xLeft,
  //   this.size.height,
  //   sSize / 2
  // );
  // this.ctx.fill();
};

Canvas.prototype.handelMouseScroll = function () {
  // if the mouse is down and the tool is hand
  if (this.mouse.down && this.tool === "hand") {
    const xDistance = this.mouse.now.x - this.mouse.before.x;
    const yDistance = this.mouse.now.y - this.mouse.before.y;

    // handel Y Scrolling
    if (yDistance >= 0) {
      // Up
      if (this.size.top === 0) {
        // When reaching top
        this.size._height += yDistance;
      } else {
        // When There is space to scroll
        this.size.top =
          this.size.top - yDistance >= 0 ? this.size.top - yDistance : 0;
      }
      this.size.track.top -= yDistance;
    } else {
      // DOWN
      if (this.size.top + this.size.height === this.size._height) {
        // when reaching bottom
        this.size._height -= yDistance;
        this.size.top -= yDistance;
      } else {
        // When there is space to scroll
        this.size.top =
          this.size.top - yDistance <= this.size._height - this.size.height
            ? this.size.top - yDistance
            : this.size._height - this.size.height;
      }
      this.size.track.top -= yDistance;
    }

    // handel X Scrolling
    if (xDistance >= 0) {
      // Right
      if (this.size.left === 0) {
        // When reaching right
        this.size._width += xDistance;
      } else {
        // When There is space to scroll
        this.size.left =
          this.size.left - xDistance >= 0 ? this.size.left - xDistance : 0;
      }
      this.size.track.left -= xDistance;
    } else {
      // Left
      if (this.size.left + this.size.width === this.size._width) {
        // when reaching left
        this.size._width -= xDistance;
        this.size.left -= xDistance;
      } else {
        // When there is space to scroll
        this.size.left =
          this.size.left - xDistance <= this.size._width - this.size.width
            ? this.size.left - xDistance
            : this.size._width - this.size.width;
      }
      this.size.track.left -= xDistance;
    }

    // update the mouse before position
    this.mouse.before.x = this.mouse.now.x;
    this.mouse.before.y = this.mouse.now.y;

    // draw the grid
    this.drawGrid();
  }
};

Canvas.prototype.handelCursor = function () {
  // compare the mouse.before and mouse.now and draw the selection box
  if (this.mouse.down && this.tool === "cursor") {
    const xDistance = this.mouse.now.x - this.mouse.before.x;
    const yDistance = this.mouse.now.y - this.mouse.before.y;
    this.prototyping.clearRect(0, 0, this.size.width, this.size.height);
    this.prototyping.fillStyle = "rgba(0,123,255,0.25)";
    this.prototyping.fillRect(
      this.mouse.before.x,
      this.mouse.before.y,
      xDistance,
      yDistance
    );
    this.prototyping.strokeStyle = "rgba(0,123,255,0.5)";
    this.prototyping.strokeRect(
      this.mouse.before.x,
      this.mouse.before.y,
      xDistance,
      yDistance
    );
    this.drawGrid();
  } else {
    // In case The Mouseup event fires we will call handelCursor but the mouse.down will be false so it will just clear the prototyping canvas
    // it's better if you create a loop to keep the prototyping in sync but in my simple case it's not needed
    this.prototyping.clearRect(0, 0, this.size.width, this.size.height);
  }
};

Canvas.prototype.handelWheelScroll = function (e) {
  if (!this.keys.includes("shift")) {
    // Y Scrolling
    if (e.deltaY > 0) {
      this.size.track.top += 10;
      if (this.size.top + this.size.height === this.size._height) {
        this.size._height += 10;
        this.size.top += 10;
      } else {
        this.size.top =
          this.size.top + 10 <= this.size._height - this.size.height
            ? this.size.top + 10
            : this.size._height - this.size.height;
      }
    } else if (e.deltaY < 0) {
      this.size.track.top -= 10;
      if (this.size.top > 0) {
        this.size.top = this.size.top - 10 >= 0 ? this.size.top - 10 : 0;
      } else {
        this.size._height += 10;
      }
    }
  } else {
    // X Scrolling
    if (e.deltaY > 0) {
      this.size.track.left += 10;
      if (this.size.left + this.size.width === this.size._width) {
        this.size._width += 10;
        this.size.left += 10;
      } else {
        this.size.left =
          this.size.left + 10 <= this.size._width - this.size.width
            ? this.size.left + 10
            : this.size._width - this.size.width;
      }
    } else if (e.deltaY < 0) {
      this.size.track.left -= 10;
      if (this.size.left > 0) {
        this.size.left = this.size.left - 10 >= 0 ? this.size.left - 10 : 0;
      } else {
        this.size._width += 10;
      }
    }
  }

  // draw the grid
  this.drawGrid();
};

export { Canvas };
