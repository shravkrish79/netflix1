// var size = 200;
// var margin = 50;
// var count = 13;
// var visible = 4; // Visible carousel slides (excluding the barely)
// var last = count - visible; // 3
// var offset = 0;
// var carousel = (size * visible) + (margin * visible) + (size / 3);
// var container = (size * count) + (margin * count);
// var barely = size / visible;


// var $container = 'content-cards';
// var $slides = '.carousel__box';
// var $left = '.leftbutton';
// var $right = '.rightbutton';
// var $previous = null;
// var $next = null;

// var enter = null;
// var close = null;

export function moveCardRight(idx, slide) {
    var btnId = 'rightbutton' + idx;
    var containerId = 'contentcards-' + idx;
    var margin = 10;
    var size = 1000;
    var count = document.getElementById(containerId).childNodes;
    var visible = 4;
    var last = count - visible;
    var offset = 0;
    var card = (size * visible) + (margin * visible) + (size / 3);
    var container = (size * count) + (margin * count);
    var offsetWidth = document.getElementById(containerId).offsetWidth;
    
    console.log(containerId);
    console.log(count);
    if (offset === count - visible) return;
    
    ++offset;
    var translateX =
        (offset === last)
            ? -(container - card - margin)
            : -((size * offset) + (margin * offset) - slide);
    console.log(translateX)
    console.log(offsetWidth)
    if ((slide*-1)>((margin*count*(Math.floor(count/visible)))+offsetWidth)) return;
    if ((offsetWidth) < translateX*-1 ){ translateX=translateX+(translateX+offsetWidth);}
    document.getElementById(containerId).style.transform = 'translateX(' + translateX + 'px)';
    document.getElementById(btnId).style.right = translateX + 'px';
    return translateX;
}