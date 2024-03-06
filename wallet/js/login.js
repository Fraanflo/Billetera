/*document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('verificarCredenciales').addEventListener('submit', function(event) {
       event.preventDefault();

       
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
       if (email === 'fran@gmail.com' && password === '12345') {
           alert('Inicio de sesión exitoso');
           
           window.location.href = 'Menu.html';
       } else {
          alert('Email/Contraseña incorrecta');
        }
    });
 }); */

$(document).ready(function () {
    $('#verificarCredenciales').submit(function (event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        if (email === 'fran@gmail.com' && password === '12345') {
            loginExitoso();


        } else {
            loginFallido();

        }
    });
});
function loginExitoso() {
    // crea un nuevo div
    // y añade contenido
    var nuevaAlerta = document.createElement("div");
    nuevaAlerta.className = "alert alert-success alert-dismissible fade show";
    nuevaAlerta.textContent = "Inicio de sesión exitoso!";

    document.body.appendChild(nuevaAlerta);
    setTimeout(function () {
        window.location.href = 'MenuPrincipal.html';
    }, 2000)
}



function loginFallido() {
    // crea un nuevo div
    // y añade contenido
    var nuevaAlerta = document.createElement("div");
    nuevaAlerta.className = "alert alert-danger alert-dismissible fade show";
    nuevaAlerta.textContent = "Email / contraseña incorrecta, ingresa nuevamente tus datos";


    document.body.appendChild(nuevaAlerta);
    setTimeout(function () {
        nuevaAlerta.classList.remove("show");
    }, 2000)
}