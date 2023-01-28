





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



//Arbol de Datos
const datos = {
    theme:{
        main:document.querySelector("body"),
        boton:document.querySelector(".dayNight span"),
        botonIconDay:"icon-brightness_medium",
        botonIconNight:"icon-nightlight_round",
        botonColor:"rgb(253, 231, 121)",
        botonTitle:"Dia/Noche",
        claseNight:"night",
    },
    dragDrop:{
        mainDragger: document.querySelector('.main-dragger'),
        mainDropper: document.querySelector('.main-dropper'),
    }
};



//Evaluadores

function existSessionStorage(key){
    const message = sessionStorage.getItem(key);
    return message === null ? false : true;
}

function existClass(tag,clase){
    return tag.classList.contains(clase) ? true : false;
}

function existTheme(tag,clase){
    if (!tag.classList.contains(clase)){
        return !existSessionStorage(clase) ? false : true;
    }
    else {
        return !existSessionStorage(clase) ? false : true;
    }
}



//Cambiadores

function changeIconClick(tag,icon){
    tag.addEventListener("click", function(){
        tag.classList.toggle(icon);
    });
}

function changeTheme(tag,clase,boton,botonClass){
    if (!existClass(tag,clase) && !existClass(boton,botonClass)){
        if (existTheme(tag,clase)){
            tag.classList.add(sessionStorage.getItem(clase));
            boton.classList.add(sessionStorage.getItem(botonClass));
        }
    }

    boton.addEventListener("click", function(){
        if (!existClass(tag,clase) && !existClass(boton,botonClass)){
            if (!existTheme(tag,clase)){
                sessionStorage.setItem(clase, clase);
                sessionStorage.setItem(botonClass, botonClass);
                tag.classList.add(clase);
                boton.classList.add(botonClass);
            }
        }
        else {
            if (existTheme(tag,clase)){
                tag.classList.remove(clase);
                boton.classList.remove(botonClass);
                sessionStorage.removeItem(clase);
                sessionStorage.removeItem(botonClass);
            }
        }
    })
}


//Setters

function setattributeAllChilds(objetivo,atributo,valor) {
    const children = Array.from(objetivo.children);
    children.forEach(child => child.setAttribute(atributo, valor));
}



//DraggerDrop

function dragDrop(draggerElem,dropperElem){
    let nodeToClone;
    const mainDragger = draggerElem;
    const mainDropper = dropperElem;
    setattributeAllChilds(draggerElem,"draggable",true);


    mainDragger.addEventListener('dragstart', (e) => {
        nodeToClone = e.target;
    });

    mainDropper.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    mainDropper.addEventListener('drop', (e) => {
        e.preventDefault();
        let node = nodeToClone.cloneNode(true);
        let button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.addEventListener('click', (e) => {
            e.target.parentNode.remove();
        });
        node.appendChild(button);
        mainDropper.appendChild(node);
    });
}




//InicializadorGlobal

function init() {

    changeTheme(datos.theme.main,datos.theme.claseNight,datos.theme.boton,datos.theme.botonIconNight);

    dragDrop(datos.dragDrop.mainDragger,datos.dragDrop.mainDropper);

    


}



document.addEventListener('DOMContentLoaded', init);




