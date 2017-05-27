class Project {
	constructor() {
		document.querySelector('.loader').style.opacity = 0;
		new LazyLoading('.single-content');
	}
}
