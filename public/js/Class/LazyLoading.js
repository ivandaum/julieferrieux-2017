class LazyLoading {
	constructor(container) {
		this.container = container;
		this.img = document.querySelectorAll(container + ' img');
		this.offsetTop = window.innerHeight/4;
		// this.bind()
	}

	bind() {
		var _this = this;

		for(var a=0; a < this.img.length; a++) {
			var img = this.img[a];
			img.style.opacity = 0;
		}

		document.addEventListener('mousewheel', function(e) {
			_this.fadeImg();
		});
	}

	fadeImg() {
		var top = window.pageYOffset;
		var img = null;

		for(var a=0; a<this.img.length; a++) {
			img = this.img[a];

			if(img.offsetTop <= top - this.offsetTop) {
				img.style.opacity = 1;
			}
		}


	}
}