/**
 * Created by dgospodinov on 08.12.2016.
 */
var sex = null,
    list = null,
    sex_elem = null,
    list_elem = null,
    slider_line = null,
    slider = null;

var img_m = document.getElementById('img_m');
var img_w = document.getElementById('img_w');

var product = document.getElementById('product');

function Menu(options) {
    var elem = options.elem;

    elem.onclick = function(event) {
        if (event.target.closest('.gender')) {
            if(!sex_elem) {
                sex_elem = event.target.closest('.gender');
                sex_elem.classList.add('active')
            } else {
                sex_elem.classList.remove('active');
                sex_elem = event.target.closest('.gender');
                sex_elem.classList.add('active')
            }
            sex = sex_elem.getAttribute('data-link');
            if (sex == "women") {
                img_m.style.display = "none";
                img_w.style.display = "block";
            } else if (sex == "man"){
                img_w.style.display = "none";
                img_m.style.display = "block";
            }
            document.getElementById('text_h1').innerHTML = sex_elem.getAttribute('data-caption');
            showProduct(sex, list);
        } else if (event.target.closest('.list-nmbr')) {
            if(!list_elem) {
                list_elem = event.target.closest('.list-nmbr');
                list_elem.classList.add('active')
            } else {
                list_elem.classList.remove('active');
                list_elem = event.target.closest('.list-nmbr');
                list_elem.classList.add('active')
            }
            document.getElementById('text_h2').innerHTML = list_elem.getAttribute('data-caption');
            list = list_elem.getAttribute('data-link');
            showProduct(sex, list);
        }
    };

    elem.onmousedown = function() {
        return false;
    };

    function showProduct(sex, list) {
        if (sex && list) {
            var attr = sex + "-" + list;
            slider_line = document.querySelector('.slider__line[data-items=' + attr + ']');
            slider_line.classList.add('active');
            product.classList.add('show');

            slider = new Slider({
                elem: document.getElementById('slider')
            });
        } else {
            return false
        }
    }
}

function ReturnBtt(options) {
    var elem = options.elem;

    elem.onclick = function () {
        list_elem.classList.remove('active');
        list_elem = null;
        list = null;
        product.classList.remove('show');
        slider_line.classList.remove('active');
        slider_line = null;
        slider = null;
    }
}

function Slider(options) {
    var elem = options.elem;

    var line = elem.querySelector('.active');

    var step = 155;
    var line_width = step*(line.querySelectorAll('.slider__item').length - 3);
    var line_scroll = 0;

    var a = line.querySelectorAll('.slider__item').length*step;

    line.style.width = '' + a + "px";

    elem.onclick = function(event) {
        if (event.target.closest('.slider__arrow--left')) {
            moveLeft();
        } else if (event.target.closest('.slider__arrow--right')) {
            moveRight();
        }
    };

    elem.onmousedown = function() {
        return false;
    };

    function moveLeft() {
        if (line_scroll >= 0) {
            return false;
        } else {
            line_scroll+=step;
            moveTo(line_scroll);
        }
    }

    function moveRight() {
        if (line_scroll <= -line_width) {
            return false;
        } else {
            line_scroll-=step;
            moveTo(line_scroll);
        }
    }
    
    function moveTo(line_scroll) {
        line.style.left = line_scroll + 'px';
    }
}

var return_btt = new ReturnBtt({
    elem: document.getElementsByClassName('back-btt')[0]
});

var menu = new Menu({
    elem: document.getElementById('menu')
});

