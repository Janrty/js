window.onload = function() {
	let btn = document.querySelectorAll('.left>ul>li')
	let other = document.querySelectorAll('.right>ul>li')
	let canvas = document.querySelector('canvas')
	let stylebtn = document.querySelectorAll('.left>ul>li[act]')
	let colorbtn = document.querySelectorAll('input')
	let mask = document.querySelector('.mask')
	let eraser1 = document.querySelector('.xiangpi')
	let xiangpi = document.querySelector('.left>ul>li[xiangpi]')
	let wenzi = document.querySelector('.left>ul>li[wenzi]')
	let baocun = document.querySelector('.right>ul>li[active]>a')
	let clips=document.querySelector('#clip')
	let clipObj = document.querySelector('.clips')


	let pale = new Palette(canvas,mask)
	pale.history1() 
	btn.forEach( (element)=> {
		element.onclick = function(){
		let tools = document.querySelector('.left>ul>li[active=true]')
		if(tools){
			tools.setAttribute('active',false)
		}
		xiangpi.setAttribute('active',false)
		this.setAttribute('active',true)
		if(this.id == 'pencil'){
		pale.pencil()
		}else if(this.id =='polygon' || this.id == 'wujiaoxing'){
			let jiao = prompt('输入',5)
			pale.draw(this.id,jiao)
		}else if(this.id == 'dash'){
			pale.dash()
		}else{
			pale.draw(this.id)
		}

	}
	stylebtn.forEach((element)=> {
		
		element.onclick = function(){
			xiangpi.setAttribute('active',false)
		let style = document.querySelector('.left>ul>li[active=true]')
			if(style){
				style.setAttribute('active',false)
			}
			this.setAttribute('active',true)
			pale.style = this.id

		}
	});
	colorbtn.forEach((element)=> {
		element.onchange = function(){
			pale.strokeStyle = element.value
			pale.fillStyle = element.value
		}
	});

	});
	xiangpi.onclick = function(){
	
		xiangpi.setAttribute('active',false)
		this.setAttribute('active',true)
		let w = 20,h = 20
		pale.eraser(eraser1,w,h)
	}
	wenzi.onclick = function(){
		pale.words()
	}
	baocun.onclick = function(){
		baocun.href= canvas.toDataURL('image/png')
		baocun.download = 'a.png'
	}
	let inverse  = document.querySelector('.right>ul>li[inverse]')
	inverse.onclick = function(){
		pale.inverse()
	}
	clips.onclick = function(){
		pale.clip(clipObj)
		
	}

	
}