window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600; //cssと同じ
  canvas.height = 400; //cssと同じ

  class Game {
    constructor(ctx, width, height) {
      this.player = new Player();
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.isPressSpace = false; //spaceを押したか
    }
    update() {
      this.player.update();
    }
    draw() {
      this.player.draw();
    }
  }
  class Player {
    constructor() {
      this.x = 150;
      this.y = 200;
      this.vy = 0; // velocity 速度
      this.width = 20;
      this.height = 20;
      this.weight = 1; //flapしない限り常にプレイヤーを引き落とす力
    }
    update() {
      // playerのbottomがcanvasを超えたらplayerがcanvasに接地する状態にして、速度も0にする
      if (this.y > canvas.height - this.height) {
        this.y = canvas.height - this.height; //(3)
        this.vy = 0;
      }
      //if文の条件に当てはまった場合も(1)(2)でyはweightだけ増加するが、次のupdateで再び条件に当てはまりyは(3)に戻るのでyが増加し続けることは無い。
      this.vy += this.weight; //(1)vy increase weight
      this.y += this.vy; //(2)yはvy分増えていくので落下速度は速くなる
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    flap() {
      this.vy = -2; //playerは上へ
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 0; //直前の時間
  //Animation Loop
  //PCの能力でフレームのスピードが変わってしまうのでtimestamp
  //https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
  function animation(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //画面クリア
    const deltaTime = timeStamp - lastTime; //frame間のミリ秒
    lastTime = timeStamp; //次のフレーム用にタイムスタンプを直前に時間として代入
    game.update();
    game.draw();
    requestAnimationFrame(animation);
  }
  //引数に何も入れないと最初がundefinedでNaNになってしまう
  animation(0);

  window.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.code === "Space") {
      isPressSpace = true;
    }
  });
  window.addEventListener("keyup", function (e) {
    if (e.code === "Space") isPressSpace = false;
  });
});
