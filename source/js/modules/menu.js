export default () => {
    let header = document.querySelector(`.js-header`);
    let menuToggler = document.querySelector(`.js-menu-toggler`);
    let menuLinks = document.querySelectorAll(`.js-menu-link`);
    
    

    

    if (menuToggler) {
        menuToggler.addEventListener(`click`, function () {
            if (header.classList.contains(`page-header--menu-opened`)) {
                header.classList.remove(`page-header--menu-opened`);
                document.body.classList.remove(`menu-opened`);
            } else {
                header.classList.add(`page-header--menu-opened`);
                document.body.classList.add(`menu-opened`);
            }
        });
    }

    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener(`click`, function (event) {
 
//            console.log(menuLinks[i].getAttribute('href'));
            
            if (menuLinks[i].getAttribute('href') === '#prizes') {
                event.preventDefault();
                let curtain = document.querySelector('.curtain');
                curtain.classList.add('curtain-show');
                console.log(curtain)
                let currentURL = menuLinks[i].href;
                setTimeout(function () {
                     window.location = menuLinks[i].href;
                }, 400);

            }
            if (window.innerWidth < 1025) {
                header.classList.remove(`page-header--menu-opened`);
                document.body.classList.remove(`menu-opened`);
            }
        });
    }
};
 