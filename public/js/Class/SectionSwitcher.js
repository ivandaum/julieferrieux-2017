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
		var _this = this;
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
			menu: document.querySelector('.projects-menu-'+ domNumber),
			title: document.querySelector('.project-'+ domNumber)
		}
	}

	animate(c,n) {
		var _this = this;
		var current = this.getSectionElements(c);
		var next = this.getSectionElements(n);

		var timeline = new TimelineMax();
		timeline

			.call(function() {
				new TweenMax.fromTo(current.image,0.5,
					{top:'0%',bottom:'0%',Ease:Quart.easeOut},
					{top:'0%',bottom:'100%',Ease:Quart.easeOut}
				);
				// new TweenMax.fromTo(document.querySelectorAll('.project-image .image-preview')[c],0.5,
				// 	{top:'0%',Ease:Quart.easeOut},
				// 	{top:'-100%' ,Ease:Quart.easeOut}
				// );
			})
			.set(current.image,{zIndex:1})
			.set(next.image,{zIndex:5})
			.call(function() {
				new TweenMax.fromTo(next.image,0.5,
					{top:'100%', bottom:'0%',Ease:Quart.easeOut},
					{top:'0%' ,bottom:'0%',Ease:Quart.easeOut}
				);
				new TweenMax.fromTo(document.querySelectorAll('.project-image .image-preview')[n],0.5,
					{top:'-100%',Ease:Quart.easeOut},
					{top:'0%' ,Ease:Quart.easeOut}
				);
			});

		setTimeout(function() {
			_this.flagSwitching = false;
		},1500);
	}

	showFirst(n) {

		var next = this.getSectionElements(n);
		new TweenMax.set('.project-image',{zIndex:1,top:'100%',bottom:'0%'});
		new TweenMax.fromTo(next.image,0.5,
			{top:'100%', bottom:'0%',Ease:Quart.easeOut},
			{top:'0%' ,bottom:'0%',Ease:Quart.easeOut}
		);
		new TweenMax.fromTo(document.querySelectorAll('.project-image .image-preview')[n],0.5,
			{top:'-100%',Ease:Quart.easeOut},
			{top:'0%' ,Ease:Quart.easeOut}
		);
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