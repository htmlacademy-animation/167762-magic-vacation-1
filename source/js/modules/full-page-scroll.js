import throttle from 'lodash/throttle';

export default class FullPageScroll {
    constructor() {
        this.THROTTLE_TIMEOUT = 2000;

        this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
        this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
        this.curtain = document.querySelector('.curtain');
        this.activeScreen = 0;
        this.onScrollHandler = this.onScroll.bind(this);
        this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
    }

    init() {
        document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {
            trailing: true
        }));
        window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

        this.onUrlHashChanged();
    }

    onScroll(evt) {
        const currentPosition = this.activeScreen;
        this.reCalculateActiveScreenPosition(evt.deltaY);
        if (currentPosition !== this.activeScreen) {
            this.changePageDisplay();
        }
    }

    onUrlHashChanged() {
        const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
        this.activeScreen = (newIndex < 0) ? 0 : newIndex;
        this.changePageDisplay();
    }

    changePageDisplay() {
        this.changeVisibilityDisplay();
        this.changeActiveMenuItem();
        this.emitChangeDisplayEvent();
    }
    //54
    changeVisibilityDisplay() {
        let arrScreenElements = this.screenElements;
        let activeScreenIndex = this.activeScreen;
        if (this.screenElements[this.activeScreen].classList.contains('screen--prizes')) {
            this.curtain.classList.add('curtain-show');

            setTimeout(function () {
                arrScreenElements.forEach((screen) => { 
                    screen.classList.add(`screen--hidden`);
                    screen.classList.remove(`active`);
                });
                console.log('value2 ' + activeScreenIndex);
                arrScreenElements[activeScreenIndex].classList.remove(`screen--hidden`);
                arrScreenElements[activeScreenIndex].classList.add(`active`);
            }, 1000);
        } else {
            if(this.curtain.classList.contains('curtain-show')){
                this.curtain.classList.remove('curtain-show')
            }
            this.screenElements.forEach((screen) => {
                screen.classList.add(`screen--hidden`);
                screen.classList.remove(`active`);
            });
            this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
            this.screenElements[this.activeScreen].classList.add(`active`);
        }

    }

    changeActiveMenuItem() {
        const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
//        console.log('activeItem ' + activeItem.dataset.href)
        let arrScreenElements = this.screenElements;
        if (activeItem) { 
            if (activeItem.dataset.href === prizes) {
                setTimeout(function () {
                   arrScreenElements.forEach((item) => item.classList.remove(`active`));
                    activeItem.classList.add(`active`);
                }, 1000);
            }else{
                this.menuElements.forEach((item) => item.classList.remove(`active`));
                activeItem.classList.add(`active`);
            }
            
        }
    }

    emitChangeDisplayEvent() {
        const event = new CustomEvent(`screenChanged`, {
            detail: {
                'screenId': this.activeScreen,
                'screenName': this.screenElements[this.activeScreen].id,
                'screenElement': this.screenElements[this.activeScreen]
            }
        });

        document.body.dispatchEvent(event);
    }

    reCalculateActiveScreenPosition(delta) {
        if (delta > 0) {
            this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
        } else {
            this.activeScreen = Math.max(0, --this.activeScreen);
        }
    }
}
