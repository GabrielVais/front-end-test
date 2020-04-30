const formUpdate = document.querySelector('#formUpdate');

window.onload = async () =>{

    getDataUserById();

    console.log(getId());

}


document.querySelector("#btnVoltarUpdate").addEventListener('click', function(e){

	  e.preventDefault();

	  location.href = "./index.html";

});

function getId(){

	const urlParams = new URLSearchParams(window.location.search);

	const user_id = parseInt(urlParams.get('user_id'));

	return user_id;

}


function getDataUserById(){


	searchUserById(getId(), 'formUpdate');

	console.log(document.forms['formUpdate'].elements[0]);

}


formUpdate.addEventListener('submit', async function(e){

	try{

	const btnRegister = document.querySelector(".btn-active");

	e.preventDefault();

	console.log('clicado');

    var dados = new FormData(formUpdate);

	console.log(Object.fromEntries(dados));

	await updateById(getId(), Object.fromEntries(dados));

	}catch(error){

		console.error(error);

	}finally{

		console.log('teste');

		//returnPage("./index.html", 3000, true);
	}


});

