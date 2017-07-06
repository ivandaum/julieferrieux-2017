class LazyLoading {
	constructor(container) {
		this.container = container;
		this.img = document.querySelectorAll(container + ' img');
		this.offsetTop = window.innerHeight - (window.innerHeight/2);

		if(window.innerWidth > 1000) {
			this.bind()
		}
	}

	bind() {
		var _this = this;

		for(var a=0; a < this.img.length; a++) {
			var img = this.img[a];
			img.style.opacity = 0;
		}

		window.addEventListener('scroll',function() {
			_this.fadeImg();
		});
		// document.addEventListener('mousewheel', function(e) {
		// 	_this.fadeImg();
		// });
		// document.addEventListener('wheel', function(e) {
		// 	_this.fadeImg();
		// });
	}

	fadeImg() {
		var top = window.pageYOffset;
		var img = null;

		for(var a=0; a<this.img.length; a++) {
			img = this.img[a];

			if(hasClass(img,'faded')) continue;

			if(img.getBoundingClientRect().top <= this.offsetTop) {
				img.style.opacity = 1;
				new TweenMax.fromTo(img,1,{transform:'translate(0,150px)'},{transform:'translate(0,0px)'});
				addClass(img,'faded')
			}
		}


	}
}