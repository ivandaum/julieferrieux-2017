class Loader {
	constructor(callback) {
		this.imgLoaded = false;
		this.images = [];
		this.percentLoaded = 0;
		var _this = this;

		this.getImg();

		this.interval = setInterval(function() {
			_this.loadImg();

			if(document.readyState == 'loading') {
				_this.updateLogo(15);
			}

			if(document.readyState == 'interactive') {
				_this.updateLogo(35);
			}


			if(document.readyState == 'complete' && _this.imgLoaded) {
				clearInterval(_this.interval);
				setTimeout(function() {
					callback();

				},1000);
			}

		},50);
	}

	updateLogo(percent) {
		if(percent > this.percentLoaded) {
			this.percentLoaded = percent;
		}

		document.querySelector('.logo-overlay').style.opacity = (this.percentLoaded/100);
	}

	getImg() {
		var img = document.querySelectorAll('img, .image-preview');
		var image = null;

		for(var i=0; i<img.length;i++) {
			if(typeof img[i].dataset.image != 'undefined') {
				image = new Image();
				image.src = img[i].dataset.image;
				this.images.push(image);
			} else if (typeof img[i].src != 'undefined') {
				image = new Image();
				image.src = img[i].src;
				this.images.push(image);
			}
		}
	}

	loadImg() {
		var loaded = 0;

		for(var i=0; i<this.images.length;i++) {

			if(this.images[i].complete == true) {
				loaded++;
			}
		}

		var percent = 50 * (loaded / this.images.length);
		this.updateLogo(50 + percent);

		if(loaded >= this.images.length) {
			this.imgLoaded = true;
		}
	}
}