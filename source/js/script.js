// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import AccentTypographyBuild from './modules/accent-typography-bild.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();


const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
document.addEventListener('DOMContentLoaded', function () {
    let $body = document.querySelector('body');
    $body.classList.add('show-animation');
});

let $socialListBlock = document.querySelector('.social-block__list');
let $socialBlockToggler = document.querySelector('.social-block__toggler');

$socialListBlock.addEventListener('mouseover', function () {
    $socialBlockToggler.classList.add('soc-block-hover');
});

$socialListBlock.addEventListener('mouseout', function () {
    $socialBlockToggler.classList.remove('soc-block-hover');
});

const rulesPageTitleAnimagion = new AccentTypographyBuild(`rules__title`, 500, `active`, `transform`);
//const rulesPageTitleAnimagion2 = new AccentTypographyBuild(`game__title`, 500, `active`, `transform`);
setTimeout(() => {
    rulesPageTitleAnimagion.runAnimation();
}, 500);

window.addEventListener(`popstate`, ()=>{ 
    if(window.location.hash == '#rules'){
        setTimeout(() => {
            rulesPageTitleAnimagion.runAnimation();
        }, 500);
    }else{
       rulesPageTitleAnimagion.destroyAnimation(); 
    }
});

let menuLinks = document.querySelectorAll(`.js-menu-link`);
var pageTitles = document.querySelectorAll(`.page-title`);
 
