
// -- Menu --
// ---------------
//Ajout de la classe nav-bg quand au moins 100 pixel de scroll
function changeMenu() {
    let navBar = document.querySelector('nav')
    if (window.scrollY > 100) {
        navBar.classList.add('nav-bg')
    }else {
        navBar.classList.remove('nav-bg')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    changeMenu();
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach( e => {
        e.addEventListener('click', () => {
          e.classList.toggle('is-active');
          getTarget(e);
        });
      });
    }
});

//Toggle the class is-active of the target attribute from e
function getTarget(e) {
    // Get the target from the "data-target" attribute
    const target = e.dataset.target;
    const $target = document.getElementById(target);
    $target.classList.toggle('is-active');
}

const modals = document.getElementsByClassName('view');
for (let modal of modals) {
    modal.addEventListener('click', function(e) {
        e.preventDefault();
        getTarget(this);
    });
}
const closeModals = document.getElementsByClassName('delete');
for (let modal of closeModals) {
    modal.addEventListener('click', function() {
        getTarget(this);
    });
}

const closeModals2 = document.getElementsByClassName('closeModal');
for (let modal1 of closeModals2) {
    modal1.addEventListener('click', function() {
        getTarget(this);
    });
}

particlesJS("particles-js", 
    {
        "particles":
        {
            "number":{"value":40,"density":{"enable":true,"value_area":800}},
            "color":{"value":"#123a0f"},
            "shape":{"type":"circle"},
            "opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},
            "size":{"value":7.5,"random":true,"anim":{"enable":true,"speed":5,"size_min":0.1,"sync":false}},
            "line_linked":{"enable":true,"distance":166.6902811231592,"color":"#ffffff","opacity":0.4,"width":1},
            "move":
            {
                "enable":true,"speed":2,"direction":"none","random":false,
                "straight":false,"out_mode":"out","bounce":false,
                "attract":{"enable":false,"rotateX":4750.673012010037,"rotateY":4167.25702807898}
            }
        },
        "interactivity":
        {
            "detect_on":"canvas",
            "events":
            {
                "onhover":{"enable":true,"mode":"grab"},
                "onclick":{"enable":true,"mode":"remove"},
                "resize":true
            },
            "modes":
            {
                "grab":{"distance":190.03378378378363,"line_linked":{"opacity":0.2}},
                "bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},
                "repulse":{"distance":143.58108108108098,"duration":0.4},
                "push":{"particles_nb":4},
                "remove":{"particles_nb":10}
            }
        },
        "retina_detect":true});

function createField($name) {
    let champ = document.createElement("p");
    champ.innerHTML = $name;
    return champ;
}
const loading = document.getElementById("loading");
const loaded = document.getElementById("loaded");

const form = document.getElementById("form-contact");
form.addEventListener("submit",
    e => {
        e.preventDefault();
        loading.style.display = 'block';
        loaded.style.display = 'none';

        const formData = new FormData(form);
        document.getElementById("er_first_name").innerHTML = "";
        document.getElementById("er_last_name").innerHTML = "";
        document.getElementById("er_email").innerHTML = "";
        document.getElementById("er_sujet").innerHTML="";
        document.getElementById("er_message").innerHTML="";
        document.getElementById("send_email").innerHTML="";
        fetch('treatment/contact.php', {
            body: formData,
            method: "POST"
        })
        .then(response => response.json())
        .then(datas => {
            if(datas.validation==true) {
                loaded.style.display = 'block';
                form.style.display = 'none';

                location.href='#contact';
                form.reset();
                datas.erreurs.forEach((data) => {
                    if(data.mail) {
                        document.getElementById("send_email").appendChild(createField(data.mail));
                    }
                });
            }
            datas.erreurs.forEach((data) => {
                loading.style.display = 'none';
                loaded.style.display = 'block';

                if(data.nom) {
                    document.getElementById("er_first_name").appendChild(createField(data.nom));
                }
                if(data.prenom) {
                    document.getElementById("er_last_name").appendChild(createField(data.prenom));
                }
                if(data.email) {
                    document.getElementById("er_email").appendChild(createField(data.email));
                }
                if(data.sujet) {
                    document.getElementById("er_sujet").appendChild(createField(data.sujet));
                }
                if(data.message) {
                    document.getElementById("er_message").appendChild(createField(data.message));
                }
            });
        });
    });


// Initialize and add the map
function initMap() {
    var home = {lat: 47.2468811, lng: 5.9959248};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: home});
   //Positionne le marker
    var marker = new google.maps.Marker({position: home, map: map});
}










//Gestion de la classe is-active pour les élément  de la navbar
const navItems = document.getElementById('navigation').firstElementChild.children,
    navSections = new Array(navItems.length);
    
for (i = 0; i < navItems.length; i++)
    navSections[i] = document.getElementById(navItems[i].dataset.target);
const menuBarHeight = document.getElementById('navigation').offsetHeight;
console.log(menuBarHeight);
function isVisible(ele) {
    const r = ele.getBoundingClientRect();
    const h = (window.innerHeight || document.documentElement.clientHeight);
    const w = (window.innerWidth || document.documentElement.clientWidth);
    return (r.top <= h) && 
        (r.top + r.height - menuBarHeight >= 0) && 
        (r.left <= h) && 
        (r.left + r.width >= 0);
}
function activateIfVisible() {
    for (b = true, i = 0; i < navItems.length; i++) {
        if (b && isVisible(navSections[i])) {
            navItems[i].classList.add('is-active');
            b = false;
        } else 
            navItems[i].classList.remove('is-active');
    }
}
var isTicking = null;

window.addEventListener('scroll', () => {
    // -- Barre de progression --
    // ---------------
    // Calcul de la hauteur "utile" du document
    let hauteur = document.documentElement.scrollHeight - window.innerHeight
    // Récupération de la position verticale
    let position = window.scrollY
    // Récupération de la largeur de la fenêtre
    let largeur = document.documentElement.clientWidth
    // Calcul de la largeur de la barre
    let barre = position / hauteur * largeur
    // Modification du CSS de la barre
    document.getElementById("progress").style.width = barre+"px"

    // -- Barre de Menu --
    changeMenu();

    if (!isTicking) {
        window.requestAnimationFrame(() => {
            activateIfVisible();
            isTicking = false;
        });
        isTicking = true;
    }
}, false);

//smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});