class Loader {
	constructor(callback) {
		this.imgLoaded = false;
		this.images = [];

		var _this = this;

		this.getImg();

		this.interval = setInterval(function() {

			_this.loadImg();

			if(document.readyState == 'loading') {
				// 25
			}

			if(document.readyState == 'interactive') {
				// 50
			}


			if(document.readyState == 'complete' && _this.imgLoaded) {
				callback();
				clearInterval(_this.interval);
			}

		},50);
	}

	getImg() {
		var img = document.querySelectorAll('img, .image-preview');

		for(var i=0; i<img.length;i++) {
			if(typeof img[i].dataset.image != 'undefined') {
				var image = new Image();

				image.src = img[i].dataset.image;
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

		if(loaded >= this.images.length) {
			this.imgLoaded = true;
		}
	}
}