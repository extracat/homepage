import React, { useRef, useEffect } from 'react'

export function Canvas(props) {
  
  const canvasRef = useRef(null)

  /*
  const draw = (ctx, frameCount) => {

  };
  */

  // Upadate the canvas object on resize
  function resizeCanvas(canvas) {
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio=1 } = window
      const context = canvas.getContext('2d')
      canvas.width = width*ratio
      canvas.height = height*ratio
      context.scale(ratio, ratio)

      return true
    }

    return false
  }

  function getCanvasWidth(canvas) {
    const { width, height } = canvas.getBoundingClientRect()
    return width 
  }

  function getCanvasHeight(canvas) {
    const { width, height } = canvas.getBoundingClientRect()
    return height 
  }
  

  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let frameCount = 0
    let animationFrameId

    var w = getCanvasWidth(canvas);
    var h = getCanvasHeight(canvas);

    var x = 0;
    var y = 0;

    var mainColor = "#FF5555";
    var colors = [mainColor];

    function Dot() {
        this.size = Math.random() * 5 + 2;
        this.color = colors[Math.floor((Math.random() * colors.length))];
        this.x = w / 2 + rnd(w / 2 - 10)
        this.y = h / 2 + rnd(h / 2 - 10)
        this.vx = rnd(0.1)
        this.vy = rnd(0.1)

        this.friction = 1.1
      
        this.move = function() {
          
          /*
            var dx = this.x - attractor.x;
            var dy = this.y - attractor.y;
            var d = Math.sqrt(dx * dx + dy * dy);
          */

            this.vx += rnd(0.1);
            this.vy += rnd(0.1);
          
            this.x += this.vx;
            this.y += this.vy;

            this.vx = this.vx / this.friction
            this.vy = this.vy / this.friction

        }

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
    }

    var attractor = {
        x: w / 2,
        y: h / 2
    }

    var dots = [];

    while (dots.length < 10) {
      dots.push(new Dot());
    }
  
  
    // Upadate the canvas object on window resize
    const onResize = () => {
      resizeCanvas(canvas)
    }
    window.addEventListener('resize', onResize)

    canvas.onmousemove = function(e) {
        attractor.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        attractor.y = e.offsetY == undefined ? e.layerY : e.offsetY;
    }

    function rnd(max = 1) {
      return Math.random() * 2 * max - max;
    }

    function collisionDetection(b){
      for (var i = dots.length - 1; i >= 0; i--) {
        if(i != b) {
          ctx.moveTo(dots[b].x, dots[b].y); 
          ctx.lineTo(dots[i].x, dots[i].y);
          
          var dx = (dots[b].x + dots[b].size) - (dots[i].x + dots[i].size);
          var dy = (dots[b].y + dots[b].size) - (dots[i].y + dots[i].size);
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < dots[b].size + dots[i].size) {
              dots[b].size = dots[b].size > 1 ? dots[b].size-=1 : 1;
              dots[i].size = dots[i].size > 1 ? dots[i].size-=1 : 1;
          }
        }
      }
    }
    
    function borderDetection(b){
      for (var i = dots.length - 1; i >= 0; i--) {
        if(i != b){	
          if (dots[b].x < 0 - dots[b].size * 2) {
              dots[b].vx = 1;
          }			
         if (dots[b].y < 0 - dots[b].size * 2) {
              dots[b].vy = 1;
          }
          if (dots[b].x > w + dots[b].size * 2) {
              dots[b].vx = -1;
          }			
         if (dots[b].y > h + dots[b].size * 2) {
              dots[b].vy = -1;
          }
        }
      }
    }

    const render = () => {
      frameCount++
      w = getCanvasWidth(canvas)
      h = getCanvasHeight(canvas)

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      //// BEGIN ////

      ctx.fillStyle = mainColor;
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.5;

/*
      ctx.beginPath();
      ctx.arc(w/2, h/2, 10*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
      ctx.fill();


      for (x = 200; x < w-100; x+=100) {
        ctx.beginPath();
        for (y = 100; y < h-100; y+=100) {
          ctx.bezierCurveTo(x-50, y-50, x+50, y-50, x, y)
        }
        ctx.stroke();
      }
*/
      
      for (var i = 0; i < dots.length; i++) {
        //collisionDetection(i);
        borderDetection(i);
        dots[i].move();
        dots[i].draw();
      
      };



      //// END ////
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    resizeCanvas(canvas)
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])    ////   ===>   }, [draw])
  
  return <canvas ref={canvasRef} {...props}/>
}
