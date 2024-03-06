$(document).ready(function() {
  // Obtener saldo del Local Storage
  var saldo = localStorage.getItem('saldo');
  if (saldo) {
    $('#saldo-actual').text(saldo);
  }

  // envío del formulario de depósito
  $('#depositForm').submit(function(event) {
    event.preventDefault();
    var depositAmount = parseInt($('#montoDeposito').val());
    if (!isNaN(depositAmount) && depositAmount > 0) {
      // Actualiza saldo en el Local Storage
      if (saldo) {
        saldo = parseFloat(saldo) + depositAmount;
      } else {
        saldo = depositAmount; 
      }
      localStorage.setItem('saldo', saldo);
      // Actualizar saldo mostrado
      $('#saldo-actual').text(saldo);
      // Limpiar el campo de monto
      $('#montoDeposito').val('');

      //alerta de deposito
      var alerta = $('<div class="alert alert-success" role="alert">Se ha realizado con éxito un depósito de $' + depositAmount + '</div>');
      $('#depositForm').after(alerta);

      // Mostrar la imagen de éxito de depósito
      $('#exitoTransferencia').show();

      setTimeout(function() {
         alerta.fadeOut('slow', function() {
             $('#exitoTransferencia').fadeOut('slow', function() {
                 window.location.href = 'MenuPrincipal.html';
             });
         });
     }, 3000);
   } else {
      alert('Ingresa un monto válido para depositar.');
    }
});
});