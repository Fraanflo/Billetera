$(document).ready(function () {
  // Obtener saldo del Local Storage
  var saldo = localStorage.getItem('saldo');
  if (saldo) {
    $('#saldo-actual').text(saldo);
  } 
  
  
});

function depositarFondos(){
   // Obtener saldo del Local Storage
   var saldo = localStorage.getItem('saldo');
   if (saldo) {
     $('#saldo-actual').text(saldo);
   }
 
   // envío del formulario de depósito
  var monto = parseInt($('#montoIngresado').val());
  if (!isNaN(monto) && monto > 0) {
    // Actualiza saldo en el Local Storage
    if (saldo) {
      saldo = parseFloat(saldo) + monto;
    } else {
      saldo = monto;
    }
    localStorage.setItem('saldo', saldo);
    // Actualizar saldo mostrado
    $('#saldo-actual').text(saldo);
    // Limpiar el campo de monto
    $('#montoIngresado').val('');

    //alerta de deposito
    var alerta = $('<div class="alert alert-success" role="alert">Se ha realizado con éxito un depósito de $' + monto + '</div>');
    $('#tituloAdmFondos').before(alerta);

    // Mostrar la imagen de éxito de depósito
    $('#exitoTransferencia').show();
    //registro de transacciones con localstorage
    setTimeout(function () {
      alerta.fadeOut('slow', function () {
        var transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
        if (transacciones === null) {
          transacciones = [{ comentario: "Depósito a cuenta propia $", valor: monto }];
        
        }
        else {

          transacciones.push({ comentario: "Depósito a cuenta propia $", valor: monto });
        }
        localStorage.setItem("transacciones", JSON.stringify(transacciones));


        $('#exitoTransferencia').fadeOut('slow', function () {
          window.location.href = 'MenuPrincipal.html';
        });
      });
    }, 3000);
  } else {
    alert('Ingresa un monto válido para depositar.');
  }
}

// retiro de fondos 
function retirarFondos(){
   // Obtener saldo del Local Storage
   var saldo = localStorage.getItem('saldo');
   if (saldo) {
     $('#saldo-actual').text(saldo);
   }
   var monto = parseInt($('#montoIngresado').val());
  if (!isNaN(monto) && monto > 0 && monto <= saldo && saldo > 0) {
    
    if (saldo) {
      saldo = parseFloat(saldo) - monto;
    } 
    localStorage.setItem('saldo', saldo);
    // Actualizar saldo mostrado
    $('#saldo-actual').text(saldo);
    // Limpiar el campo de monto
    $('#montoIngresado').val('');

    //alerta de retiro
    var alerta = $('<div class="alert alert-success" role="alert">Se ha realizado con éxito un retiro de $' + monto + '</div>');
    $('#tituloAdmFondos').before(alerta);

   //retiro
    $('#exitoTransferencia').show();
    setTimeout(function () {
      alerta.fadeOut('slow', function () {
        var transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
        if (transacciones === null) {
          transacciones = [{ comentario: "Retiro de cuenta propia $", valor: monto }];

        }
        else {

          transacciones.push({ comentario: "Retiro de cuenta propia $", valor: monto });
        }
        localStorage.setItem("transacciones", JSON.stringify(transacciones));


        $('#exitoTransferencia').fadeOut('slow', function () {
          window.location.href = 'MenuPrincipal.html';
        });
      });
    }, 3000);
  } else {
    if (saldo === 0) {
      alert('No tienes fondos para Retirar.');
    } else {
      alert('Ingresa un monto válido.');
    }



  }

}