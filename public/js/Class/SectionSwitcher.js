class HomeSwitcher {
	constructor() {
		var _this = this;
		this.activeSection = null;
		this.direction = null;
		this.className = {
			project:'project',
			active:'active'
		};

		this.sections = document.querySelectorAll('.'+this.className.project);
		this.flagSwitching = false;

		document.addEventListener('mousewheel', function(e) {
			_this.switchSection(e);
		});

		document.addEventListener('mousemove', function(e) {
			_this.animatePlan(e);
		});

		this.activeSection = 0;
		this.showFirst(this.activeSection);

	}

	switchSection(e) {
		this.direction = e.deltaY < 0 ? 'previous' : 'next';

		if(this.flagSwitching) return;

		this.flagSwitching = true;
		var nextSection = null;

		if(this.direction == 'previous') {
			if(isDefined(this.sections[this.activeSection - 1])) {
				nextSection = this.activeSection - 1;
			} else {
				nextSection = this.sections.length - 1;
			}
		} else {
			if(isDefined(this.sections[this.activeSection + 1])) {
				nextSection = this.activeSection + 1;
			} else {
				nextSection = 0;
			}
		}

		this.animate(this.activeSection,nextSection);
		this.activeSection = nextSection;
	}

	getSectionElements(number) {
		var domNumber = number + 1;

		return {
			image: document.querySelector('.project-image-' + domNumber),
			realImage: document.querySelector('.project-image-' + domNumber + ' .image-preview'),
			menu: document.querySelector('.projects-menu-'+ domNumber),
			title: document.querySelector('.project-'+ domNumber)
		}
	}

	animate(c,n) {
		var _this = this;
		var current = this.getSectionElements(c);
		var next = this.getSectionElements(n);

		c++;
		n++;

		if(_this.direction == 'previous') {
			new TweenMax.set(current.image,{zIndex:2});
			new TweenMax.set(next.image,{zIndex:5});

			_this.slideUp(next,n);

		} else {
			new TweenMax.set(next.image,{zIndex:2,top:'0%',bottom:'0%'});
			new TweenMax.set(current.image,{zIndex:5});
			new TweenMax.set(next.realImage,{zIndex:5,top:'0'});

			_this.slideDown(current,c);

		}

		_this.slideUpText(current,c);
		_this.slideDownText(next,n);

		setTimeout(function() {
			_this.flagSwitching = false;
			new TweenMax.set('.project-image',{zIndex:1});
			new TweenMax.set(next.image,{zIndex:5});
		},1500);
	}

	showFirst(n) {

		var next = this.getSectionElements(n);
		new TweenMax.set('.project-image',{zIndex:1,top:'100%',bottom:'0%'});

		n++;

		this.slideDownText(next,n);
		this.slideUp(next,n);
	}

	slideUp(el,number) {
		new TweenMax.fromTo(el.realImage,0.7,
			{top:'-100vh',ease:Quart.easeInOut},
			{top:'0' ,ease:Quart.easeInOut}
		);

		new TweenMax.fromTo(el.image,0.7,
			{top:'100%', bottom:'0%',ease:Quart.easeInOut},
			{top:'0%' ,bottom:'0%',ease:Quart.easeInOut}
		);
	}
	slideDown(el,number) {
		new TweenMax.fromTo(el.realImage,0.7,
			{top:'0',ease:Quart.easeInOut},
			{top:'-100vh' ,ease:Quart.easeInOut}
		);

		new TweenMax.fromTo(el.image,0.7,
			{top:'0', bottom:'0%',ease:Quart.easeInOut},
			{top:'100%' ,bottom:'0%',ease:Quart.easeInOut}
		);
	}

	slideDownText(el,n) {
		new TweenMax.staggerFromTo('.project-title-' + n + ' span',0.5,
			{paddingTop:'65px',ease:Quart.easeInOut},
			{paddingTop:'0',ease:Quart.easeInOut}
		,0.1);
	}
	slideUpText(el,n) {
		new TweenMax.staggerFromTo('.project-title-' + n + ' span',0.5,
			{paddingTop:'0',ease:Quart.easeInOut},
			{paddingTop:'65px',ease:Quart.easeInOut}
		,0.1);
	}

	animatePlan(e) {
		return;

		var els = this.getSectionElements(this.activeSection);

		var center = {
			h: window.innerHeight/2,
			w: window.innerWidth/2
		};

		var pos = {
			x:e.clientX,
			y:e.clientY
		};

		var m = {
			x:( pos.x - center.w),
			y:( pos.y - center.h)
		};

		m.x /= center.w;
		m.y /= center.h;

		m.x *= 5;
		m.y *= 5;

		els.image.style.transform = 'skewx('+m.x+'deg) skewy('+m.y+'deg)'; //;
	}
}