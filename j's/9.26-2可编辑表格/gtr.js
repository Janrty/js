/*
data
init getdata update save  clear

*/
class storage{
    constructor(){
        this.date=[
        {name:"张三",xhao:"123",sex:"nan",ipone:"12345678"},
        {name:"张三",xhao:"123",sex:"nan",ipone:"12345678"},
        {name:"张三",xhao:"123",sex:"nan",ipone:"12345678"},
        {name:"张三",xhao:"123",sex:"nan",ipone:"12345678"}
        ]
    }
    _init(){
        localStorage.setItem("student",JSON.stringify(this.date))
    }
    getdata(){
        let date=localStorage.getItem('student');
        if(!date){
            this._init()
        }
        return this.date=JSON.parse(localStorage.getItem('student'))
    }
    update(index,key,value){
        // index key value
        this.date[index][key]=value;
        this.save()
    }
    del(index){
        this.date.splice(index,1)
        this.save()
    }
    push(obj){
        this.date.push(obj);
        this.save()
    }
    save(){
        localStorage.setItem('student',JSON.stringify(this.date))
    }
}