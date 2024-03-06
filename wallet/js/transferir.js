
//boton enviar dinero
$(document).ready(function () { 
    $('#listaContactos').on("click","li",function(){
        $("#enviarDinero").show();
      });
    
    $("#mostrarFormulario").click(function () {
      $("#agregarContacto").toggle();
    });
// boton buscar contacto
    $("#botonBuscarContacto").click(function () {
      var buscarContacto = $("#searchContact").val().toLowerCase();
      var encontrado = false;

      $("#listaContactos .contact-name").each(function () {
        var nombre = $(this).text().toLowerCase();
        if (nombre.indexOf(buscarContacto) !== -1) {
          encontrado = true;
          $(this).closest("li").show();
        } else {
          $(this).closest("li").hide();
        }
      });

      if (!encontrado) {
        $("#resultado").html("<p>No se encontraron contactos que coincidan con la búsqueda.</p>");
      } else {
        $("#resultado").empty();
      }
    });
  });
  
  //mostrar formulario agregar contacto
$(document).ready(function () {
    $('#mostrarFormulario').click(function () {
        $('#agregarContacto').show();
    });
});

//ocultar formulario agregar contacto

$('#cancelar').click(function(){
    $('#agregarContacto').hide();
});

//prevenir envio de formulario x defecto
$('#agregarNuevoContacto').submit(function(event){
event.preventDefault();

$('#agregarContacto').hide();
});


//realizar transferencia
//mostrar formulario oculto realizar transferencia
$(document).ready(function () {
    $('#enviarDinero').click(function () {
        $("#div-enviar-dinero").toggle();
    });
//ocultar formulario enviar transferencia
    $('#cancelar-transferencia').click(function(){
      $('#div-enviar-dinero').hide();
  });

    $('#formularioEnviarDinero').submit(function(event) {
        event.preventDefault();

        var monto = parseInt($('#monto').val());
//sacar saldo actual local storage
        if (!isNaN(monto) && monto > 0) {
            var saldoActual = parseInt(localStorage.getItem('saldo')) || 0;

            if (saldoActual >= monto) {
                localStorage.setItem('saldo', saldoActual - monto);
                alert("¡La transferencia se ha realizado exitosamente!");
                setTimeout(function() {
                  window.location.href = 'MenuPrincipal.html';
              }, 2000);
                
  
                $('#formularioEnviarDinero')[0].reset();
            } else {
                alert("No tienes suficiente saldo para realizar esta operación");
            }
        } else {
            alert("Por favor, inserta un monto válido mayor a cero");
        }
    });
});