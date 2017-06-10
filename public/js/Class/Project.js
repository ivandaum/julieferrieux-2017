class Project {
	constructor() {
		IS_HOME = false;
		var binder = new Binder();
		binder.link('#app .ajax-link');
		document.querySelector('.loader').style.opacity = 0;
		document.querySelector('.logo-overflow').style.height = '100%';

		new LazyLoading('.single-content');

		new TweenMax.staggerFromTo('h1 span',1,
			{paddingTop:'100px',ease:Quart.easeInOut},
			{paddingTop:'0px',ease:Quart.easeInOut}
			,0.1);

		new TweenMax.fromTo('.title .number',1, {opacity:0},{opacity:1});

		new TweenMax.fromTo('.project-tags',0.4,
			{paddingTop:'35px'},
			{paddingTop:'0px'}
		);
		new TweenMax.fromTo('.project-intro',0.4,
			{opacity:'0'},
			{opacity:'1'}
		);

		if(document.querySelector('.next-project')) {
			document.querySelector('.next-project a').addEventListener('mouseenter',function(e) {
				var $background = document.querySelector('.next-project-background');
				var color = $background.dataset.nextcolor;

				new TweenMax.to($background,0.5,{backgroundColor:color,ease:Quart.easeInOut});
				addClass($background,'show-next');
			});

			document.querySelector('.next-project a').addEventListener('mouseleave',function(e) {
				var $background = document.querySelector('.next-project-background');
				var color = $background.dataset.currentcolor;

				new TweenMax.to($background,0.5,{backgroundColor:color,ease:Quart.easeInOut});
				removeClass($background,'show-next');

			});
		}

		var sliders = document.querySelectorAll('.slider');

		for(var a=0; a<sliders.length; a++) {
			new Flickity(sliders[a],{
				prevNextButtons: false,
				cellSelector: '.content-image',
				wrapAround: true
			});
		}
	}
}
