"use strict";

var database = '';

const dbName = "users";

function setup() {
  
  if(!database) {

   	var open = window.indexedDB.open(dbName, 1);

     open.onsuccess = function(event) {
        database = event.target.result;
        console.log("Banco de dados criado com sucesso => "+ database);
     };
           
     open.onupgradeneeded = function(event) {
       
        var database = event.target.result;
      
        var objectStore = database.createObjectStore("user", 
        	{ keyPath: "id",
        	 autoIncrement : true 
        	});
      
        objectStore.createIndex("nome", "nome", { unique: false });
      
        objectStore.createIndex("email", "email", { unique: false });
        
        
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

async function searchIndexedDb(term) {
  
  //Transaction sem especificar o segundo parâmetro significa que o modo é readonly
  var transaction = database.transaction(["user"]);
  var objectStore = transaction.objectStore("user");
  
  var index_1 = objectStore.index("nome");
  var index_2 = objectStore.index("email");
  
  var keyRange = IDBKeyRange.only(term);  
  
  var contactsByName = [];
  var contactsByEmail = [];
  
  //Abrindo Cursor
  //Eu poderia usar o método get, mas se tivermos mais de um contato o método vai pegar o de menor chave
  //Cursor vai retornar todos os contatos localizados
  var searchByName = index_1.openCursor(keyRange);
  
  searchByName.onsuccess = function(event) {
      
      var cursor = event.target.result;
      if (cursor) {
          contactsByName.push(cursor.value);            
          cursor.continue();
      } else {
           console.log("Contatos localizados por nome => ", contactsByName);
           
           var searchByEmail = index_2.openCursor(keyRange);
           
           searchByEmail.onsuccess = function(event) {
            
                var cursor = event.target.result;
                if (cursor) {
                    contactsByEmail.push(cursor.value);
                    cursor.continue();
                } else {
                  
                   console.log("Contatos localizados por email => ", contactsByEmail);
                  
                   //Transformar array (contendo contactsByName + contactsByEmail) para JSON array
                   let str = JSON.stringify(contactsByName.concat(contactsByEmail));
                   
                   //Retorna os itens únicos. Remove os repetidos.
                   let user = JSON.parse(str).filter((li, idx, self) => self.map(itm => itm.id).indexOf(li.id) === idx);
                  
                    console.info("Contatos localizados => ", user);
                    renderAll(user);
                }
               
           }
          
          //renderAll(users);
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
