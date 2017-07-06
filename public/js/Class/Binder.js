class Binder {
	constructor() {
		window.onpopstate = function(e) {
			e.preventDefault();
			var url = window.location.href;
			window.location = url;
		};
	}
	menu() {
		this.link('.navigation .ajax-link')
	}
	link(el) {
		var links = document.querySelectorAll(el);

		for(var i=0; i<links.length; i++) {
			links[i].addEventListener('click', function(e) {
				e.preventDefault();
				var l = this.href;
				var number = this.dataset.projectnumber;
				var body = document.querySelector('body');

				if(hasClass(body,'body-home')) {
					Transitions.hideHome(number);
				} else if(hasClass(body,'body-single')) {


					if(hasClass(this,'link-next-project')) {
						var scroll = {top:document.documentElement.scrollTop || document.body.scrollTop};
						new TweenMax.to(scroll,1,{
							top:document.querySelector('body').offsetHeight - window.innerHeight,
							ease:getEase(),
							onUpdate:function() {
								window.scrollTo(0,scroll.top);
							}
						})
					}

					Transitions.hideProject(number);
				}

				Ajax.get(l,function(data) {
					data = JSON.parse(data);
					if(data.class == 'body-single' && IS_HOME) {
						Transitions.homeToProject(number,data);
					} else if(data.class == 'body-home' && !IS_HOME) {
						Transitions.projectToHome(number,data);
					} else if(data.class == 'body-single' && !IS_HOME) {
						Transitions.projectToProject(number,data);
					} else {
						window.location.href = l;
					}
					window.history.pushState({}," ",l)
				});
			});
		}
	}
}
