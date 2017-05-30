class Binder {
	constructor() {

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
				}

				Ajax.get(l,function(data) {
					data = JSON.parse(data);
					if(data.class == 'body-single' && IS_HOME) {
						Transitions.homeToProject(number,data);
					} else if(data.class == 'body-home' && hasClass(body,'body-single')) {
						Transitions.projectToHome(number,data);
					}

					// window.history.pushState({}," ",l)
				});
			});
		}
	}
}