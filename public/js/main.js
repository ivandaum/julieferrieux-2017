var background = '#000';
var padding = 3;
console.log('%cPortfolio made with ☕️ by Ivan Daum', 'padding:' + padding +'px; background: ' + background + '; color: #fff');
console.log('%chttp://ivandaum.fr', 'padding:' + padding +'px; background: ' + background + '; color: #fff');
console.log('%chttp://twitter.com/ivndn', 'padding:' + padding +'px; background: ' + background + '; color: #fff');
console.log('');

function contactClick(e) {
	var $el = document.querySelector('.contact');
	e.preventDefault();

	if(hasClass($el,'active')) {
		removeClass($el,'active');
	} else {
		addClass($el,'active');
	}
}
document.querySelector('.nav-about').addEventListener('click', contactClick);
document.querySelector('.close-contact').addEventListener('click', contactClick);

new Loader(function() {
	if(document.querySelector('.home')) {
		setTimeout(function() {
			new HomeSwitcher();
		},200);
	} else {
		setTimeout(function() {
			new Project();
		},200);
	}
});
