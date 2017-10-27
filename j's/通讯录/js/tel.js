/*
* @Author: asus
* @Date:   2017-08-24 18:47:16
* @Last Modified by:   asus
* @Last Modified time: 2017-08-26 20:21:07
*/
window.onload=function(){
    let dl=document.querySelector('dl')
	let aside=document.querySelector('.aside')

    

    let contact=[
        {'name':'张晨路','phone':'18306891973','pinyin':'zhangchenlu'},
        {'name':'李昊颉','phone':'17835423993','pinyin':'lihaojie'},
        {'name':'宁帅','phone':'13635695083','pinyin':'ningshuai'},
        {'name':'王少峰','phone':'17835398198','pinyin':'wangshaofeng'},
        {'name':'薛栋少','phone':'15535404594','pinyin':'xuedongshao'},
        {'name':'杨春皓','phone':'15944219255','pinyin':'yangchunhao'},
        {'name':'张京帅','phone':'18434267031','pinyin':'zhangjingshuai'},
        {'name':'吕增生','phone':'13209886554','pinyin':'lvzengsheng'},
        {'name':'余亚鑫','phone':'15235990430','pinyin':'yuyaxin'},
        {'name':'职卫良','phone':'18735978314','pinyin':'zhiweilliang'},
        {'name':'朱永正','phone':'18734703790','pinyin':'zhuyongzheng'},
        {'name':'董庆','phone':'13935923928','pinyin':'dongqing'},
        {'name':'杜忻岗','phone':'18735079141','pinyin':'duxingang'},
        {'name':'扆豪杰','phone':'15618555349','pinyin':'yihaojie'},
        {'name':'梁宗瑶','phone':'17835424282','pinyin':'liangzongyao'},
        {'name':'王凡','phone':'15735170038','pinyin':'wangfan'},
        {'name':'王艺陶','phone':'18306890523','pinyin':'wangyitao'},
        {'name':'寇晓瑞','phone':'13203482991','pinyin':'kouxiaorui'},
        {'name':'薛浩宇','phone':'18234494226','pinyin':'xuehaoyu'},
        {'name':'杨丹琪','phone':'18435202602','pinyin':'yangdanqi'},
        {'name':'赵培雄','phone':'13617269311','pinyin':'zhaopeixiong'},
        {'name':'周通','phone':'17809166727','pinyin':'zhoutong'},
        {'name':'李晓兰','phone':'15935696450','pinyin':'lixiaolan'},

    ];


    function getData(){
        let data=localStorage.getItem('contact')?JSON.parse(localStorage.contact):false;
        if(!data){
            localStorage.setItem('contact',JSON.stringify(contact));
            data=JSON.parse(localStorage.contact)
        }
        return data;
        
    }
    getData();
    function render(data){
        let dataobj={};
        data.forEach(element=>{
            let first=element.pinyin.charAt(0).toUpperCase();
            if(!dataobj[first]){
                dataobj[first]=[]
            }
            dataobj[first].push(element)
        })
        let keys=Object.keys(dataobj).sort()

        keys.forEach(element=>{
            aside.innerHTML+=`
            <li>${element}</li>
            `
            dl.innerHTML+=`
            <dt>${element}</dt>
          `
            dataobj[element].forEach(value=>{
                dl.innerHTML+=`
                <dd><a href="tel:${value.phone}"">${value.name}</a></dd>
                `
            })
        })

        let dtl=document.querySelectorAll('dt')
        let head=document.querySelector('header')
        let height=head.offsetHeight



        let hei=aside.offsetHeight;
        aside.style.marginTop=`-${hei/2}px`


        //提示文字
        let arr=[];
        dtl.forEach(element=>{
           arr.push(element.offsetTop)
        })

        let tip=document.querySelector('.tip');
        let th=tip.offsetHeight;
        tip.innerHTML=keys[0]
        window.onscroll=function(){
            let st=document.body.scrollTop;
            arr.forEach((value,index)=>{
                if(th+height+st>=value+th){
                    tip.innerHTML=`${keys[index]}`
                }
            })
        }

    }
    render(getData());

    //搜索
    let input=document.querySelector('input');
        input.onkeyup=function(){
            let ele=this.value.trim();
            let filter=getData().filter(element=>element.name.includes(ele) || element.phone.includes(ele));
            dl.innerHTML=''
            aside.innerHTML=''
            render(filter);
        }




    

  




    // for(let i=0;i<dtl.length;i++){
    //     let ddl=dtl[i].previousElementSibling;
    //     let dda=ddl.querySelector('a')
    //     dda.style.border='none';
    // }





 



    // localStorage.contact=JSON.stringify(contact);
    // let data=JSON.parse(localStorage.contact);

    // let dataobj={};
    // for(let i=0;i<data.length;i++){
    // 	let first=data[i].pinyin.charAt(0).toUpperCase();
    // 	if(!dataobj[first]){
    // 		dataobj[first]=[];
    // 	}
    // 	dataobj[first].push(data[i]);
    	
    // }
    // let keys=Object.keys(dataobj).sort()


    
}