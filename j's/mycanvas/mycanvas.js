function Palette(canvas,mask) {
	this.canvas= canvas
	this.mask = mask
	this.ctx =this.canvas.getContext('2d')
	this.history = []
	this.cx = this.canvas.width
	this.cy = this.canvas.height
	this.style = 'stroke'
	this.clipdata = null
}
Palette.prototype={
	draw:function(type,num){
		let that = this
		this.mask.onmousedown = function(e){
			that.init();
			let sx = e.offsetX,sy = e.offsetY
			that.mask.onmousemove = function(e){
			let ox = e.offsetX,oy = e.offsetY
			that.ctx.clearRect(0,0,that.cx,that.cy);
			if(that.history.length){
				that.ctx.putImageData(that.history[that.history.length-1],0,0)
			}
			that[type](sx,sy,ox,oy,num)
			}
			
		
			that.mask.onmouseup = function(){
			that.history.push(that.ctx.getImageData(0,0,that.cx,that.cy))
			that.mask.onmousemove = null;
			that.mask.onmouseup = null;
		
		}
		}

	
	},
	history1:function(){
		document.onkeyup =(e)=>{
		if(e.ctrlKey&&e.keyCode ==90){
			if(this.history.length ==1){
				this.ctx.clearRect(0,0,this.cx,this.cy)
				this.history=[]
				return false
			}
			this.history.pop()
			let img = this.history[this.history.length-1]
			this.ctx.putImageData(img,0,0)
		
			
		}
	}
},	
	init:function(){
		this.lineWidth = 1
		this.ctx.fillStyle = this.fillStyle
		this.ctx.strokeStyle = this.strokeStyle
		this. lineCap= 'butt' 
		this.ctx.setLineDash([0,0])
	},
	line:function(sx,sy,ox,oy){
			this.ctx.beginPath()
			this.ctx.moveTo(sx,sy)
			this.ctx.lineTo(ox,oy)
			this.ctx.closePath()
			this.ctx.stroke()
	},
	dash:function(){
		let that = this
		this.mask.onmousedown = function(e){
			let sx = e.offsetX,sy = e.offsetY
			that.ctx.beginPath()
			that.ctx.moveTo(sx,sy)
			that.mask.onmousemove = function(e){
			let ox = e.offsetX,oy = e.offsetY
			that.ctx.lineTo(ox,oy)
			that.ctx.setLineDash([10,10])
			that.ctx.stroke()

			}
		
		that.mask.onmouseup = function(){
			that.history.push(that.ctx.getImageData(0,0,that.cx,that.cy))
			that.mask.onmousemove = null;
			that.mask.onmouseup = null;
				
		}
		}
	
	},
	polygon:function(sx,sy,ox,oy,num){
		
		const PI = Math.PI
		let r = Math.sqrt(Math.pow(sx-ox,2)+Math.pow(sy-oy, 2))	
		let angle = 360/num/180*PI 
		this.ctx.beginPath();
		this.ctx.moveTo(sx+r,sy)
		this.ctx.clearRect(0,0,this.cx,this.cy);
		if(this.history.length){
				this.ctx.putImageData(this.history[this.history.length-1],0,0)
			}
		for(let i = 1;i<num;i++){
			this.ctx.lineTo(sx+r*Math.cos(angle*i),sy+r*Math.sin(angle*i))
		}

		this.ctx.closePath();
		this.ctx[this.style]()
	},
	juxing:function(sx,sy,ox,oy){
		this.ctx.beginPath();
		this.ctx.moveTo(sx,sy)
		this.ctx.lineTo(sx,oy)
		this.ctx.lineTo(ox,oy)
		this.ctx.lineTo(ox,sy)
		this.ctx.lineTo(sx,sy)
		this.ctx.closePath();
		this.ctx[this.style]()
	},
	wujiaoxing:function(sx,sy,ox,oy,num){
		const PI = Math.PI
		let r = Math.sqrt(Math.pow(sx-ox,2)+Math.pow(sy-oy, 2))	
		let angle = 360/num/2/180*PI 
		this.ctx.beginPath();
		this.ctx.moveTo(sx+r/2,sy)
		this.ctx.clearRect(0,0,this.cx,this.cy);
		if(this.history.length){
				this.ctx.putImageData(this.history[this.history.length-1],0,0)
			}
		for(let i = 1;i<num*2;i++){
			if(i%2){
			this.ctx.lineTo(sx+r*Math.cos(angle*i),sy+r*Math.sin(angle*i))
			}else {
			this.ctx.lineTo(sx+r/2*Math.cos(angle*i),sy+r/2*Math.sin(angle*i))
			}
		}

		this.ctx.closePath();
		this.ctx[this.style]()	
	},
	circle:function(sx,sy,ox,oy){
		
		const PI = Math.PI
			let r = Math.sqrt(Math.pow(sx-ox,2)+Math.pow(sy-oy, 2))
			this.ctx.beginPath();
			this.ctx.arc(sx,sy,r,0,2*Math.PI)
			this.ctx.closePath();
		this.ctx[this.style]()
	},
	pencil:function(){
		let that = this
		this.mask.onmousedown = function(e){
			let sx = e.offsetX,sy = e.offsetY
			that.ctx.beginPath()
			that.ctx.moveTo(sx,sy)
			that.mask.onmousemove = function(e){
			let ox = e.offsetX,oy = e.offsetY
			that.ctx.lineTo(ox,oy)
			that.ctx.stroke()

			}
		
		document.onmouseup = function(){
			that.history.push(that.ctx.getImageData(0,0,that.cx,that.cy))
			that.mask.onmouseup = null;
			that.mask.onmousemove = null;	
		}
		}
		
	},
	eraser:function(obj,w,h){
		let that = this
		this.mask.onmousedown = function(e){
			obj.style.display = 'block'
			e.preventDefault()
			that.mask.onmousemove = function(e){

				let ox = e.offsetX, oy =e.offsetY
				let tops=oy-h/2
				let lefts =ox-w/2
				if(tops<=0){
					tops=0
				}
				if(tops>=that.cy-h){
					tops = that.cy-h
				}
				if(lefts<=0){
					lefts = 0
				}
				if(lefts>=that.cx-w){
					lefts= that.cx-w
				}
			obj.style.top = `${tops}px`
			obj.style.left = `${lefts}px`

			that.ctx.clearRect(lefts,tops,w,h)
		that.mask.onmouseup = function(){
			obj.style.display = 'none'
			that.history.push(that.ctx.getImageData(0,0,that.cx,that.cy))
		}
			
			}
		}
	},
	words:function(){
		let that =this
		
		that.mask.onmousedown = function(e){
		let ox = e.offsetX,oy = e.offsetY
		let divs = document.createElement('div')
		divs.style.cssText = `
		width:100px;height:20px;border:1px dashed #666;
		position:absolute;
		left:${ox}px;top:${oy}px;
		`
		that.mask.appendChild(divs)
		that.mask.onmousedown = null
		divs.contentEditable=true
		that.ctx.textAlign = 'center'
		that.ctx.textBaseline = 'middle'
		let tops=oy,lefts=ox
			divs.onmousedown = function(e){
			let cx = e.clientX,cy = e.clientY
			let dl = divs.offsetLeft,dt = divs.offsetTop
			that.mask.onmousemove = function(e){
				let ox = e.clientX,oy = e.clientY
				tops = `${oy-cy+dt}`
				lefts = `${ox-cx+dl}`
				divs.style.left = `${ox-cx+dl}px`
				divs.style.top = `${oy-cy+dt}px`
			}
			divs.onmouseup =function(){
				that.mask.onmousemove = null
				divs.onmouseup = null
			}
		}
		divs.onblur = function(){
			let  value = divs.innerText;
			console.log(value)
			that.mask.removeChild(divs)
			that.ctx.fillText(value,lefts,tops)
			
		}
	
	
	 }
	},
	inverse:function(){
		let img = this.ctx.getImageData(0,0,this.cx,this.cy)
		let data = img.data
		for(let i = 0;i<data.length;i+=4){
			data[i] = 255-data[i]
			data[i+1] = 255-data[i+1]
			data[i+2] = 255-data[i+2]
		}
		this.ctx.putImageData(img,0,0)
	},



	 clip:function(clipObj){
		let that = this
	 	this.mask.onmousedown = function(e){
 			let w,h,minX,minY
	 		let ox = e.offsetX,oy = e.offsetY
	 		that.mask.onmousemove = function(e){
				let cx = e.offsetX ,cy = e.offsetY
				w = Math.abs(ox-cx),h = Math.abs(oy-cy)
				minX = cx>ox?ox:cx;
				minY = cy>oy?oy:cy;
				clipObj.style.cssText=`
				width:${w}px;height:${h}px;
				display:block;position:absolute;
				left:${minX}px;top:${minY}px;
				`
			}
			that.mask.onmouseup = function(){
				that.clipdata = that.ctx.getImageData(minX,minY,w,h)
				that.ctx.clearRect(minX,minY,w,h)
				that.history.push(that.ctx.getImageData(0,0,that.cx,that.cy));
				that.ctx.putImageData(that.clipdata,minX,minY);
				that.ctx.getImageData(minX, minY, w, h);
				that.mask.onmousemove= null;
				that.mask.onmouseup = null;
				that.drag(clipObj,w,h,minX,minY)
			}
		}
	},
		drag:function(obj,w,h,minX,minY){
			let that = this
			that.onmousemove = function(e){
				let cx = e.offsetX,cy = e.offsetY
				if(cx>minX && cx<minX+w && cy>minY && cy>minY+h){
					that.mask.style.cursor ='move' 
				}else{
					that.mask.style.cursor = 'default'
				}

			};
			that.mask.onmousedown= function(e){
				let ox = e.offsetX,oy = e.offsetY
				that.mask.onmousemove = function(e){
					let cx = e.offsetX,cy = e.offsetY
					let lefts =cx-ox+minX 
					let tops = cy-oy+minY
					if(lefts<=0){
						lefts = 0
					}
					if(lefts>that.cx-w){
						lefts = that.cx-w
					}
					if(tops<=0){
						tops = 0
					}
					if(tops>that.cy-h){
						tops = that.cy-h
					}
					obj.style.left = `${lefts}px`
					obj.style.top = `${tops}px`
				that.ctx.clearRect(0, 0, that.cx, that.cy)
				if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				that.ctx.putImageData(that.clipdata,lefts,tops)

				}
				that.mask.onmouseup = function(){
					that.mask.onmousemove = null;
					that.mask.onmouseup = null;
					clipdata = null
				}
			}

		}

}