$(function() {

    var resizeTimeout;

    var windowHeight = document.body.clientHeight,
        mobileStartPos = (windowHeight - windowHeight/3),
        featuresSlidesStop = $('.stop-mobile-slide').offset().top,
        imagesRatio = -.34,
        mobileRatio = .45,
        $titleSlide = $('.tt-lead p:last-child'),
        $headerMenu = $('.header-fx-back');

    $(window).bind('scroll', function(e) {
        parallaxScroll();
        menuListener();
    });
    $(window).on('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        startProp();
        parallaxScroll();
      });
    });



    $(document).on('click', '.menu-list .item-hash', function(event) {
        event.preventDefault()
        var myUrl = this.hash;
        goToHashLink(myUrl);
    })

    function goToHashLink (url) {
        $("body").stop().animate({
            scrollTop: $(url).offset().top
        }, "slow");
        return false;
    }


    function menuListener() {
        if (document.body.clientWidth+15 >= 768) {

            var scrolled = $(window).scrollTop(),
                windowHeight = document.body.clientHeight,
                fromBottom = $(document).height() - (scrolled + windowHeight);
            if (fromBottom == 0) {
                $('.item-hash.active').removeClass('active');
                $('.item-hash:last').addClass('active');
            }
            else
            {
                $('.section').each(function (i) {
                    if ($(this).offset().top - 120 <= scrolled) {
                        $headerMenu.removeClass('red');
                        $headerMenu.removeClass('blue');

                    }
                    if ($(this).offset().top + 20 <= scrolled) {
                        $headerMenu.addClass($(this).data('back-color'));
                    }
                    if ($(this).offset().top <= scrolled) {
                        $('.item-hash.active').removeClass('active');
                        $('.item-hash').eq(i).addClass('active');
                    }


                });
            }
        }
    }



    function startProp(){
        if (document.body.clientWidth+15 >= 768) {
            windowHeight = document.body.clientHeight;
            mobileStartPos = (windowHeight - windowHeight/3);
            featuresSlidesStop = $('.stop-mobile-slide').offset().top;
            imagesRatio = -.24;
            mobileRatio = .45;
            var slideHeight = $titleSlide.offset().top + $titleSlide.height();
            if (slideHeight + 90 > mobileStartPos) {
                // console.log(mobileStartPos, $('.mobile-first').height()/2, windowHeight);
                $('#home').height(mobileStartPos + $('.mobile-first').height()/2)
                mobileStartPos = slideHeight + 90
            }


            $('.big-logo').css('top', mobileStartPos - 250 + 'px');
            $('.mobile-features').css('top', mobileStartPos + 'px');

            var a = 0,
                coofPadding = (windowHeight) * imagesRatio;
                // console.log(coofPadding);
            $('.section-background').each(function() {
                a++;

                $(this).css('backgroundPosition', 'center ' + (coofPadding * a + $(this).height()/2 ) + 'px' );
                $(this).data('backPos', coofPadding * a + $(this).height()/2 )
            })
        }
    };


    startProp();

    function parallaxScroll() {
        if (document.body.clientWidth+15 >= 768) {


            var scrolled = $(window).scrollTop(),
                windowHeight = document.body.clientHeight,
                mobileImgHeight = $('.mobile-first').height(),
                centerPos = (windowHeight - mobileImgHeight) / 2;


            // $('.section-background').css('bottom', (0 - (scrolled * .07)) + 'px');
            // $('.section-background').css('top', (0 - (scrolled * -.07)) + 'px');
            $('.big-logo').css('top', (mobileStartPos -250 - (scrolled * 1.5)) + 'px');

            $('.section-background').each(function() {
                $(this).css('backgroundPosition', 'center ' + ($(this).data('backPos') - (scrolled * imagesRatio)) + 'px');
            })
            // $('.section-background').css('backgroundPosition', 'center ' + (120 - (scrolled * -.24)) + 'px');


            if (centerPos < (mobileStartPos - (scrolled * mobileRatio)))  {
                $('.mobile-features').css('position', 'fixed');
                $('.mobile-features').css('top', (mobileStartPos - (scrolled * mobileRatio)) + 'px');
            }
            else if (scrolled >= featuresSlidesStop - windowHeight){
                $('.mobile-features').css('position', 'absolute');
                $('.mobile-features').css('top', centerPos);
            }
            else {
                $('.mobile-features').css('position', 'fixed');
                $('.mobile-features').css('top', centerPos);
            }


        }
    }
});
