import Player from "./player.js";
import Enemy from "./enemy.js";
import Background from "./background.js";

//ゲーム
export default class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width; //canvasの高さ
    this.height = height; //canvasの幅
    this.isPressSpace = false; //スペースキーを押したか

    this.background = new Background(this.width, this.height); //背景
    this.player = new Player(width, height); //プレイヤー
    this.enemies = []; //敵の配列
    this.enemyInterval = 500; //敵を作成する間隔
    this.enemyTimer = 0; //次の敵を作成するまでの累積時間
    this.score = 0; //スコア
    this.inputScore = document.getElementById("score"); //送信用スコア
    this.isGameOver = false; //ゲームオーバーかどうか
    this.gameOverSound = document.createElement("audio"); //ゲームオーバー音
    this.gameOverSound.src = "../sounds/gameover.mp3"; //ゲームオーバー音
  }

  //アップデート
  update(deltaTime) {
    //isDeletable(削除可能か)がfalseのものだけにする。
    this.enemies = this.enemies.filter((enemy) => !enemy.isDeletable);
    // 次の敵を作成するまでの累積時間>敵を作成する間隔
    if (this.enemyTimer > this.enemyInterval) {
      this.#addNewEnemy(); //敵作成
      this.enemyTimer = 0; //次の敵を作成するまでの累積時間をリセット
      // console.log(this.enemies);
    } else {
      this.enemyTimer += deltaTime; //frame間のミリ秒を次の敵を作成するまでの累積時間に加える
    }
    this.background.update(); //背景更新
    this.enemies.forEach((enemy) => enemy.update()); //敵更新
    this.player.update(this.isPressSpace, deltaTime); //プレイヤー更新
  }

  //描画
  draw() {
    this.background.draw(this.ctx); //背景描画
    this.enemies.forEach((enemy) => enemy.draw(this.ctx)); //敵描画
    this.player.draw(this.ctx); //プレイヤー描画
    this.ctx.font = "50px Georgia";
    this.ctx.fillText(this.score, 50, 70);
  }
  //敵を作成　private class method
  #addNewEnemy() {
    this.enemies.push(new Enemy(this));
  }

  //ゲームオーバー描画
  drawGameOver() {
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "blace";
    this.ctx.fillText(`GAME OVER`, this.width / 2, this.height / 2);
    this.ctx.fillText(
      `your score is ${this.score}`,
      this.width / 2,
      this.height / 2 + 50
    );
  }
}
