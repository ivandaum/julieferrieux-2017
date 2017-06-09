function foreach(array,callback) {
    for(var i=0; i<array.length; i++) {
        callback(array[i],i);
    }
}
function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className=el.className.replace(reg, ' ')
    }
}

function getEase() {
    return CustomEase.create("custom", "M0,0 C0.168,0.012 0.393,0.16 0.442,0.282 0.512,0.456 0.5,1 1,1");
}

function isDefined(el) {

    return typeof el != 'undefined' && typeof el !== null;
}