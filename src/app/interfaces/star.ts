// Star class for canvas animation
export class Star {
  public modifer: number;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public radius: number;
  public color: string;

  constructor(modifer?: number, posX?: number, posY?: number) {
    // Ensure each star gets a unique random modifier
    this.modifer = modifer !== undefined ? modifer : Math.random() * 2;
    this.x = posX !== undefined ? posX : window.innerWidth * Math.random();
    this.y = posY !== undefined ? posY : 500 * Math.random();
    this.vx = this.modifer * (modifer !== undefined ? modifer : this.modifer);
    this.vy = this.modifer * (modifer !== undefined ? modifer : this.modifer);
    // Use modifier for radius, but keep it in a reasonable (larger) range
    this.radius = modifer ? this.modifer * modifer : this.modifer * 10 * Math.random();
    // Use modifier for blue shade (higher modifier = lighter blue)
    this.color = `rgba(47, 81, 163, ${this.modifer})`;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Draw the main star in its unique color
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
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
