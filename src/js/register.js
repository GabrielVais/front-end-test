"use strict";

document.querySelector("#btnVoltar").addEventListener('click', function(e){

	  e.preventDefault();

	  location.href = "./index.html";

});

//document.querySelector("#carregarDb").addEventListener('click', getAllIndexedDb);

let formCadastro = document.querySelector("#formRegister");

formCadastro.addEventListener('submit', async function(e){

	try{

	var output = document.querySelector('.output');

	var errors = [];

	const btnRegister = document.querySelector(".btn-active");

	e.preventDefault();

	console.log('clicado');

	//VALIDANDO DADOS

	//validando campo nome
	if(!validateName(document.forms['formRegister'].elements[0].value) || document.forms['formRegister'].elements[0].value === ''){


		errors.push('nome invalido !');

	}

	if(!validateEmail(document.forms['formRegister'].elements[1].value) || document.forms['formRegister'].elements[1].value === ''){


		errors.push('email invalido !');


	}


	if(!validateCpf(document.forms['formRegister'].elements[2].value) || document.forms['formRegister'].elements[1].value === ''){


		errors.push('cpf invalido !');


	}


	if(!validatePhone(document.forms['formRegister'].elements[3].value) || document.forms['formRegister'].elements[1].value === ''){


		errors.push('telefone invalido !');


	}

	if(document.forms['formRegister'].elements[4].value === ''){


		errors.push('status invalido');


	}

	if(errors.length > 0){
		
		errors.forEach((error, index) =>{

		showAlert(error, 'error', output);

		});


	}else{


    var dados = new FormData(formCadastro);

    //convertendo para objeto forma antiga

	// dados.forEach(function(value, key){
	//     user[key] = value;
	// });

	//var user = JSON.stringify(user)

	//object.fromEntries convertendo formData
	//para objeto 
	//2019
	
	console.log(Object.fromEntries(dados));

	
	await saveIndexedDb(Object.fromEntries(dados), btnRegister);


	showAlert('usuário cadastrado com sucesso!', 'success', output);


	}

	}catch(error){

		console.error(error);

	}finally{

		console.log(output);


		//returnPage("./index.html", 1000, true);
	}


});


