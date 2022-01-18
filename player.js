//プレイヤー
export default class Player {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.spriteWidth = 261; //2871/11
    this.spriteHeight = 148;
    this.x = canvasWidth / 4; //位置
    this.y = (canvasHeight * 3) / 4; //位置
    this.vy = 0; // velocity 速度
    this.radius = 35; //半径
    this.image = new Image(); //イメージ
    this.image.src = "bird.png"; //イメージ
    this.frame = 0; //フレームナンバー
    this.maxFrame = 9; //最大フレーム数
    this.frameInterval = 50; //次のフレームに行くまでの間隔
    this.frameTimer = 0; //次のフレームに行くまでの累積時間
    this.angle = 0; //Math.sin()にいれる角度　　curveで使用
    this.weight = 1; //flapしない限り常にプレイヤーを引き落とす力
  }

  //アップデート
  update(isPressSpace, deltaTime) {
    //Math.sin(angle)のangleが加算されていく。計算結果は-1~1を繰り返す。
    //multipleを掛けることで上下幅を調整
    const multiple = 20;
    let curve = Math.sin(this.angle) * multiple;
    this.angle += 0.12; //angle加算
    // (1)まず、playerが一定の高さを超えたらplayerがその位置に接地する状態にして、速度も0にする
    //not sit down from the bottom
    //(2)次にcurveを加えることで(1)の位置からcurveの範囲を行ったり来たりする
    //if条件this.y>に当てはまった場合,this.y=になるので,次のupdateではelseに当てはまる。flapならvy=-2(vy)+1(weight)=-1となる。
    if (this.y > this.canvasHeight - this.radius * 2 + curve) {
      this.y = this.canvasHeight - this.radius * 2 + curve;
      this.vy = 0;
    } else {
      //(flap無し)vyはweight分増えていく。
      //(flap有り)vyは-1。vy=-2(vy)+1(weight)=-1
      this.vy += this.weight;
      this.vy *= 0.85; //プラスかマイナスか決定後に調整
      this.y += this.vy;
    }

    // top
    if (this.y < 0 + this.radius) {
      this.y = 0 + this.radius;
      this.vy = 0; //速度を0にする
    }

    //急なストップを避けるためcanvasのy=0から一定の高さ以上の距離がある時しかflapできない。
    if (isPressSpace && this.y > this.radius * 1) this.flap();

    //フレーム
    // 次のフレームに行くまでの累積時間 > 次のフレームに行くまでの間隔
    if (this.frameTimer > this.frameInterval) {
      //最後のフレームを超えてない
      if (this.frame < this.maxFrame) {
        this.frame++; //次のフレームへ
      } else this.frame = 0; //最初のフレームへ
      this.frameTimer = 0; //次のフレームに行くまでの累積時間をリセット
    } else {
      this.frameTimer += deltaTime; //frame間のミリ秒を加える
    }
  }

  //描画
  draw(ctx) {
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 55, //-は位置調整
      this.y - 30, //-は位置調整
      this.spriteWidth / 2.3,
      this.spriteHeight / 2.3
    );
  }
  flap() {
    //if条件this.y>に当てはまった場合,this.y=になるので,次のupdateではelseに当てはまる。flapならvy=-2(vy)+1(weight)=-1となり,上へ。
    this.vy -= 2; //速度
  }
}
