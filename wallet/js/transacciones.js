

//funcion de filtro
$(document).ready(function(){
function mostrarMovimientos(filtro){
$('#listaTransacciones li').each(function(){
if (filtro === "Todos" || $(this).text().indexOf(filtro) !== -1) {
    $(this).show();
} else {
    $(this).hide();
}
});
}
//evento change detectar cambios en movimiento seleccionado
$('#tipoMovimiento').change(function(){
    var tipoTransaccion = $(this).val();
    mostrarMovimientos(tipoTransaccion);

});
mostrarMovimientos("Todos");

});
