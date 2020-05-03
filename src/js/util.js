function debounce(func, wait) {
    let timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
    }
}

function timer(func, wait){

	return setTimeout(func, wait);
}


function showAlert(msg, alertType, output){

     let outputMessage = `<p class='alert alert-${alertType}'>${msg}</p>`;

     output.innerHTML += outputMessage;

     setTimeout(() =>{

     output.innerHTML = '';

     }, 2000)

}


function validateEmail(email) {
    
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return emailRegex.test(String(email).toLowerCase());
}

function validateCpf(cpf){

	let cpfRegex = /^\d{3}\d{3}\d{3}\d{2}$/;

	return cpfRegex.test(cpf);
}



function validateName(name){

  let stringRegex = /^[a-z\s]{0,255}$/i

  return stringRegex.test(name);

}

function returnPage(page, wait, timer = false){

	if(timer === false){

	return location.href = page;

	}else{

		setTimeout(() =>{

			return location.href = page;

		}, wait)

	}

}

function cleanFileds(fields){

	for(let i=0; i<(fields.length - 2); i++){

		fields.elements[i].value = '';

	}

}