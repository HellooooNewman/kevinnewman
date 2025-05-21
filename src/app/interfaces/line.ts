// Line class for canvas animation
export class Line {
  public modifer: number;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public stroke: number;
  public color: string;

  constructor() {
    this.modifer = Math.random() * 2;
    this.x = window.innerWidth * Math.random();
    this.y = 500 * Math.random();
    this.vx = this.modifer * this.modifer + 0.3;
    this.vy = this.modifer * this.modifer + 0.3;
    this.stroke = this.modifer * 10 * Math.random();
    this.color = 'rgba(20, 20, 20, ' + this.modifer + ')';
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'lightgrey';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + (40 * this.modifer), this.y - (40 * this.modifer));
    ctx.stroke();
    ctx.lineWidth = this.modifer * 1.5;
  }

  update(delta = 1): void {
    this.x += this.vx * delta;
    this.y -= this.vy * delta;
    if (this.x > window.innerWidth) {
      this.x = -50;
    }
    if (this.y < -50) {
      this.y = 500;
    }
  }
}
