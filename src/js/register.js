"use strict";
window.onload = () =>{

    setup();
}

document.querySelector("#btnVoltar")
.addEventListener('click', function(e){

	  e.preventDefault();

	  window.history.back();

});

let formCadastro = document.querySelector("#formRegister");

formCadastro.addEventListener('submit', function(e){

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

	saveIndexedDb(Object.fromEntries(dados), btnRegister);

});


