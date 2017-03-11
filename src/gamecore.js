var dtToDraw = 60,
    dt,
    lastTime = Date.now();

window.onload = function() {
    this.canvas = document.getElementById("mainCanv");
    this.context = canvas.getContext('2d');    

    start();

    setInterval(function() {
        dtToDraw = dt;
    }, 1000);

    step_();
}

function step_() {
    var nowTime = Date.now();
    dt = (nowTime - lastTime) / 1000.0;

    step(dt);

    lastTime = nowTime;
    requestAnimationFrame(step_);
}