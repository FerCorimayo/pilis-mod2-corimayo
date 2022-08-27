async function onClick (event) { //funcion para obtener los datos del formulario y enviarlos a jsonplaseholder
    event.preventDefault();         //anula la accion normal del boton para procesar las acciones siguientes
    this.style.backgroundColor = "black";
    console.log("click...");
    console.log(event);
  
  
    const mensaje = {
      name: document.getElementById('fcom').value, //captura el id del imput con id fcom
      email: document.getElementById('ftit').value, //captura el id del imput con id ftit
      message: document.getElementById('fcel').value  //captura el id del imput con id fcel
    }
    console.log(mensaje);

    await fetch("https://jsonplaceholder.typicode.com/posts", {        
    method: "POST",                        //se usa el metodo post para enviar y recibir un id 
    body: JSON.stringify(mensaje),        //transforma json en formato de string para ser enviado
    headers: { "Content-type": "application/json; charset=UTF-8" },   
  })
    .then((response) => response.json())    // espera a que se cumpla la promesa para transformarlo en json y guardarlo en response
    .then((json) => { 
        console.log(json);
        Swal.fire({                       // se usa libreria swal para mostrar un mensaje en la pantalla
            position: 'center',
            icon: 'success',
            title: 'Gracias por tu comentario',
            showConfirmButton: false,
            timer: 1500
          });
        cleanForm();    //llama a la funcion cleanForma la cual limiara el formulario
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

let boton = document.getElementById("enviar"); //captura el elemento del boton con id enviar
boton.addEventListener("click", onClick);     //crea un evento que al hacer click ejecuta la funcion onClik


/* Clima */

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

window.onload = clima();// la funcion se iniciara al abrirse la pagina