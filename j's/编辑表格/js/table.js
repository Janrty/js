/*
* @Author: asus
* @Date:   2017-08-22 15:43:02
* @Last Modified by:   asus
* @Last Modified time: 2017-08-24 16:02:35
*/
/*修改：可编辑状态 当前单元格里插入一个input
		1、input
		2、content->input
		3、当前单元格清空
		4、input->td
	更新：表单失去焦点blur
		1、input内容保存 newvalue
		2、input删掉 removeChild
		3、newvalue->单元格
*/
window.onload=function(){

	//增加
	let add=document.querySelector('.btnadd');
	let tbody=document.querySelector('tbody')
	add.onclick=function(){
		let ntr=document.createElement('tr');
		ntr.innerHTML=`
			<td>李昊颉</td>
			<td>男</td>
			<td>23</td>
			<td>135897</td>
			<td><button class="btndel">删除</button></td>
		`
		tbody.appendChild(ntr)
	}



	



	//修改删除
	tbody.ondblclick=function(e){
		let ele=e.target;
		if(ele.nodeName == 'TD' && ele.className != 'btndel'){
			let inputs=document.createElement('input');
			inputs.value=ele.innerText;
			ele.innerText='';
			ele.appendChild(inputs)
			inputs.onblur=function(){
				let newvalue=inputs.value;
				ele.removeChild(inputs);
				inputs=null;
				ele.innerText=newvalue;
			}
		}
		if(ele.className == 'btndel'){
			let trs= ele.parentNode.parentNode;
			tbody.removeChild(trs);
			trs=null;
		}
	}




	let student=[
		{'name':'李昊颉','sex':'男','age':'21','phone':123456},
		{'name':'薛栋少','sex':'男','age':'21','phone':123456},
		{'name':'张晨路','sex':'男','age':'21','phone':123456},
		{'name':'吕增生','sex':'男','age':'21','phone':123456},
	];

	localStorage.student=JSON.stringify(student);
	let data=JSON.parse(localStorage.student);

	data.forEach(value=>{
		tbody.innerHTML+=`

			<tr>
				<td>${value.name}</td>
				<td>${value.sex}</td>
				<td>${value.age}</td>
				<td>${value.phone}</td>
				<td><button class="btndel">删除</button></td>
			</tr>

		`
	})
	console.log(localStorage)
}