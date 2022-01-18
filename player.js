export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 150;
    this.y = 200;
    this.vy = 0; // velocity 速度
    this.width = 20;
    this.height = 20;
    this.radian = 0; //Math.sin()にいれる角度
    this.weight = 1; //flapしない限り常にプレイヤーを引き落とす力
  }
  update(isPressSpace) {
    //Math.sin(radian)によって-1~1を繰り返している
    //radianを変更することで繰り返しのスピード調整.
    //* 20をすることで揺らぎ幅を調整
    const multiple = 20;
    let curve = Math.sin(this.radian) * multiple;
    // playerのbottomがcanvasからplayerの高さの3倍を超えたらplayerがその位置に接地する状態にして、速度も0にする
    //not sit down from the bottom
    //curveがあることでcanvas.height - this.height * 3の位置からcurveの範囲(-20と20の間)を行ったり来たりする
    if (this.y > this.gameHeight - this.height * 3 + curve) {
      this.y = this.gameHeight - this.height * 3 + curve;
      this.vy = 0;
    } else {
      //(1.flap無し)vyはweight分増えていく。
      //(2.flap有り)vyは-1。vy=-2(vy)+1(weight)=-1
      this.vy += this.weight;
      this.y += this.vy;
    }

    // top + players height
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0; //速度を0にする
    }

    //急なストップを避けるためtopからplayerの高さ3倍以上の距離がある時しかflapできない。
    if (isPressSpace && this.y > this.height * 3) this.flap();
    this.radian += 0.12;
  }
  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  flap() {
    //if条件this.y>に当てはまった場合,this.y=になるので,次のupdateではelseに当てはまる。flapならvy=-2(vy)+1(weight)=-1となり,上へ。
    this.vy -= 2; //playerは上へ
  }
}
