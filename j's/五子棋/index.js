$(function(){
    let hei=[]
    let bai=[]
    let kongbai={};  //0_0{x:0,y:0}
    let isAI=true;
   for(let i=0;i<15;i++){
      for(let j=0;j<15;j++){
          $("<li>").addClass('qizi').attr("id",i+'_'+j).data("pos",{x:i,y:j}).appendTo('.qipan');
      }
   }
   let flag=true;
   $('.qipan .qizi').on("click",function(){
       if($(this).hasClass("hei")||$(this).hasClass("bai")){
           return
       }
       let data=$(this.data)
       if(flag){
           $(this).addClass('hei');
           hei[data.x+'_'+data.y]=true;
           panduan(data,hei)

       }else{
           $(this).addClass('bai');
           bai[data.x+'_'+data.y]=true;
           panduan(data,bai)
       }flag=!flag


       function panduan(pos,obj){
           let rows=1,cols=1,zx=1,yx=1;
           let i=pos.x, j=pos.y+1;

           while(obj[i+"_"+j]){
               rows++;
               j++;
           }
           j=pos.y-1;
           while(obj[i+"_"+j]){
               rows++;
               j--;
           }
           i=pos.x+1,j=pos.y;


           while(obj[i+"_"+j]){
               cols++;
               i--;
           }
           j=pos.x+1;
           while(obj[i+"_"+j]){
               cols++;
               i++;
           }
           i=pos.x-1,j=pos.y-1;


           while(obj[i+"_"+j]){
               zx++;
               i--;
               j--;
           }
           i=pos.x+1,j=pos.y+1;
           while(obj[i+"_"+j]){
               zx++;
               i++;
               j++;
           }


           i=pos.x-1,j=pos.y+1;


           while(obj[i+"_"+j]){
               yx++;
               i--;
               j++;
           }
           i=pos.x+1,j=pos.y-1;
           while(obj[i+"_"+j]){
               zx++;
               i++;
               j--;
           }
           console.log(rows)
           console.log(cols)
           console.log(zx)
       }


   })









})