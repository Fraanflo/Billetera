$(document).ready(function() {
    // Obtener saldo del Local Storage
    var saldo = localStorage.getItem('saldo');
    if (saldo) {
      $('#balance').text('$' + saldo);
    }
  });




$(document).ready(function() {
    $('#boton-1').click(function() {
       
        window.location.href = 'Depositar.html';
    });
});
$(document).ready(function() {
    $('#boton-2').click(function() {
       
        window.location.href = 'transferir.html';
    });
});
$(document).ready(function() {
    $('#boton-3').click(function() {
       
        window.location.href = 'transacciones.html';
    });
});