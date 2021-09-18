import Carousel from "./carousel.js";
class SwipeCarousel extends Carousel {
    _swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    }

    _swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX; 
        this.swipeStartX - this.swipeEndX < -100 && this.prev();
        this.swipeStartX - this.swipeEndX > 100 && this.next();
    }

    _initListeners() {
        super._initListeners();
        this.container.addEventListener('touchstart', this.swipeStart);
        this.container.addEventListener('touchend', this.swipeEnd);
    }
}

export default SwipeCarousel; 