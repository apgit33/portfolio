window.addEventListener('scroll', function() {

    // -- Menu --
    // ---------------
    //Ajout de la classe nav-bg quand au moins 100 pixel de scroll
    let navBar = document.querySelector('nav')
    if (document.querySelector('html').scrollTop > 100) {
        navBar.classList.add('nav-bg')
    }else {
        navBar.classList.remove('nav-bg')
    }

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

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach( e => {
        e.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = e.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          e.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
});

window.onload = () => {
    // Ecouteur d'évènement sur scroll
    window.addEventListener("scroll", () => {

    })
}

particlesJS("particles-js", 
    {
        "particles":
        {
            "number":{"value":40,"density":{"enable":true,"value_area":800}},
            "color":{"value":"#123a0f"},
            "shape":{"type":"circle"},
            "opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},
            "size":{"value":10,"random":true,"anim":{"enable":false,"speed":16.78214379899786,"size_min":0.1,"sync":false}},
            "line_linked":{"enable":true,"distance":166.6902811231592,"color":"#ffffff","opacity":1,"width":1.5},
            "move":
            {
                "enable":true,"speed":5,"direction":"none","random":false,
                "straight":false,"out_mode":"out","bounce":false,
                "attract":{"enable":false,"rotateX":4750.673012010037,"rotateY":4167.25702807898}
            }
        },
        "interactivity":
        {
            "detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":true,"mode":"remove"},"resize":true},"modes":{"grab":{"distance":190.03378378378363,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":143.58108108108098,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}
        },
        "retina_detect":true});
