// some js helpers

var js = function() {
    var hasClass = function (element, clas) {
        return element.className.match(new RegExp('(\\s|^)'+clas+'(\\s|$)'));
    },

    removeClass = function (element, clas) {
        if (hasClass(element, clas)) {
            var reg = new RegExp('(\\s|^)' + clas + '(\\s|$)');
            element.className=element.className.replace(reg,' ');
        }
    },

    addClass = function (element, clas) {
        if (!hasClass(element, clas)) {
            element.className += ' ' + clas;
        }
    };

    return {
        hasClass: hasClass,
        removeClass: removeClass,
        addClass: addClass
    };
}();

