"use strict";

const btnsEdit = document.querySelectorAll('.btn-edit');

btnsEdit.forEach(btnEdit =>{

	console.log(btnEdit);

	btnEdit.addEventListener('click', function(e){


			console.log(this);

	

	})

});