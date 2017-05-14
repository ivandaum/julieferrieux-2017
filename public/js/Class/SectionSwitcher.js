class SectionSwitcher {
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
	}

	switchSection(e) {
		this.direction = e.deltaY < 0 ? 'previous' : 'next';

		if(this.flagSwitching) return;

		this.flagSwitching = true;
		this.getActiveSection();

		var nextSection = null;


		if(this.direction == 'previous') {
			if(isDefined(this.sections[this.activeSection.number - 1])) {
				nextSection = this.activeSection.number - 1;
			} else {
				nextSection = this.sections.length - 1;
			}
		} else {
			if(isDefined(this.sections[this.activeSection.number + 1])) {
				nextSection = this.activeSection.number + 1;
			} else {
				nextSection = 0;
			}
		}

		this.hide(this.activeSection.el);
		this.show(this.sections[nextSection],nextSection);
	}

	getActiveSection() {
		var active = document.querySelector('.'+this.className.project + '.'+this.className.active);
		var number = null;
		for(var e=0; e<this.sections.length; e++) {
			var s = this.sections[e];


			if(s == this.activeSection) {
				number = e;
				break;
			}
		}

		this.activeSection = {
			el: active,
			number: number
		}
	}

	hide(el) {
		var menu = document.querySelector('.projects-menu li.'+this.className.active);

		removeClass(menu,this.className.active);
		removeClass(el,this.className.active);
	}

	show(el,nextSection) {
		var _this = this;

		this.activeSection = el;

		var menu = document.querySelectorAll('.projects-menu li')[nextSection];

		addClass(menu,this.className.active);
		addClass(el,this.className.active);

		setTimeout(function() {

			_this.flagSwitching = false;
		},1000);

	}
}