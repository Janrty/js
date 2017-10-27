/*
属性
那些字母 个数  速度 位置 生命 分数 
方法 产生字符  下落 消除 重新开始 下一关  
*/
   
   // var scroll = document.getElementById("scroll");
function game() {
    this.charArr=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
    //页面的字母
    this.current=[];
    //那些字母 个数 
    this.number=5;
    this.speed=10;
    this.position=[];
    this.score=0;  //成绩
    this.gk=10;
    this.scroll = document.getElementById("scroll");
    // this.start1 = document.getElementById("start");
}


game.prototype={




    start:function(){
       this.getchars()
       this.drop()
       this.key()
    },

   getchars:function(){
    for (let i = 0; i < this.number; i++) {
        this.getchar();    
   }
   },
    getchar:function(){
        let num=Math.floor(Math.random()*this.charArr.length);
        let divs=document.createElement("div");
        let tops=Math.random()*100+50;
        let lefts= (innerWidth-400)*Math.random()+200;
         while(this.checkposition(lefts)){
         lefts= (innerWidth-400)*Math.random()+200;
        }
        divs.classList.add('box');
        divs.innerText=this.charArr[num];
        document.body.appendChild(divs);
       
        divs.style.top=`${tops}px`
        divs.style.left=`${lefts}px`;
        this.current.push(divs);  
        this.position.push(lefts);  
    },
    checkposition:function(lefts){
        let flag=this.position.some(function(value){
           return Math.abs(lefts-value)<60
        })
        return flag;
    },
    drop:function(){
        let that=this;
        this.t=setInterval(function(){
            for (let i = 0; i < that.current.length; i++) {
              let tops= that.current[i].offsetTop+that.speed;
              that.current[i].style.top=`${tops}px`;
              if(tops>600){
                document.body.removeChild(that.current[i]);
                that.current.splice(i,1);
                that.position.splice(i,1);
                that.getchar()
              }
            };
        },300)
    },
    key:function(){
        let that=this;
        document.onkeydown=function(e){
            for(let i=0;i<that.current.length; i++){
                if(String.fromCharCode(e.keyCode)==that.current[i].innerText){
                    document.body.removeChild(that.current[i]);
                    that.score+=2;
                    that.scroll.innerHTML = that.score;
                    that.current.splice(i,1);
                    that.position.splice(i,1);
                    that.getchar()
                    if(that.score==that.gk){
                        alert("少侠你好快啊啊啊啊啊啊，现在进入下一关")
                        alert("进入下一关");
                        that.next();
                    }
                }
            }
        }

    },
    next:function(){
        clearInterval(this.t);
        for(let i = 0; i < this.current.length; i++){
            document.body.removeChild(this.current[i]);
            
        }   this.score=0;
            this.current.length=0;
            this.position.length=0;
            this.number++;
            this.gk+=10;
            this.start();
    }
};