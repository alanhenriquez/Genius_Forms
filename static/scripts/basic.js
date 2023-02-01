





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
        mainDragger: document.querySelectorAll('.main-dragger'),
        mainDropper: document.querySelector('.main-dropper'),
    },
    forms:{
        classic: document.querySelector('.formsClassic'),
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

//Changers

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

function changeNode(node, newNodeType) {
    const newNode = document.createElement(newNodeType);
    const parent = node.parentNode;
    parent.replaceChild(newNode, node);
}

function changeNodeIdentified(node, newNodeType, className) {
    const newNode = document.createElement(newNodeType);
    newNode.classList.add(className);
    const parent = node.parentNode;
    parent.replaceChild(newNode, node);
}

//Getters

function getMaxNum(nums) {
    let max_num = Number.NEGATIVE_INFINITY;
    for (let num of nums) {
      if (num > max_num) {
        max_num = num;
      }
    }
    return max_num;
}

function getParentNode(element, targetParentClass) {
    let current = element.parentNode;
    while (current) {
      if (current.classList.contains(targetParentClass)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
}

function getParentNodes(element, className) {
    const parentElements = [];
    let currentElement = element;
  
    while (currentElement) {
      if (currentElement.classList && currentElement.classList.contains(className)) {
        parentElements.push(currentElement);
      }
      currentElement = currentElement.parentElement;
    }
  
    return parentElements.length > 1 ? parentElements : parentElements[0];
  }

// Setters & Adders

function setAttributeAllChilds(objetivo,atributo,valor) {
    const children = Array.from(objetivo.children);
    children.forEach(child => child.setAttribute(atributo, valor));
}

function addClassAllChilds(objetivo,atributo) {
    const children = Array.from(objetivo.children);
  children.forEach(child => child.classList.add(atributo));
}

function addToogleClassAllChilds(objetivo,atributo) {
    const children = Array.from(objetivo.children);
  children.forEach(child => child.classList.toggle(atributo));
}

//Deleters

function deleteAttributeAllChilds(objetivo,atributo) {
    const children = Array.from(objetivo.children);
  children.forEach(child => child.removeAttribute(atributo));
}

function deleteClassAllChilds(objetivo,atributo) {
    const children = Array.from(objetivo.children);
  children.forEach(child => child.classList.remove(atributo));
}   

//DraggerDrop

function dragDrop(draggerElem,dropperElem){
    let nodeToClone;
    const mainDragger = draggerElem;
    const mainDropper = dropperElem;
    const draggableElements = mainDragger;
    const botonHTML = `
    <div class="acciones">
        <div class="boton">
            <div class="interno editar">
                <span class="icon-pencil"></span>
            </div>
        </div>
        <div class="boton">
            <div class="interno borrar">
                <span class="icon-delete"></span>
            </div>
        </div>
    </div>
    `;

    draggableElements.forEach(element => {

        setAttributeAllChilds(element,"draggable",true);

        element.addEventListener('dragstart', (e) => {
            nodeToClone = e.target;
        });

        mainDropper.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

    });

    mainDropper.addEventListener('drop', (e) => {
        e.preventDefault();
        let node = nodeToClone.cloneNode(true);
        let menuOptions = document.createElement('div');
        menuOptions.className = "menu-options";
        menuOptions.innerHTML+= botonHTML;
        node.appendChild(menuOptions);
        mainDropper.appendChild(node);


        let botonEdit = document.querySelectorAll(".menu-options .acciones .boton .editar span");
        botonEdit.forEach(element => {
            element.addEventListener('click', (e) => {
                e.target.findParent
            })
        })

        let botonDelete = document.querySelectorAll(".menu-options .acciones .boton .borrar span");
        botonDelete.forEach(element => {
            element.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
            });
        })
        
    });
    
    

    
}

//InicializadorGlobal

function init() {

    changeTheme(datos.theme.main,datos.theme.claseNight,datos.theme.boton,datos.theme.botonIconNight);

    dragDrop(datos.dragDrop.mainDragger,datos.dragDrop.mainDropper);

    
      
      const descripcion = document.querySelector(".descripcion");
      const mainDragger = getParentNodes(descripcion, "fromulario");
      
      if (mainDragger) {
        console.log("El nodo padre main-dragger ha sido encontrado: ", mainDragger);
      } else {
        console.log("No se ha encontrado un nodo padre main-dragger.");
      }



}






document.addEventListener('DOMContentLoaded', init);





