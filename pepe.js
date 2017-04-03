(function() {
    var cont = $('.container'),
        cont_w = $('.container__wrap'),
        arr_right = $('.nav-arrow__right'),
        arr_left = $('.nav-arrow__left');
    var left = 0;

    var cont_w_width = 3063;
    var view_cont = cont_w_width - cont.outerWidth();
    var step = Math.ceil(view_cont/9);
    var right_block_arrow_width = view_cont - step + 1;

    $( window ).resize(function() {
        view_cont = cont_w_width - cont.outerWidth();
        right_block_arrow_width = view_cont - step;
        step = Math.floor(view_cont/9);
    });

    cont.on('mouseenter', function () {
      if (!cont.hasClass('show')) {
        cont.addClass('show');
        arr_right.addClass('show');
        arr_right.attr('data-control', 'wrap');
        arr_left.attr('data-control', 'wrap');
        setTimeout(function () {
            $('.shadow__tooltip').fadeIn();
        }, 800);
      } return false;
    });

    arr_right.on('click', function () {
        var data = $(this).data('control');
        if( data === 'wrap') {
            if (0 >= left >= -view_cont) {
                left -= step;
                cont_w.animate({'left': left + 'px'});

                if (left < -right_block_arrow_width-1) {
                    $(this).removeClass('show');
                }
            }

            if (left <= 0 && !arr_left.hasClass('show')) {
                arr_left.addClass('show');
            }
        } else if ( data === 'solo') {
            $('.wear-box[data-tog=' + nmbr + ']').fadeOut();
            (nmbr == 9) ? nmbr = 1 : nmbr++;
            $('.wear-box[data-tog=' + nmbr + ']').fadeIn();
        }
    });
    arr_left.on('click', function () {
        var data = $(this).data('control');
        if( data === 'wrap') {
            if (0 >= left >= -view_cont) {
                left += step;
                cont_w.animate({'left': left + 'px'});

                if (left > -step) {
                    $(this).removeClass('show');
                }
            }

            if (left <= -right_block_arrow_width+1 && !arr_right.hasClass('show')) {
                arr_right.addClass('show');
            }
        } else if ( data === 'solo' ) {
            $('.wear-box[data-tog=' + nmbr + ']').fadeOut();
            (nmbr == 1) ? nmbr = 9 : nmbr--;
            $('.wear-box[data-tog=' + nmbr + ']').fadeIn();
        }
    });

    var nmbr = null;

    $('.box__bag img').on('click', function () {
        nmbr = this.dataset.nmbr;
        $('.container__solo').fadeIn();
        $('.wear-box[data-tog=' + nmbr + ']').addClass('visible');
        if (!arr_right.hasClass('show')) {arr_right.addClass('show');}
        if (!arr_left.hasClass('show')) {arr_left.addClass('show');}
        arr_right.attr('data-control', 'solo').data('control', 'solo');
        arr_left.attr('data-control', 'solo').data('control', 'solo');
    });
})();
