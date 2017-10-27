// function getClass(classname){
//     if(document.getElementsByClassName){
//         return document.getElementsByClassName(classname)
//     }else{
//         var newarr=[];
//         var all=document.getElementsByTagName("*");
//         for(var i=0;i<all.length;i++){
//             if(all[i].classname=classname){
//                 newarr.push(all[i])
//             }
//         }return arr;
//     }
// }
// console.log(getClass(box))




function getElementsByClassName(tag,className) {
        var tag = document.getElementsByTagName(tag);
        var newarr= [];
        for(var i = 0 ; i<tag.length ; i++){
            if(tag[i].className.indexOf(className) != -1){
                newarr[newarr.length] = tag[i];
            }
        }
 
        return newarr;
 
    }