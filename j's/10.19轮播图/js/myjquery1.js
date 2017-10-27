function $(select) {
    return new aa(select);
}


function aa(select) {
    if(typeof  select=="string"){
        let reg=/^<[a-zA-Z][a-zA-Z1-6]{0,10}>$/;
        if(reg.test(select)){
            this[0]=document.createElement(select.slice(1,-1));
            this.length=1;
        }else{
            let ele=document.querySelectorAll(select)
            for(let i=0;i<ele.length;i++){
                this[i]=ele[i]
        }
            this.length=ele.length;
        }
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
aa.prototype.appendTo=function (select) {
    let parents=document.querySelectorAll(select);
    this.length=parents.length;
    let element=this[0];
    for (let i=0;i<parents.length;i++){
        let copy=element.cloneNode(true);
        this[i]=copy;
        parents[i].appendChild(copy)


    }
    return this
};


aa.prototype.attr=function (key,value) {
    if(value===undefined){
        this[0].getAttribute(key)
    }
    this.each(function (index,obj) {

            obj.setAttribute(key,value)

        })
    return this


   }

