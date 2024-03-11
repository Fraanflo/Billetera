
//sacar datos transacciones de localstorage

$(document).ready(function () {
    var transacciones = localStorage.getItem("transacciones");
    var transaccionesjson = JSON.parse(transacciones);
    var cont = 0; //contador para limitar la lista de transacciones
    transaccionesjson.reverse();
    transaccionesjson.forEach(function (item) {
        if (cont===10){
            return; 
        }
        else {

       
        var li = document.createElement("li");

        li.textContent = item.comentario + item.valor;
        li.classList.add("list-group-item", "list-group-item-info");
        $('#listaTransacciones').append(li);
        cont += 1; }
    }); 


//filtro transacciones
    function mostrarMovimientos(filtro) {
        $('#listaTransacciones li').each(function () {
            if (filtro === "Todos" || $(this).text().indexOf(filtro) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    //evento change detectar cambios en movimiento seleccionado
    $('#tipoMovimiento').change(function () {
        var tipoTransaccion = $(this).val();
        mostrarMovimientos(tipoTransaccion);

    });
    mostrarMovimientos("Todos");

});

