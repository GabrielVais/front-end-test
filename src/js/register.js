
document.querySelector("#btnVoltar")
.addEventListener('click', function(e){

	  e.preventDefault();

	  window.history.back();

});



async function createUser(){

    if (!window.indexedDB) {

    window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
   
    }else{

    	let form = document.querySelector('main-form');

    	let data = new FormData(form);

    	var db;

		var request = indexedDB.open("DBteste");

		request.onerror = function(event) {

		  alert("Você não habilitou minha web app para usar IndexedDB?!");
		
		};
		request.onsuccess = function(event) {

		  db = request.result;
	
		};

        
    }

}

