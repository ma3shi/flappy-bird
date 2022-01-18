//handling only each individual enemy
//敵
export default class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width; //canvas width
    this.y = Math.random() * this.game.height;
    this.radius = 20; //半径
    this.isDeletable = false; //削除可能か
    this.vx = Math.random() * 5 + 5; //速度(x軸)
    this.angle = 0; //Math.sin(angle)で使用
    this.curve = Math.random() * 5 + 5;
    this.isCounted = false; //1つの敵で二回得点しないようにする。
  }
  update() {
    this.x -= this.vx; //左へ
    this.y += Math.sin(this.angle) * this.curve; //上下
    this.angle += 0.12; //角度を加算

    //左端に行ったらisDeletableをtrueにする
    if (this.x < 0 - this.radius) this.isDeletable = true;

    //衝突
    const dx = this.x - this.game.player.x; //敵とplayerのx軸の差
    const dy = this.y - this.game.player.y; //敵とplayerのy軸の差
    this.distance = Math.sqrt(dx * dx + dy * dy); //敵とplayerの距離を計算(this.distanceは斜辺)
    if (this.distance < this.radius + this.game.player.radius) {
      this.game.isGameOver = true;
    }

    //得点
    if (!this.isCounted && this.x < this.game.player.x) {
      this.game.score++;
      // console.log(`${this.game.score}`);

      this.isCounted = true; //1つの敵で二回得点しないようにする。
    }
  }
  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
