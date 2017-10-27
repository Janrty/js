window.onload=function(){
        let btn = document.getElementById('but');
        let user = document.getElementById('user');  
        let pass = document.getElementById('pass'); 




        btn.onclick=function(){
            //账户 密码验证
            if(user.value=="zhangsan" && pass.value=="123456"){
                alter(成功)
            }else{
                open("index1.html")
            }
                          
        }
}

