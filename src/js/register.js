"use strict";

document.querySelector("#btnVoltar").addEventListener('click', function(e){

	  e.preventDefault();

	  location.href = "./index.html";

});

//document.querySelector("#carregarDb").addEventListener('click', getAllIndexedDb);

let formCadastro = document.querySelector("#formRegister");

formCadastro.addEventListener('submit', async function(e){

	try{

	const btnRegister = document.querySelector(".btn-active");

	e.preventDefault();

	console.log('clicado');

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

	}catch(error){

		console.error(error);

	}finally{

		console.log('3eeaea');

		returnPage("./index.html", 3000, true);
	}


});


