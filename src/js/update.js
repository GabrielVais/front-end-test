const formUpdate = document.querySelector('#formUpdate');

window.onload = async () =>{

    await setup();

    setTimeout(() =>{

    getDataUserById();

	}, 300);
}


document.querySelector("#btnVoltarUpdate").addEventListener('click', function(e){

	  e.preventDefault();

	  location.href = "./index.html";

});

function getDataUserById(){

	const urlParams = new URLSearchParams(window.location.search);

	const user_id = parseInt(urlParams.get('user_id'));

	console.log(user_id);

	searchUserById(user_id, 'formUpdate');

	console.log(document.forms['formUpdate'].elements[0]);

}




