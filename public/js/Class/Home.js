class Home {
	constructor() {
		IS_HOME = true;
		var _this = this;
		this.activeSection = null;
		this.direction = null;
		this.className = {
			project:'project',
			active:'active'
		};


		var binder = new Binder();
		binder.link('#app .ajax-link');
		this.sections = document.querySelectorAll('.'+this.className.project);
		this.preload(function() {
			document.querySelector('.loader').style.opacity = 0;
			_this.flagSwitching = false;

			document.addEventListener('mousewheel', _this.switchSection)

			_this.activeSection = 0;
			_this.showFirst(_this.activeSection);
		});

	}
	unbind() {
		document.removeEventListener("mousewheel",CONTROLLER.switchSection);
	}
	switchSection(e) {
		var _this = CONTROLLER;

		if(!IS_HOME) return;

		_this.direction = e.deltaY < 0 ? 'previous' : 'next';

		if(_this.flagSwitching) return;

		_this.flagSwitching = true;
		var nextSection = null;

		if(_this.direction == 'previous') {
			if(isDefined(_this.sections[_this.activeSection - 1])) {
				nextSection = _this.activeSection - 1;
			} else {
				nextSection = _this.sections.length - 1;
			}
		} else {
			if(isDefined(_this.sections[_this.activeSection + 1])) {
				nextSection = _this.activeSection + 1;
			} else {
				nextSection = 0;
			}
		}

		_this.animate(_this.activeSection,nextSection);
		_this.activeSection = nextSection;
	}

	getSectionElements(number) {
		var domNumber = number + 1;

		return {
			image: document.querySelector('.project-image-' + domNumber),
			imageBackground: document.querySelector('.project-image-' + domNumber + ' .image-preview')
		}
	}

	animate(c,n) {
		var _this = this;
		var current = this.getSectionElements(c);
		var next = this.getSectionElements(n);

		c++;
		n++;

		addClass(document.querySelector('.project-menu-' + n),this.className.active);
		removeClass(document.querySelector('.project-menu-' + c),this.className.active);

		if(_this.direction == 'previous') {
			new TweenMax.set(next.image,{zIndex:2,top:'0%',bottom:'0%'});
			new TweenMax.set(current.image,{zIndex:5});

			_this.slideImageDown(current);
		} else {
			new TweenMax.set(current.image,{zIndex:2});
			new TweenMax.set(next.image,{zIndex:5});

			_this.slideImageUp(next);
		}

		this.moveDot(n);
		this.slideTextUp(c);
		this.slideTextDown(n);
		this.slideTagsUp(n);
		this.slideTagsDown(c);

		setTimeout(function() {
			_this.flagSwitching = false;
			new TweenMax.set('.project-image',{zIndex:1});
			new TweenMax.set('.project-image .image-preview',{transform:'scale(1)'});
			new TweenMax.set(next.image,{zIndex:5});
		},1500);

		removeClass(document.querySelector('.project-' + c),this.className.active);
		addClass(document.querySelector('.project-' + n),this.className.active);
	}

	showFirst(n) {
		var next = this.getSectionElements(n);

		n++;
		new TweenMax.set(next.image,{zIndex:5});

		this.slideTextDown(n);
		this.slideImageUp(next);
		this.slideTagsUp(n);
	}

	slideImageUp(el) {
		new TweenMax.fromTo(el.image,0.7,
			{top:'100%', bottom:'0%',ease:Quart.easeInOut},
			{top:'0%' ,bottom:'0%',ease:Quart.easeInOut}
		);
	}
	slideImageDown(el) {
		new TweenMax.fromTo(el.image,0.7,
			{top:'0', bottom:'0%',ease:Quart.easeInOut},
			{top:'100%' ,bottom:'0%',ease:Quart.easeInOut}
		);
	}

	slideTextDown(n) {
		new TweenMax.staggerFromTo('.project-title-' + n + ' span',0.5,
			{paddingTop:'65px',ease:Quart.easeInOut},
			{paddingTop:'0',ease:Quart.easeInOut}
		,0.1);
	}
	slideTextUp(n) {
		new TweenMax.staggerFromTo('.project-title-' + n + ' span',0.5,
			{paddingTop:'0',ease:Quart.easeInOut},
			{paddingTop:'65px',ease:Quart.easeInOut}
		,0.1);
	}

	slideTagsDown(c) {
		new TweenMax.fromTo('.project-tags-' + c,0.4,
			{paddingTop:'0px'},
			{paddingTop:'35px'}
		);
	}

	slideTagsUp(c) {
		new TweenMax.fromTo('.project-tags-' + c,0.4,
			{paddingTop:'35px'},
			{paddingTop:'0px'}
		);
	}

	moveDot(n) {
		var top = document.querySelector('.project-menu-' + n).offsetTop;
		var $dot = document.querySelector('.project-menu-position');
		var timeline = new TimelineMax();

		if(this.activeSection > (top/20)-1) {
			timeline
				.set($dot,{height:'20px'})
				.to($dot,0.5,{top:top})
				.set($dot,{height:'10px'});

		} else {
			timeline
				.set($dot,{height:'20px'})
				.to($dot,0.4,{top:top-10})
				.call(function() {
					new TweenMax.set($dot,{height:'10px'});
					new TweenMax.to($dot,0.3,{top:top});
				})
		}

	}

	preload(callback) {
		var tl = new TimelineLite({onComplete: callback});
		tl
			.fromTo(document.querySelectorAll('.project-image'),1,
				{top:'0%' ,bottom:'0%',ease:Quart.easeInOut},
				{top:'100%', bottom:'0%',ease:Quart.easeInOut}
			)
	}
}
