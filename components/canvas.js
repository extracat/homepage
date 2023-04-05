import React, { useRef, useEffect } from 'react'

export function Canvas(props) {
  
  const canvasRef = useRef(null)

  /*
  const draw = (ctx, frameCount) => {

  };
  */

  /////////////////////////////////////////////
  ////             BEGIN UTILITY           ////
  /////////////////////////////////////////////


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

  function rnd(max = 1) {
    return Math.random() * 2 * max - max;
  }

  /////////////////////////////////////////////
  ////               END UTILITY           ////
  /////////////////////////////////////////////
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let frameCount = 0
    let animationFrameId


    /////////////////////////////////////////////
    ////             BEGIN SETTINGS          ////
    /////////////////////////////////////////////

    var w = getCanvasWidth(canvas);
    var h = getCanvasHeight(canvas);

    var x = 0;
    var y = 0;

    var mainColor = "#e0e0e0";
    var colors = [mainColor];

    var attractor = {
      x: w / 2,
      y: h / 2
    }


    var dots = [];

    /*
    while (dots.length < 10) {
      dots.push(new Dot());
    }
    */

    var lines = [];

    let r=100
    while (lines.length < 20) {
      lines.push(new Line(w,0,r));
      r+=15 + r/50
    }

    /////////////////////////////////////////////
    ////             END SETTINGS            ////
    /////////////////////////////////////////////
      
    // Upadate the canvas object on window resize
    const onResize = () => {
      resizeCanvas(canvas)
    }
    window.addEventListener('resize', onResize)

    function mouseMove(e) {
        //attractor.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        //attractor.y = e.offsetY == undefined ? e.layerY : e.offsetY;
        attractor.x = e.layerX;
        attractor.y = e.layerY;
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", mouseMove);
    
    /////////////////////////////////////////////
    ////             BEGIN OBJECTS           ////
    /////////////////////////////////////////////

    function Dot(random = true, x = 0, y = 0) {
        this.size = Math.random() +0.5;
        this.color = colors[Math.floor((Math.random() * colors.length))];
        
        if (random) {
          this.x = w / 2 + rnd(w / 2 - 10)
          this.y = h / 2 + rnd(h / 2 - 10)
        } else {
          this.x = x
          this.y = y
        }


        this.vx = rnd(0.1)
        this.vy = rnd(0.1)

        this.friction = 1.1

        this.move = function() {
          
            var dx = this.x - attractor.x;
            var dy = this.y - attractor.y;
            var d2 = (dx * dx + dy * dy);
            var d = Math.sqrt(dx * dx + dy * dy);

            this.vx += rnd(0.1) - dx/d2;
            this.vy += rnd(0.1) - dy/d2;
          
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

 
    function Line(x = 0, y = 0, r = 0) {
      this.dots = []
      let _x,_y,_a = 0
      let n = 50
      let d = 1/n
      while (this.dots.length < n) {
        _x = Math.sin(2 * Math.PI * _a * d) * r + x;
        _y = Math.cos(2 * Math.PI * _a * d) * r + y;
        this.dots.push(new Dot(false , _x, _y));
        _a++;
      }

      this.draw = function() {
        let _x,_y,x,y,x_,y_,__x,__y

        for (var i = 0; i < this.dots.length; i++) {
          //collisionDetection(i);
          //borderDetection(i);
          
          this.dots[i].move();
          this.dots[i].draw();

          x = this.dots[i].x;
          y = this.dots[i].y;

          
          if (i == this.dots.length - 1) {
            x_ = this.dots[0].x;
            y_ = this.dots[0].y;
          } else {
            x_ = this.dots[i+1].x;
            y_ = this.dots[i+1].y;
          }

                    
          if (i == 0) {
            _x = this.dots[this.dots.length-1].x;
            _y = this.dots[this.dots.length-1].y;
          } else {
            _x = this.dots[i-1].x;
            _y = this.dots[i-1].y;
          }

          if (i < 2) {
            __x = this.dots[this.dots.length-2+i].x;
            __y = this.dots[this.dots.length-2+i].y;
          } else {
            __x = this.dots[i-2].x;
            __y = this.dots[i-2].y;  
          }

          /*
          ctx.beginPath();
          ctx.moveTo(_x,_y);

          ctx.bezierCurveTo( (_x + x)/2, (_y + y)/2, 
                             (5*x - 2*x_ + _x)/4, (5*y - 2*y_ + _y)/4, 
                              x, y )
          ctx.stroke();
          */
        }
        
      }
      
  }




    function collisionDetection(b){
      for (var i = dots.length - 1; i >= 0; i--) {
        if(i != b) {
          //ctx.moveTo(dots[b].x, dots[b].y); 
          //ctx.lineTo(dots[i].x, dots[i].y);
          
          var dx = (dots[b].x + dots[b].size) - (dots[i].x + dots[i].size);
          var dy = (dots[b].y + dots[b].size) - (dots[i].y + dots[i].size);
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < dots[b].size + dots[i].size) {
              //dots[b].size = dots[b].size > 1 ? dots[b].size-=1 : 1;
              //dots[i].size = dots[i].size > 1 ? dots[i].size-=1 : 1;
              dots[b].vx *= -1.02 
              dots[b].vy *= -1.02 
              dots[i].vx *= -1.02 
              dots[i].vy *= -1.02 
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

    /////////////////////////////////////////////
    ////               END OBJECTS           ////
    /////////////////////////////////////////////


    const render = () => {
      frameCount++
      w = getCanvasWidth(canvas)
      h = getCanvasHeight(canvas)

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      /////////////////////////////////////////////
      ////           BEGIN DRAW FRAME          ////
      /////////////////////////////////////////////

      ctx.fillStyle = mainColor;
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 0.7;

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
        collisionDetection(i);
        borderDetection(i);
        dots[i].move();
        dots[i].draw();
      };

      for (var i = 0; i < lines.length; i++) {
        lines[i].draw();
      };

      /////////////////////////////////////////////
      ////           END DRAW FRAME            ////
      /////////////////////////////////////////////

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
