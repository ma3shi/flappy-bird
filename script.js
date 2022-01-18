import Player from "./player.js";
import Enemy from "./enemy.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600; //cssと同じ
  canvas.height = 400; //cssと同じ
  let isPressSpace = false; //spaceを押したか

  const player = new Player(canvas.width, canvas.height);
  const numberOfEnemies = 5;
  const enemieArray = [];

  for (let i = 0; i < numberOfEnemies; i++) {
    enemieArray.push(new Enemy(canvas.width, canvas.height));
  }

  let lastTime = 0; //直前の時間
  //Animation Loop
  //PCの能力でフレームのスピードが変わってしまうのでtimestamp
  //https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
  function animation(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //画面クリア
    const deltaTime = timeStamp - lastTime; //frame間のミリ秒
    lastTime = timeStamp; //次のフレーム用にタイムスタンプを直前に時間として代入
    enemieArray.forEach((enemy) => {
      enemy.update();
      enemy.draw(ctx);
    });
    player.update(isPressSpace);
    player.draw(ctx);
    requestAnimationFrame(animation);
  }
  animation(0); //引数に何も入れないと最初がundefinedでNaNになってしまう

  window.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.code === "Space") isPressSpace = true;
  });
  window.addEventListener("keyup", function (e) {
    if (e.code === "Space") isPressSpace = false;
  });
});
