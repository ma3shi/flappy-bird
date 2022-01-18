//背景
export default class Background {
  constructor(canvasWidth, canvasHeight) {
    this.image = new Image();
    this.image.src = "../images/background.png";
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.speed = 2; //速度
  }
  update() {
    if (this.x <= -this.width) this.x = 0; //背景の幅分,移動したら元の位置に戻る
    this.x = this.x - this.speed; //左に移動
  }
  //同じ背景を二枚繋げて表示
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
