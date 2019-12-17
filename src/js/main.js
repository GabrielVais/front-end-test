"use strict";

window.onload = () =>{

    setup();
}

const getStatus = (status) => {
    return status.split(' ')[0].toLowerCase()

}

const generateRow = (user, fetch = true) => {

    return `
    <div class="row">
        <div class="user-name">
            <p>
                ${user.name}
            </p>
            <p>
                ${fetch === true ? user.contact.email : user.email}
            </p>
        </div>
        <div class="user-info">
            <p>${user.cpf}</p>
            <p>${fetch === true ? user.contact.tel : user.telefone}</p>
        </div>
        <div class="user-status">
            <div class="status status-${fetch === true ? getStatus(user.status) : user.status}"></div>
            <span>${user.status}</span>
        </div>
        <div class="actions">
            <button class="btn" data-id="${fetch === true ? user._id : user.id}">Editar</button>
        </div>
    </div>
    `
};

document.querySelector("#btnShow").addEventListener('click', getAllIndexedDb)


fetch('https://demo5283088.mockable.io/customers')
    .then(res => res.json())
    .then(res => {
        res.data.map((user, index) => {
            let row = document.getElementById('result')
            console.log(user)
            row.insertAdjacentHTML('beforeend',generateRow(user, true))
            let resultTotal = document.querySelector("#resultNumbersClients");
            resultTotal.textContent = `Exibindo ${index+1} Clientes`;

    });
});


