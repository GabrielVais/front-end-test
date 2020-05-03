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

	var output = document.querySelector('.output');

	var errors = [];

	const btnRegister = document.querySelector(".btn-active");

	e.preventDefault();

	console.log('clicado');

	//VALIDANDO DADOS

	//validando campo nome
	if(!validateName(document.forms['formUpdate'].elements[0].value) || document.forms['formUpdate'].elements[0].value === ''){


		errors.push('nome invalido !');

	}

	if(!validateEmail(document.forms['formUpdate'].elements[1].value) || document.forms['formUpdate'].elements[1].value === ''){


		errors.push('email invalido !');


	}


	if(!validateCpf(document.forms['formUpdate'].elements[2].value) || document.forms['formUpdate'].elements[1].value === ''){


		errors.push('cpf invalido !');


	}


	if(document.forms['formUpdate'].elements[1].value === ''){


		errors.push('telefone invalido !');


	}

	if(document.forms['formUpdate'].elements[4].value === ''){


		errors.push('status invalido');


	}

	if(errors.length > 0){
		
		errors.forEach((error, index) =>{

		showAlert(error, 'error', output);

		});


	}else{

    var dados = new FormData(formUpdate);

	console.log(Object.fromEntries(dados));

	await updateById(getId(), Object.fromEntries(dados));

	}

	}catch(error){

		console.error(error);

	}finally{

		console.log('teste');

		//returnPage("./index.html", 3000, true);
	}


});

