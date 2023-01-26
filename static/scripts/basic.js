





//función que detecta si el elemento está en la pantalla
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//selecciona todos los elementos con la clase "container"
var containers = document.getElementsByClassName("menu-lateral");

//agrega un evento scroll al documento
document.addEventListener("scroll", function() {
    //itera sobre cada container
    for (var i = 0; i < containers.length; i++) {
        //si el container está en la pantalla
        if (isInViewport(containers[i])) {
            //almacena que el usuario vio el container
            console.log("El usuario vio el container" + i);
        }
    }
});




const datos = {
    theme:{
        principal:document.querySelector("body"),
        clase:"night",
        boton:document.querySelector(".dayNight span"),
        botonIconDay:"icon-brightness_medium",
        botonIconNight:"icon-brightness_4",
        botonColor:"rgb(55, 156, 251)",
        botonTitle:"Dia/Noche"
    }
};



function evaluateSessionStorage(key){
    const message = sessionStorage.getItem("mensaje");
    if (message === null) {
        console.log("El valor no existe en el sessionStorage");
    } else {
        console.log("El valor existe en el sessionStorage: " + message);
    }
}

function changeIconClick(target,icon){
    target.addEventListener("click", function(){
        target.classList.toggle(icon);
    });
}

function changeTheme(target,clase,boton){
    boton.addEventListener("click", function(){
        if (!target.classList.contains(clase)){
            target.classList.add(clase);
            sessionStorage.setItem("night", clase);
        }else{
            target.classList.remove(clase);
        }
    })
}

function evaluateTheme(){
    if (!datos.theme.principal.hasAttribute("class",datos.theme.clase)){

    }
    sessionStorage.getItem("night");
}

changeTheme(datos.theme.principal,datos.theme.clase,datos.theme.boton);
changeIconClick(datos.theme.boton,datos.theme.botonIconNight);

