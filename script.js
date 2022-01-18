window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600; //cssと同じ
  canvas.height = 400; //cssと同じ

  class Game {
    constructor(ctx, canvasWidth, canvasHeight) {
      this.ctx = ctx;
      this.width = canvasWidth;
      this.height = canvasHeight;
      this.isPressSpace = false; //spaceを押したか

      this.score = 0;
      this.speed = 2;
    }
    update() {
      player.update();
    }
    draw() {
      player.draw();
    }
  }
  class Player {
    constructor(game) {
      this.game = game;
      this.x = 150;
      this.y = 200;
      this.vy = 0; // velocity 速度
      this.width = 20;
      this.height = 20;
      this.radian = 0; //Math.sin()にいれる角度
      this.weight = 1; //flapしない限り常にプレイヤーを引き落とす力
    }
    update() {
      //cycles endlessly between -1 and 1 over and over
      //Math.sin(radian)によって-1~1を繰り返している
      //radianを変更することで繰り返しのスピード調整
      //* 20をすることで揺らぎ幅を調整
      let curve = Math.sin(this.radian) * 20;
      // playerのbottomがcanvasからplayerの高さの3倍を超えたらplayerがその位置に接地する状態にして、速度も0にする
      //not sit down from the bottom
      //curveがあることでcanvas.height - this.height * 3の位置からcurveの範囲(-20と20の間)を行ったり来たりする
      if (this.y > canvas.height - this.height * 3 + curve) {
        this.y = canvas.height - this.height * 3 + curve;
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
      if (game.isPressSpace && this.y > this.height * 3) this.flap();
      this.radian += 0.12;
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    flap() {
      //if条件this.y>に当てはまった場合,this.y=になるので,次のupdateではelseに当てはまる。flapならvy=-2(vy)+1(weight)=-1となり,上へ。
      this.vy -= 2; //playerは上へ
    }
  }
  const player = new Player();
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
      game.isPressSpace = true;
    }
  });
  window.addEventListener("keyup", function (e) {
    if (e.code === "Space") game.isPressSpace = false;
  });
});
