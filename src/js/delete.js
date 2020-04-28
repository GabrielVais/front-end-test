"use strict";

setTimeout(() =>{

const btnDelete = document.querySelectorAll('.btn-delete');

btnDelete.forEach(btnDel =>{

		btnDel.addEventListener('click', (e)=>{

			if(confirm('tem certeza que deseja excluir')){

				let id = parseInt(btnDel.getAttribute('data-id'));

				removeIndexedDb(btnDel, id);

			}

		})

	});

}, 1000);