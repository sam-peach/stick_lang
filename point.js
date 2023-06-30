const RADIUS = 10;

export function Point(x, y) {
  this.x = x;
  this.y = y;
  this.r = RADIUS;
  this.next = null;
}
