function aa(select) {
    if(typeof  select=="string"){
        let ele=document.querySelectorAll(select)
        for(let i=0;i<ele.length;i++){
            this[i]=ele[i]
        }
        this.length=ele.length;
    }else if(typeof select=="function"){
        document.addEventListener("DOMContentLoaded",function () {
            select()
        },false)
    }else if(typeof select =="object" &&select.nodeType==1){
        this[0]=select;
        this.length=1;
    }
}


aa.prototype.each=function (callback) {
    for (let i=0;i<this.length;i++){
        callback(i,this[i])
    }
}
aa.prototype.css=function (attrobj) {
    for (let i=0;i<this.length;i++){
        for(let  j in attrobj){
            this[i].style[j]=attrobj[j]
        }
    }return this;
}
aa.prototype.html=function (value) {
    this.each(function(i,obj){
        obj.innerHTML=value;
    });
    return this;

}
aa.prototype.click=function (cali) {
    this.each(function (i, obj) {
        obj.onclick = function () {
            cali.call(obj)
        }
    })
}
aa.prototype.addclass=function () {
      
}