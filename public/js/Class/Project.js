class Project {
	constructor() {
		IS_HOME = false;
		var binder = new Binder();
		binder.link('#app .ajax-link');
		document.querySelector('.loader').style.opacity = 0;
		new LazyLoading('.single-content');

		new TweenMax.staggerFromTo('h1 span',1,
			{paddingTop:'80px',ease:Quart.easeInOut},
			{paddingTop:'0px',ease:Quart.easeInOut}
			,0.1);

		new TweenMax.fromTo('.title .number',1, {opacity:0},{opacity:1});

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
}
