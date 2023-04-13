
window.onscroll = function () {
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
        document.getElementById('navbar').classList.add("nav-colored");
        document.getElementById('navbar-mobile').classList.add("nav-colored");
    }
    else {
        document.getElementById('navbar').classList.remove("nav-colored");
        document.getElementById('navbar-mobile').classList.remove("nav-colored");
    }
};