class Binder {
	constructor() {
		this.link();
	}

	link() {
		var links = document.querySelectorAll('.ajax-link');

		for(var i=0; i<links.length; i++) {
			links[i].addEventListener('click', function(e) {
				e.preventDefault();
				var l = this.href;
				var number = this.dataset.projectnumber;
				var body = document.querySelector('body');

				Ajax.get(l,function(data) {
					data = JSON.parse(data);
					if(data.class == 'body-single' && hasClass(body,'body-home')) {
						Transitions.homeToProject(number,data);
					} else if(data.class == 'body-home') {

					}

					window.history.pushState({}," ",l)
				});
			});
		}
	}
}