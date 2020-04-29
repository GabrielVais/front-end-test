"use strict";

window.onload = () =>{

    setup();

    setTimeout( () =>{

        getAllIndexedDb();
     
    }, 800);

    //getDataCustomers();
}

const getStatus = (status) => {
    return status.split(' ')[0].toLowerCase()

}

const generateRow = (user, fetch = true) => {

    return `
    <div class="row">
        <div class="user-name">
            <p>
                Nome: ${fetch === true ? user.name : user.nome}
            </p>
            <p>
                Email: ${fetch === true ? user.contact.email : user.email}
            </p>
        </div>
        <div class="user-info">
            <p>CPF: ${user.cpf}</p>
            <p>TEL: ${fetch === true ? user.contact.tel : user.telefone}</p>
        </div>
        <div class="user-status">
            <div class="status status-${fetch === true ? getStatus(user.status) : user.status}"></div>
            <span>${user.status}</span>
        </div>
        <div class="actions">
            <button class="btn-edit" data-id="${fetch === true ? user._id : user.id}">Editar</button>
            <button class="btn-delete" data-id="${fetch === true ? user._id : user.id}">Remover</button>
        </div>
    </div>
    `
};


setTimeout(() =>{

const btnsEdit = document.querySelectorAll('.btn-edit');

btnsEdit.forEach(btnEdit =>{

    console.log(btnEdit);

    btnEdit.addEventListener('click', function(e){

            let id = parseInt(btnEdit.getAttribute('data-id'));

            location.href = `./edit.html?user_id=${id}`;

        })

    });

}, 1000)

function getDataCustomers(){

try{

fetch('https://demo5283088.mockable.io/customers')
    .then(res => {

        if(res.status === 200){

        res.data.map((user, index) => {
            let row = document.getElementById('result')
            console.log(user)
            row.insertAdjacentHTML('beforeend',generateRow(user, true))
            let resultTotal = document.querySelector("#resultNumbersClients");
            resultTotal.textContent = `Exibindo ${index+1} Clientes`;

        
         });
    
        }

    }).catch(err => console.error(err));

    }catch(err){

        console.error(err);

    }

}

