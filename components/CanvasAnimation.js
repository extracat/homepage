import React, { useRef, useEffect } from 'react'
import globalColors from '../styles/variables.module.scss';

export function CanvasAnimation(props) {
  
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

    var w = getCanvasWidth(canvas)
    var h = getCanvasHeight(canvas)
    var mobile = false
    if ( w < 600 ) {
      mobile = true
    }

    var x = 0
    var y = 0

    var mainColor = globalColors.colorCanvasArt01
    var colors = [globalColors.colorCanvasArt01,
                  globalColors.colorCanvasArt02,
                  globalColors.colorCanvasArt03,
                  globalColors.colorCanvasArt04,
                  globalColors.colorCanvasArt05,
                  globalColors.colorCanvasArt06,
                  ]
                  
    var particleSize = 3
    if (mobile) {particleSize = 2.7}

    var lineWidth = 0.7

    var frictionForce = 0.15          
    var brownianForce = 0.01        
    var attractorForce = 10

    var blobSize = 15 // number of particles in blob
    if (mobile) {blobSize = 12}

    var boundingStrength = 0.3
    var particleInteraction = 1
    var blobInteraction = 1.7 
    if (mobile) {blobInteraction = 3}

    var blobVolume = 0.005
    if (mobile) {blobVolume = 0.01}

    var attractor = {
      x: w / 2,
      y: h / 2,
      i: 0
    }

    var blobs = []
    for (var i = 0; i < 6; i++) {
      blobs.push(new Blob(w/1.7,150+h/4,10));
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
        var x = e.layerX
        var y = e.layerY

        attractor.x = x
        attractor.y = y
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", mouseMove);
    
    /////////////////////////////////////////////
    ////             BEGIN OBJECTS           ////
    /////////////////////////////////////////////

    function Dot(random = true, x = 0, y = 0, color = "#888") {
        this.size = particleSize
        this.color = color
        
        if (random) {
          this.x = w / 2 + rnd(w / 2 * 0.7)
          this.y = h / 2 + rnd(h / 2 * 0.7)
        } else {
          this.x = x + rnd(1)
          this.y = y + rnd(1)
        }


        this.vx = rnd(brownianForce) 
        this.vy = rnd(brownianForce) 

        this.move = function() {
          
            var attractor_dx = this.x - attractor.x
            var attractor_dy = this.y - attractor.y
            var attractor_d2 = attractor_dx * attractor_dx + attractor_dy * attractor_dy
            var attractor_d = Math.sqrt(attractor_d2)

            // this is acceleration of dot
            this.vx += rnd(brownianForce) 
            this.vy += rnd(brownianForce) 

            this.vx += (attractor_d < w/10) ? attractor_dx/attractor_d2 * attractorForce : 0
            this.vy += (attractor_d < w/10) ? attractor_dy/attractor_d2 * attractorForce : 0
          
            // friction force reduce speed
            var vv = this.vx * this.vx + this.vy * this.vy
            var v = Math.sqrt(vv)
            this.vx = this.vx / (frictionForce * v + 1)
            this.vy = this.vy / (frictionForce * v + 1)

            // movement
            this.x += this.vx
            this.y += this.vy

            borderDetection(this)
        }

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
    }

 
    function Blob(x = 0, y = 0, r = 0) {
      this.color = colors[Math.floor((Math.random() * colors.length))]
      this.dots = []
      while (this.dots.length < blobSize) {
        this.dots.push(new Dot(false,x + rnd (r),y + rnd (r),this.color));
      }

      this.draw = function() {

        for (var i = 0; i < this.dots.length; i++) {
          boundingForce(this.dots, i);
          particles(this.dots[i])
          
          this.dots[i].move();
          this.dots[i].draw();

          x = this.dots[i].x;
          y = this.dots[i].y;
        }
      } 
    }

    // force that bounds particles to each other
    function boundingForce (dots, p) {
      var dx_blob = 0
      var dy_blob = 0

      for (var i = dots.length - 1; i >= 0; i--) {
        if(i != p) {

          var dx = dots[i].x - dots[p].x 
          var dy = dots[i].y - dots[p].y

          dx_blob += (dx * -1) // distance to mass center
          dy_blob += (dy * -1) // distance to mass center

        }
      }

      dx_blob = 10 * dx_blob / dots.length // distance to mass center
      dy_blob = 10 * dy_blob / dots.length // distance to mass center

      var dd_blob  = dx_blob*dx_blob + dy_blob*dy_blob 
      var d_blob  = Math.sqrt(dd_blob)
 
      if (d_blob > 0) {
        // force between particle and mass center
        dots[p].vx += dx_blob / dd_blob * 500 * boundingStrength - dx_blob * blobVolume * boundingStrength
        dots[p].vy += dy_blob / dd_blob * 500 * boundingStrength - dy_blob * blobVolume * boundingStrength
      }
    }

    function particles(dot) {
      for (var j = blobs.length - 1; j >= 0; j--) {
        var dots = blobs[j].dots
        for (var i = dots.length - 1; i >= 0; i--) {
          if(true) {

            var dx = dots[i].x - dot.x 
            var dy = dots[i].y - dot.y

            var dd = dx*dx + dy*dy
            var d = Math.sqrt(dd)

            if (d > 0) {
              // force between particles 
              dots[i].vx += dx / (dd * particleInteraction ) - dx * 0.00001 * blobInteraction
              dots[i].vy += dy / (dd * particleInteraction ) - dy * 0.00001 * blobInteraction
            }
          }
        }
      }
    }
    
    function borderDetection(dot){
      if (dot.x < 0 - dot.size * 2) {
        dot.vx = 1;
      }			
      if (dot.y < 0 - dot.size * 2) {
        dot.vy = 1;
      }
      if (dot.x > w + dot.size * 2) {
        dot.vx = -1;
      }			
      if (dot.y > h + dot.size * 2) {
        dot.vy = -1;
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

      ctx.fillStyle = mainColor
      ctx.strokeStyle = mainColor
      ctx.lineWidth = lineWidth
      
      for (var i = 0; i < blobs.length; i++) {
        blobs[i].draw();
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
