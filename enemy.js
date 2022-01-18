//handling only each individual enemy
//敵
export default class Enemy {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 522.5; //5225/10
    this.spriteHeight = 456;
    this.x = this.game.width; //canvas width
    this.y = Math.random() * this.game.height;
    this.randomSize = Math.random() * 0.6 + 0.4; //0.4から1
    this.radius = 50 * this.randomSize; //半径
    this.image = new Image();
    this.image.src = "enemy.png";
    this.frame = 0; //フレームナンバー
    this.maxFrame = 10; //最大フレーム数
    this.frameInterval = 5; //次のフレームに行くまでの間隔
    this.frameTimer = 0; //次のフレームに行くまでの累積時間
    this.isDeletable = false; //削除可能か
    this.vx = Math.random() * 5 + 5; //速度(x軸)
    this.angle = 0; //Math.sin(angle)で使用
    this.curve = Math.random() * 5 + 5;
    this.isCounted = false; //1つの敵で二回得点しないようにする。
    this.scoreSound = document.createElement("audio"); //サウンド
    this.scoreSound.src = "score.mp3"; //サウンド
  }

  //アップデート
  update(deltaTime) {
    this.x -= this.vx; //左へ
    this.y += Math.sin(this.angle) * this.curve; //上下
    this.angle += 0.12; //角度を加算
    // this.angle += Math.random() * 0.1 + 0.12; //角度を加算

    //左端に行ったらisDeletableをtrueにする
    if (this.x < 0 - this.radius) this.isDeletable = true;

    //衝突
    const dx = this.x - this.game.player.x; //敵とplayerのx軸の差
    const dy = this.y - this.game.player.y; //敵とplayerのy軸の差
    this.distance = Math.sqrt(dx * dx + dy * dy); //敵とplayerの距離を計算(this.distanceは斜辺)

    // 敵とplayerの距離　< 敵とプレイヤーの半径の合計
    if (this.distance < this.radius + this.game.player.radius) {
      this.game.isGameOver = true; //ゲームオーバー
    }

    //得点
    //まだカウントしておらず、敵がプレイヤーの左の位置(敵を通過)
    if (!this.isCounted && this.x < this.game.player.x) {
      this.scoreSound.play(); //音
      this.game.score++; //スコア
      this.isCounted = true; //1つの敵で二回得点しないようにする。
    }

    //フレーム
    //プレイヤーと共通なのでまとめられそう
    if (this.frameTimer > this.frameInterval) {
      if (this.frame < this.maxFrame) {
        this.frame++;
      } else this.frame = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  //描画
  draw(ctx) {
    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.drawImage(
      this.image, //img
      this.frame * this.spriteWidth, //sx
      0, //sy
      this.spriteWidth, //sw
      this.spriteHeight, //sh
      this.x - 60 * this.randomSize, //dx
      this.y - 75 * this.randomSize, //dy
      (this.spriteWidth / 3.5) * this.randomSize, //dw
      (this.spriteHeight / 3.5) * this.randomSize //dh
    );
  }
}
