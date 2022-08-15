class Carousel {
    constructor(p) {
        const settings = {...{interval: 1000, containerID: '#carousel', slideID: '.slide', isPlaying: true},...p}

        this.container = document.querySelector(settings.containerID);
        this.slideItems = this.container.querySelectorAll(settings.slideID);
        this.isPlaying = settings.isPlaying;
        this.interval = settings.interval;
    }

    _initProps() {
        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
            
        
        this.SLIDES_COUNT = this.slideItems.length;
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_SPACE = 'Space';
        this.STRPAUSE = '<span class="control control-pause" id="pause-btn"><i class="fas fa-pause-circle"></i></span>';
        this.STRPLAY = '<span class="control control-pause" id="pause-btn"><i class="fas fa-play-circle"></i></span>';
        this.STRPREV = '<span class="control control-prev" id="prev-btn"><i class="fas fa-chevron-circle-left"></i></span>';
        this.STRNEXT = '<span class="control control-next" id="next-btn"><i class="fas fa-chevron-circle-right"></i></span>';
        this.PAUSEICON = '<i class="fas fa-pause-circle"></i>';
        this.PLAYICON = '<i class="fas fa-play-circle"></i>';
        
        this.currentSlide = 0;
    }


    _initControls() {
        const controls = document.createElement('div')
        const PAUSE = this.isPlaying? this.STRPAUSE : this.STRPLAY;
        const PREV = this.STRPREV;
        const NEXT = this.STRNEXT;

        controls.innerHTML = PREV + PAUSE + NEXT;
        controls.setAttribute('class', 'controls');

        this.container.append(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
    }

    _initIndicators() {
        const indicators = document.createElement('div');

        indicators.setAttribute('class', 'indicators');

        for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
            const indicator = document.createElement('div');
            const indicatorCircle = document.createElement('i');

            indicator.setAttribute('class', 'indicator');
            indicatorCircle.setAttribute('class', 'far fa-circle');
            indicatorCircle.dataset.slideTo = `${i}`;
            i === 0 && indicator.classList.add('active');
            indicator.append(indicatorCircle);
            indicators.append(indicator);
        }
        this.container.append(indicators);
        this.indContainer = this.container.querySelector('.indicators');
        this.indicators = this.indContainer.querySelectorAll('.indicator');
    }

    _gotoNth(n) {
        this.slideItems[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slideItems[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    }

    _gotoPrev() {
        this._gotoNth(this.currentSlide - 1);
    }
    
    _gotoNext() {
        this._gotoNth(this.currentSlide + 1);
    }
        
    _pause() {
        if (this.isPlaying) {
        clearInterval(this.timerID);
        this.pauseBtn.innerHTML = this.PLAYICON;
        this.isPlaying = false;
        }
    }
        
    _play() {
        if (!this.isPlaying){
            this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
            this.pauseBtn.innerHTML = this.PAUSEICON;
            this.isPlaying = true;
        }
    }

    pausePlay() {
        this.isPlaying ? this._pause() : this._play();
    }
        
        
    prev() {
        this._gotoPrev()
        this._pause();
    }
        
    next() {
        this._gotoNext();
        this._pause();
    }
        
    _indicate(e) {
        const target = e.target;
        console.log(target);
        if (target && target.classList.contains('fa-circle')) {
            this._pause();
            this._gotoNth(+target.dataset.slideTo);
        }
    }
        
    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    }
        
    _initListeners() {
        document.addEventListener('keydown', this._pressKey.bind(this));
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this._indicate.bind(this));
    }
    
    init() {
        this. _initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();

        if (this.isPlaying) this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
    }
}

export default Carousel;