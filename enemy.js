export default class Enemy {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.speed = Math.random() * 4 + 1; //左へ移動するスピード
    this.width = 40; //幅
    this.height = 40; //高さ
    this.x = canvas.width; //x軸の初期位置
    this.y = Math.random() * (this.gameHeight - this.height); //y軸の初期位置
    this.radian = 0;
    this.radianSpeed = Math.random() * 0.2; //揺らぎのスピード
    this.curve = Math.random() * 7; //揺らぎの範囲
  }
  update() {
    this.x -= this.speed;
    //Math.sin(this.radian)だけだと-1〜１の間しか動かない。this.curveをかけることでy軸の幅がthis.curve倍になる。
    this.y += Math.sin(this.radian) * this.curve;
    this.radian += this.radianSpeed; //揺らぎのスピード
    if (this.x + this.width < 0) this.x = this.gameWidth;
  }
  draw(context) {
    context.fillStyle = "blue";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
