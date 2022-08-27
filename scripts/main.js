async function onClick (event) {
    event.preventDefault();
    this.style.backgroundColor = "black";
    console.log("click...");
    console.log(event);
  
  
    const mensaje = {
      name: document.getElementById('fcom').value,
      email: document.getElementById('ftit').value,
      message: document.getElementById('fcel').value
    }
    console.log(mensaje);

    await fetch("https://jsonplaceholder.typicode.com/posts", {        
    method: "POST",
    body: JSON.stringify(mensaje),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => { 
        console.log(json);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Gracias por tu comentario',
            showConfirmButton: false,
            timer: 1500
          });
        cleanForm();
        /* redirectUrl(); */
    })
    .catch((err) => console.log(err));

}

function cleanForm() {
    let formulario = document.getElementById('formulario');    
    formulario.reset();    
}
function redirectUrl(){
    window.location.href = "https://google.com";    
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);


/* Clima */
// https://www.youtube.com/watch?v=ScFv80QmEps
//
const tempImg = document.getElementById('temp-img');

function updateImages(temp) {
    
    let src = './img/temp-mid.png';
    if (temp > 26) {
      src = './img/temp-high.png';
    } else if (temp < 20) {
      src = './img/temp-low.png';
    }
    tempImg.src=src;
  }

async function clima(){
    try {
        const resp = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-24.183370154236414&lon=-65.3312658726929&exclude=hourly,daily&units=metric&lang=es&appid=6ed614fb72fd1eb47086ebfcec19e63b');
            data = await resp.json();
            console.log(new Date().getDate());
            console.log(data);
            console.log(data.name);
            console.log(data.main.temp);
            console.log("temp min ", data.main.temp_min);
            console.log("temp max ", data.main.temp_max);
            ciu.innerHTML = data.name;
            temp.innerHTML = data.main.temp;
            desc.innerHTML = data.weather[0].description;
            tempmin.innerHTML = data.main.temp_min;
            tempmax.innerHTML = data.main.temp_max;
            updateImages(data.main.temp);
        
    } catch (error) {
        console.log(error);
        alert('...ooops hubo un error');
    }
}

window.onload = clima();