
//boton enviar dinero
$(document).ready(function () {
  $('#listaContactos').on("click", "li", function () {
    $("#enviarDinero").show();
  });

  $("#mostrarFormulario").click(function () {
    $("#agregarContacto").toggle();
  });
//guardar contacto localstorag
  var contactos = localStorage.getItem("contactos");
  var contactosjson = JSON.parse(contactos);
  contactosjson.forEach(function (item) {


    var li = document.createElement("li");

    li.textContent = item.ContactoNombre + " Rut: " + item.ContactoRut + " Alias: " + item.ContactoAlias + " Banco: " + item.ContactoBanco;
    li.classList.add("list-group-item","contact-name", "list-group-item-action");
    li.id = item.ContactoRut;

    $('#listaContactos').append(li);

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
  //prevenir envio de formulario x defecto

});


//mostrar formulario agregar contacto
$(document).ready(function () {
  $('#mostrarFormulario').click(function () {
    $('#agregarContacto').show();
  });
});


$('#cancelar').click(function () {
  $('#agregarContacto').hide();
});


function CrearContacto() {

  var nombre = $('#nombre').val();
  var rut = $('#rut').val();
  var alias = $('#alias').val();
  var banco = $('#banco').val();
  $('#agregarContacto').hide();
  var contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  if (contactos === null) {
    contactos = [{ ContactoNombre: nombre, ContactoRut: rut, ContactoAlias: alias, ContactoBanco: banco }];

  }
  else {

    contactos.push({ ContactoNombre: nombre, ContactoRut: rut, ContactoAlias: alias, ContactoBanco: banco });
  }

  localStorage.setItem("contactos", JSON.stringify(contactos));
  location.reload();
};


//realizar transferencia

$(document).ready(function () {
  $('#enviarDinero').click(function () {
    $("#div-enviar-dinero").toggle();
  });
  //ocultar formulario enviar transferencia
  $('#cancelar-transferencia').click(function () {
    $('#div-enviar-dinero').hide();
  });


});
var ContactoNombre;
$(document).ready(function () {
  // Agregar un evento click a cada elemento li
  $("#listaContactos").on("click", ".list-group-item", function () {
    // Remover la clase "active" de todos los elementos li
    $(".list-group-item").removeClass("active");

    // Agregar la clase "active" al elemento li clickeado
    $(this).addClass("active");
  });

  $('#listaContactos').on("click", "li", function () {

    var contactoRut = $(this).attr("id");
    var contactos = localStorage.getItem("contactos");
    var contactosjson = JSON.parse(contactos);

    for (let item of contactosjson) {

      if (item.ContactoRut === contactoRut) {

        ContactoNombre = item.ContactoNombre;

        break;
      }
    }


  })
});


function transferirFondos() {
  // Obtener saldo del Local Storage
  var saldo = localStorage.getItem('saldo');

  var monto = parseInt($('#montoIngresado').val());
  if (!isNaN(monto) && monto > 0 && monto <= saldo && saldo > 0) {
    // Actualiza saldo en el Local Storage
    if (saldo) {
      saldo = parseFloat(saldo) - monto;
    }
    localStorage.setItem('saldo', saldo);

    // Limpiar el campo de monto
    $('#montoIngresado').val('');

    //alerta de retiro
    var alerta = $('<div class="alert alert-success" role="alert">Se ha realizado con éxito una transferencia de $' + monto + '</div>');
    $('#mostrarFormularioTransferencia').before(alerta);

//funcion transferencia
    setTimeout(function () {
      alerta.fadeOut('slow', function () {
        var transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
        if (transacciones === null) {
          transacciones = [{ comentario: "Transferencia realizada a " + ContactoNombre + " por el monto $", valor: monto }];

        }
        else {

          transacciones.push({ comentario: "Transferencia realizada a " + ContactoNombre + " por el monto $", valor: monto });

        }
        localStorage.setItem("transacciones", JSON.stringify(transacciones));



        window.location.href = 'MenuPrincipal.html';
      });

    }, 3000);
  } else {
    if (saldo === 0) {
      alert('No tienes fondos para transferir.');
    } else {
      if (monto > saldo) {
        alert('No tienes saldo suficiente para realizar esta operación')
      } else {
        alert('Ingresa un monto válido.');
      }
    }


  }

}