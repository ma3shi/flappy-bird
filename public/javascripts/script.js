import Game from "./game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;

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
    if (!game.isGameOver) {
      requestAnimationFrame(animation);
    } else {
      game.drawGameOver();
      game.gameOverSound.play();
    }
  }
  animation(0); //引数に何も入れないと最初がundefinedでNaNになってしまう

  //スペースキーを押す
  window.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.code === "Space") game.isPressSpace = true;
  });
  //スペースキーを押さない
  window.addEventListener("keyup", function (e) {
    if (e.code === "Space") game.isPressSpace = false;
  });
});
