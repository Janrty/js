//属性
//速度  方向  边界
//方法  划线  画蛇
function Snake() {
    this.sence=document.querySelector(".sence");
    this.snake = ["0_0", "0_1", "0_2"];
    this.food="";
    this.direction=39;
    this.flag={"0_0":true, "0_1":true, "0_2":true}

}
    Snake.prototype={
    start:function () {
        this.dranline();
        this.drawsnake();
        this.move();
        this.key();
        this.dropFood();
        // this.eat()
    },
    dranline:function () {

       for (let i=0;i<20;i++){
           for (let j=0;j<20;j++){
               this.sence.innerHTML+=` <div class="block" id="${i}_${j}"></div>`;
           }
       }

    },
    drawsnake:function(){
        this.snake.forEach(element=>{
           document.getElementById(element).classList.add('hot');
        })
    },
    move:function () {
        let that = this;
        this.t = setInterval(function(){
            let oldt = that.snake[that.snake.length-1];
            let arr = oldt.split('_');// 7_0  '7' '0'
            let newt = '';
            if(that.direction == 37){
                newt = `${arr[0]*1}_${arr[1]*1-1}`
            }else if(that.direction == 38){
                newt = `${arr[0]*1-1}_${arr[1]}`
            }else if(that.direction == 39){
                newt = `${arr[0]}_${arr[1]*1+1}`
            }else if(that.direction == 40){
                newt = `${arr[0]*1+1}_${arr[1]}`
            }
            let new1=newt.split('_');
            if(new1[1]<0 || new1[1]>19 ||new1[0]<0 || new1[0]>19 ||that.flag[newt]){
                clearInterval(that.t);
                alert('game over');
            }
            if(newt==that.food){
                that.snake.push(newt);
                that.flag[newt]=true;
                document.getElementById(that.food).style.background="";
                that.dropFood();

            }else {
                that.snake.push(newt);
                that.flag[newt] = true;
                let weiba = that.snake.shift();
                delete  that.flag[weiba];
                document.getElementById(weiba).classList.remove('hot');
                that.drawsnake();
            }
        },200)
    },
     key:function(){
        document.onkeydown = function(e){
            let keycode = e.keyCode;
            if(Math.abs(keycode-this.direction)==2){
               return ;
            }
            this.direction = keycode;
        }.bind(this);
    },
     dropFood:function(){
        let x = Math.floor(Math.random()*20);
        let y = Math.floor(Math.random()*20);
        do{
             x = Math.floor(Math.random()*20);
             y = Math.floor(Math.random()*20);
        }while(this.flag[`${x}_${y}`])

        this.food = `${x}_${y}`;

        document.getElementById(this.food).style.background = 'red';
    },
    
}
