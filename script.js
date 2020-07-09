
window.addEventListener('scroll', function(e) {
    const doc = document.querySelector('html')
    const navBar = document.querySelector('nav')
    if (doc.scrollTop > 100) {
        navBar.classList.add('nav-bg')
    }else {
        navBar.classList.remove('nav-bg')
    }
});