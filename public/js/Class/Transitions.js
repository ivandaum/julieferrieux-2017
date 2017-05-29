var Transitions = {
	homeToProject: function(number,data) {
		var body = document.querySelector('body');
		if(hasClass(body,'body-home')) {
			addClass(body,'body-single');
			removeClass(body,'body-home');
		}

		var timeline = new TimelineMax({onComplete:function() {

			var $image = document.querySelector('.project-image-' + number );

			document.querySelector('#app').innerHTML = "";
			document.querySelector('#app').appendChild($image);
			document.querySelector('#app').innerHTML  += data.html;
			new Project();
		}});
		timeline
			.staggerFromTo('.project-title-' + number + ' span',0.5,
				{paddingTop:'0px',ease:Quart.easeInOut},
				{paddingTop:'65px',ease:Quart.easeInOut}
				,0.1)
			.fromTo('.project-tags-' + number,0.4,
				{paddingTop:'0px'},
				{paddingTop:'35px'}
			)
			.fromTo('.projects-menu, .projects',0.5,
				{opacity:1},
				{opacity:0}
			);
	}
};