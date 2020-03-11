var modal = document.getElementById('modal');
var contenido = document.getElementById('m_contenido');
var inicio = document.getElementById('inicio');
var sw = false;
var j = 0;
var diapos;
var dia_tema;

/* CARGAR TEMAS */
for(let i=0; i<temas.length; i++){
    var ini_curso = document.createElement('div');
    ini_curso.className = 'curso';
    ini_curso.setAttribute('onClick' ,"abrir_modal('"+temas[i].tema+"')");
    var cur_img = document.createElement('img');
    cur_img.src = temas[i].imagen;
    ini_curso.appendChild(cur_img);
    var cur_descr = document.createElement('p');
    cur_descr.innerHTML = temas[i].descripcion;
    ini_curso.appendChild(cur_descr);
    inicio.appendChild(ini_curso);
}
/* CARGAR TEMAS */

/* ABRIR MODAL */
function abrir_modal(el){
    for (let i = 0; i < diapo.length; i++) {
        if(diapo[i].tema == el){
            sw = true;
            dia_tema = diapo[i];
            diapos = dia_tema.diapositivas;
            break;
        }
    }
    if(!sw){
        alert('Las diapositivas de este tema recién se subirán');
    }else{
        modal.style.display = 'grid';
        validar_contenido(diapos[j]);
    }
}
/* ABRIR MODAL */

/* ANTERIOR PRESENTACION */
function pres_anterior(){
    j--;
    if(j>=0){
        validar_contenido(diapos[j]);
    }else{
        alert('Esta es la primera diapositiva.');
        j++;
    }
}
/* ANTERIOR PRESENTACION */

/* SIGUIENTE PRESENTACION */
function pres_siguiente(){
    j++;
    if(j<diapos.length){
        validar_contenido(diapos[j]);
    }else{
        cerrar_modal();
        alert('No hay mas diapositivas');
    }
}
/* SIGUIENTE PRESENTACION */

/* CERRAR MODAL */
function cerrar_modal(){
    j=0;
    sw=false;
    modal.style.display = "none";
}
/* CERRAR MODAL */

/* VALIDAR EL CONTENIDO DE DIAPOS.JS PARA VERIFICAR SU CONTENIDO */
function validar_contenido(elemento){
    var titulo = document.getElementById('m_titulo');
    titulo.innerHTML = '<h2>'+diapos[j].titulo+'</h2>';
    contenido.style.backgroundImage = 'url("'+dia_tema.bg+'")';
    contenido.innerHTML = "";
    if(!elemento.subtitulo==""){
        var elm = document.createElement("h4");
        var cad = document.createTextNode(elemento.subtitulo);
        elm.appendChild(cad);
        contenido.appendChild(elm);
    }
    if(!elemento.imagen==""){
        var elm = document.createElement("img");
        elm.className = "pres_img";
        elm.src = elemento.imagen;
        contenido.appendChild(elm);
    }
    if(!elemento.contenido==""){
        var elm = document.createElement("p");
        var cad = document.createTextNode(elemento.contenido);
        elm.appendChild(cad);
        contenido.appendChild(elm);
    }
    if(!elemento.lista.length==0){
        var elm = document.createElement("ul");
        for (let i = 0; i < elemento.lista.length; i++) {
            var element = elemento.lista[i];
            var lis = document.createElement('li');
            var lis_c = document.createTextNode(elemento.lista[i]);
            lis.appendChild(lis_c);
            elm.appendChild(lis);
        }
        contenido.appendChild(elm);
    }
}
/* FIN VALIDAR CONTENIDO */