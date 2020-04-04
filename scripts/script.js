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
    cur_descr.innerHTML = "<strong>Tema: </strong>"+temas[i].descripcion;
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
        abrir_modal_error('Importante...!!!', 'Las diapositivas aun no estan listas para este tema, por favor espera a que se habiliten.<br><br> Muchas gracias :)')
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
        abrir_modal_error('Tranquilo', 'Esta es la primera diapositiva.');
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
        j--;
        abrir_modal_error('Gracias','Acabaste la presentación por ahora. No hay mas diapositivas');
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
    titulo.innerHTML = "";
    var tit = document.createElement('h3');
    tit.innerHTML = elemento.titulo;
    titulo.appendChild(tit);
    var fecha = document.createElement("date");
    if(elemento.fecha!=""){
        fecha.innerHTML = "Publicado el: "+elemento.fecha;
    }else{
        fecha.innerText = "";
    }
    titulo.appendChild(fecha);

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
    var footer = document.getElementById('m_footer') ;
    footer.innerHTML = "";
    if(elemento.descarga!=""){
        var enlace = document.createElement("a");
        enlace.href = elemento.descarga;
        enlace.download;
        enlace.innerText = "Decarga Material de la Sesion";
    }else{
        var enlace = document.createElement("span");
        enlace.innerText = "La Paz - Bolivia";
    }
    footer.appendChild(enlace);
}
/* FIN VALIDAR CONTENIDO */

var ven_err_modal = document.getElementById('modal_error');
/* MODAL DE ERROR */
function abrir_modal_error(tit, men){
    ven_err_modal.style.display = "flex";
    var err_modal = document.getElementById('error_alerta');
    var err_titulo = err_modal.getElementsByTagName('h4');
    err_titulo[0].innerHTML=tit;
    var err_mensaje = err_modal.getElementsByTagName('p');
    err_mensaje[0].innerHTML = men;
}
/* MODAL DE ERROR */
function cerrar_modal_error(){
    ven_err_modal.style.display = "none";
}