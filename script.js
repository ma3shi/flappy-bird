//スコア判定

import Player from "./player.js";
import Enemy from "./enemy.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600; //cssと同じ
  canvas.height = 400; //cssと同じ

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width; //canvasの高さ
      this.height = height; //canvasの幅
      this.isPressSpace = false; //スペースキーを押したか
      this.player = new Player(width, height); //プレイヤー
      this.enemies = []; //敵の配列
      this.enemyInterval = 500; //敵を作成する間隔
      this.enemyTimer = 0; //次の敵を作成するまでの累積時間
      this.score = 0; //スコア
      this.isGameOver = false; //ゲームオーバーかどうか
    }
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
      this.enemies.forEach((enemy) => enemy.update()); //敵更新
      this.player.update(this.isPressSpace); //プレイヤー更新
    }
    draw() {
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
      this.player.draw(this.ctx);
      this.ctx.font = "50px Georgia";
      this.ctx.fillText(this.score, 50, 70);
    }
    //敵を作成　private class method
    #addNewEnemy() {
      this.enemies.push(new Enemy(this));
    }
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

  const game = new Game(ctx, canvas.width, canvas.height);

  let lastTime = 0; //直前の時間
  //Animation Loop
  //PCの能力でフレームのスピードが変わってしまうのでtimestampを利用
  //https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
  function animation(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //画面クリア
    const deltaTime = timeStamp - lastTime; //frame間のミリ秒
    lastTime = timeStamp; //次のフレーム用にタイムスタンプを直前の時間として代入
    game.update(deltaTime); //deltaTimeはenemy作成に使用
    game.draw();

    if (!game.isGameOver) requestAnimationFrame(animation);
    else game.drawGameOver();
  }
  animation(0); //引数に何も入れないと最初がundefinedでNaNになってしまう

  //スペースキーを押す
  window.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.code === "Space") game.isPressSpace = true;
  });
  //スペースキーを離す
  window.addEventListener("keyup", function (e) {
    if (e.code === "Space") game.isPressSpace = false;
  });
});
