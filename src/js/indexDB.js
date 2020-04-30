var database = '';

const dbName = "users";

var dataUser = '';

setup();

async function setup() {
  
  if(!database) {

   	var open = window.indexedDB.open(dbName, 1);

     open.onsuccess = async function(event) {

        database = await event.target.result;

        console.log(database);

        console.log("Banco de dados criado com sucesso => "+ database);
     };
           
     open.onupgradeneeded = async function(event) {
       
        var database = await event.target.result;
      
        var objectStore = await database.createObjectStore("user", 
        	{ keyPath: "id",
        	 autoIncrement : true 
        	});
      
        await objectStore.createIndex("nome", "nome", { unique: false });
      
        await objectStore.createIndex("email", "email", { unique: false });
        
        
       }
    }

}


//Responsável por limpar(remover) os objetos armazenados na collection
function cleanIndexedDb() {
    
    //Transação
    var transaction = database.transaction(["user"], 'readwrite');
    
    //Objeto

    var objectStore = transaction.objectStore("user");
    
    //Requisição
    var request = objectStore.clear();
    
    //Limpeza realizada com sucesso
    request.onsuccess = function(event) {
      console.log("Limpeza do banco de dados realizada com sucesso!");
    
    };
}


//Responsável por gravar cada contato na estrutura IndexedDb
function saveIndexedDb(userData, button) {
  
  //Desativa botão [salvar]
  button.disabled = true;
  
  var transaction = database.transaction(["user"], 'readwrite');
  
  var objectStore = transaction.objectStore("user");
  
  var request = objectStore.add(userData);

  //Se transação completada com sucesso ativa botão [Salvar]    
  request.onsuccess = function(event) {
    
    //event.target.result == userData.id;
    console.log("Contato Gravado =>", event.target.result);
    
    var item = [];
    userData.id = event.target.result;
    item.push(userData);
    
    console.log("usuário Com Id => ", item);
    
    //renderLine(item);
    
    //Simulando uma espera de 5 segundo antes de reativar o botão de gravar contato
    setTimeout(function(){  button.disabled = false;  }, 5000);
    
  
  };  
  
  //Se ocorrer erro na transação, ativar novamente o botão salvar e exibir mensagem de erro no console
  //TODO: exibir mensagem de erro na tela do usuário
  transaction.onerror = function(event) {
    console.log("Erro ao Gravar Contato");
    //btnSalvar.disabled = false;    
  }    
  
      
}

//Obter todos os contatos salvos.
//Usando  para obter os contatos
//Nota: Existe um método chamado getAll que pode ser usado como alternativa ao cursor. O getAll é mais performático
async function getAllIndexedDb() {

  if(!database){

      

  }
  
 
  var user = [];

  //Transaction sem especificar o segundo parâmetro significa que o modo é readonly
  var transaction = await database.transaction(["user"]);
  var objectStore = await transaction.objectStore("user");
  
  //Abrindo Cursor
  var request = objectStore.openCursor();
  
  request.onsuccess = async function(event) {
    
    //cursor recebe o primeiro contato armazenado
    var cursor = event.target.result;
    
    if (cursor) {
      await user.push(cursor.value);
      console.log("Cursor Atual => ", cursor.value);
      //próximo contato armazenado
      cursor.continue();
    } else {
      console.info ("Não existem mais usuários para buscar!!!");
      await renderAll(user);
    }
    
  }

}


 async function searchUserById(id, formName = '') {
  
  //Transaction sem especificar o segundo parâmetro significa que o modo é readonly
  var transaction = await database.transaction(["user"]);
  var objectStore = await transaction.objectStore("user");

  var searchById =  await objectStore.get(id);
  
  searchById.onsuccess = async (event) => {
      
      var cursor = await event.target.result;

      if (cursor) {
 
          console.log(cursor);

          document.forms['formUpdate'].elements[0].value = cursor.nome;

          document.forms['formUpdate'].elements[1].value = cursor.email;

          document.forms['formUpdate'].elements[2].value = cursor.cpf;

          document.forms['formUpdate'].elements[3].value = cursor.telefone

          document.forms['formUpdate'].elements[4].value = cursor.status

        }

    }

}


async function updateById(id, userData){

  var transaction = await database.transaction(["user"], 'readwrite');

  var objectStore = await transaction.objectStore("user");
 
  var request = objectStore.get(id);

  console.log(userData);

  console.log(id);

  request.onsuccess = function(e){
    
      userData.id = e.target.result.id;

      //var objRequest = cursor.update(item);
      var objRequest = objectStore.put(userData);

      console.log('objRequest', objRequest);

      objRequest.onsuccess = function(e){

          console.log('usuario atualizado com sucesso!');
    }

  }

}



function removeIndexedDb(target, id) {
    
  var transaction = database.transaction(["user"], "readwrite");
  
  var objectStore = transaction.objectStore("user");
 
  console.log(transaction);

  var request = objectStore.delete(id);

  console.log(request);

  request.onsuccess = function(event) {

      console.log("usuário Removido com Sucesso");

      var element = target.parentNode.parentNode;

      console.log(element)

      console.log("Objeto removido => ", element);

      element.parentNode.removeChild(element);
  }
 
}

//Se tiver um banco de dados aberto
if (database) {
  
  //Evento genérico para tratar os erros de todos os requests do banco IndexedDB!
  database.onerror = function(event) {
    alert("Erro encontrado: " + event.target.errorCode);
  };
}




function renderAll(user) {
   
    user.forEach(function(item) {
      
      let row = document.getElementById('result');
      
      row.insertAdjacentHTML('beforeend',generateRow(item, false));

      //Incluindo o id quando usamos indexeddb
      //var param =  item["id"] ? item["id"] : '';
        
      //newCell_4.innerHTML = "<button type='button' onclick='removeContact(this, " + param + ")' class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
    });
    
}
