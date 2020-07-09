
window.addEventListener('scroll', function(e) {
    let doc = document.querySelector('html')
    let navBar = document.querySelector('nav')
    if (doc.scrollTop > 100) {
        navBar.classList.add('nav-bg')
    }else {
        navBar.classList.remove('nav-bg')
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});