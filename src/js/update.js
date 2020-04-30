const formUpdate = document.querySelector('#formUpdate');

window.onload = async () =>{

    getDataUserById();

}


document.querySelector("#btnVoltarUpdate").addEventListener('click', function(e){

	  e.preventDefault();

	  location.href = "./index.html";

});

function getDataUserById(){

	const urlParams = new URLSearchParams(window.location.search);

	const user_id = parseInt(urlParams.get('user_id'));

	console.log(user_id.id);

	searchUserById(user_id, 'formUpdate');

	console.log(document.forms['formUpdate'].elements[0]);

}


formUpdate.addEventListener('submit', async function(e){

	try{

	const btnRegister = document.querySelector(".btn-active");

	e.preventDefault();

	console.log('clicado');

    var dados = new FormData(formUpdate);

	console.log(Object.fromEntries(dados));

	await updateById(parseInt(document.querySelector('#id').value), Object.fromEntries(dados));

	}catch(error){

		console.error(error);

	}finally{

		console.log('teste');

		//returnPage("./index.html", 3000, true);
	}


});

