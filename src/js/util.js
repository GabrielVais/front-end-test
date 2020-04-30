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


function returnMessage(msg, alertType){

       
       return `<p class='alert alert-${alertType}'>${msg}</p>`;

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