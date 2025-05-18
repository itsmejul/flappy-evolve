const pipeWidth = 50;
const pipeGap = 120; 
const spawnMargin = 20; // Margin on top/bottom to make sure pipe gap is not at the very edge of the canvas

export class Pipe {
  constructor(gapY, canvas) {
    this.x = canvas.width;
    this.gapY = gapY;
    this.width = pipeWidth;
    this.gap = pipeGap;
  }

  draw(ctx, canvas) {
    ctx.fillStyle = "green";
    // Top part of pipe
    ctx.fillRect(this.x, 0, this.width, this.gapY);
    // Bottom part of pipe
    ctx.fillRect(
      this.x,
      this.gapY + this.gap,
      this.width,
      canvas.height - (this.gapY + this.gap)
    );
  }

  // create a new pipe with random gap
  static spawn(canvas) {
    const minY = spawnMargin;
    const maxY = canvas.height - pipeGap - spawnMargin;
    const gapY = Math.random() * (maxY - minY) + minY;
    return new Pipe(gapY, canvas);
  }
}
