var Transitions = {
	hideHome: function(number) {
		CONTROLLER.unbind();
		var body = document.querySelector('body');

		if(hasClass(body,'body-home')) {
			addClass(body,'body-single');
			removeClass(body,'body-home');
		}

		var timeline = new TimelineMax();
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
	},

	hideProject: function(number) {
		var timeline = new TimelineMax({onComplete:function() {

			setTimeout(function() {
				var body = document.querySelector('body');
				if(hasClass(body,'body-single')) {
					removeClass(body,'body-single');
				}
			},1000);
		}});
		timeline
			.call(function() {
				new TweenMax.fromTo('.project-image',1,{height:'100vh'},{height:'0vh'});
				new TweenMax.staggerFromTo('h1 span',1,
					{paddingTop:'0px',ease:Quart.easeInOut},
					{paddingTop:'80px',ease:Quart.easeInOut}
					,0.1);

				new TweenMax.fromTo('.title .number',1, {opacity:1},{opacity:0});
				var images = document.querySelectorAll('.content-image');
				for(var a=0; a<images.length; a++) {
					if(typeof images != 'undefined') {
						addClass(images[a],'hide');
					}
				}
			})
			.call(function() {
				$nextButton = document.querySelector('.next-project-background');
				if($nextButton) {
					addClass($nextButton,'hide');
					new TweenMax.to('.next-project-background',0.5,{width:'0',ease:Quart.easeInOut})
					new TweenMax.staggerTo('.next-project p',0.5,{opacity:0},0.2)
				}
			});
	},

	homeToProject: function(number,data) {
		IS_HOME = false;
		setTimeout(function() {
			var $image = document.querySelector('.project-image-' + number );

			document.querySelector('#app').innerHTML = "";
			document.querySelector('#app').appendChild($image);
			document.querySelector('#app').innerHTML  += data.html;

			new Loader(function() {
				CONTROLLER = new Project();
			});
		},1000);
	},
	projectToProject: function(number,data) {
		setTimeout(function() {
			var background = document.querySelector('.next-project').style.backgroundImage;

			var $projectImage = document.createElement('div');
			$projectImage.className = 'project-image';
			$img = document.createElement('div');
			$img.style.backgroundImage = background;
			$img.className = 'image-preview';

			$projectImage.appendChild($img);
			window.scrollTo(0,0);
			document.querySelector('#app').innerHTML = "";
			document.querySelector('#app').appendChild($projectImage);
			setTimeout(function() {
				document.querySelector('#app').innerHTML  += data.html;
				new Loader(function() {
					addClass(document.querySelector('body'),'body-single')
					CONTROLLER = new Project();
				});
			},500);

		},1000);
	},
	projectToHome: function(number,data) {
		setTimeout(function() {
			document.querySelector('.loader').style.opacity = 1;
		},500);

		setTimeout(function() {
			var body = document.querySelector('body');
			if(hasClass(body,'body-single')) {
				removeClass(body,'body-single');
			}

			addClass(body,'body-home');

			document.querySelector('#app').innerHTML = data.html;
			new Loader(function() {
				CONTROLLER = new Home();
			});
		},1000);
	}
};