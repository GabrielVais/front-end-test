"use strict";


function deleteUser(){

const btnDelete = document.querySelectorAll('.btn-delete');

btnDelete.forEach(btnDel =>{

		btnDel.addEventListener('click', (e)=>{

			console.log('eaea');

			if(confirm('tem certeza que deseja excluir')){

				let id = parseInt(btnDel.getAttribute('data-id'));

				removeIndexedDb(btnDel, id);

			}

		})

	});

}

timer(deleteUser, 1000);
