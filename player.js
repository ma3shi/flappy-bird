//プレイヤー
export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 150;
    this.y = 200;
    this.vy = 0; // velocity 速度
    this.radius = 20; //半径
    this.angle = 0; //Math.sin()にいれる角度
    this.weight = 1; //flapしない限り常にプレイヤーを引き落とす力
  }
  update(isPressSpace) {
    //Math.sin(angle)のangleが加算されていく。計算結果は-1~1を繰り返す。
    //multipleを掛けることで上下幅を調整
    const multiple = 20;
    let curve = Math.sin(this.angle) * multiple;
    // (1)まず、playerが一定の高さを超えたらplayerがその位置に接地する状態にして、速度も0にする
    //not sit down from the bottom
    //(2)次にcurveを加えることで(1)の位置からcurveの範囲を行ったり来たりする
    if (this.y > this.gameHeight - this.radius * 4 + curve) {
      this.y = this.gameHeight - this.radius * 4 + curve;
      this.vy = 0;
    } else {
      //(flap無し)vyはweight分増えていく。
      //(flap有り)vyは-1。vy=-2(vy)+1(weight)=-1
      this.vy += this.weight;
      this.vy *= 0.8; //調整
      this.y += this.vy;
    }

    // top + players height
    if (this.y < 0 + this.radius) {
      this.y = 0 + this.radius;
      this.vy = 0; //速度を0にする
    }

    //急なストップを避けるためtopからplayerの高さ2倍以上の距離がある時しかflapできない。
    if (isPressSpace && this.y > this.radius * 4) this.flap();
    this.angle += 0.12; //angle加算
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  flap() {
    //if条件this.y>に当てはまった場合,this.y=になるので,次のupdateではelseに当てはまる。flapならvy=-2(vy)+1(weight)=-1となり,上へ。
    this.vy -= 2; //playerは上へ
  }
}
