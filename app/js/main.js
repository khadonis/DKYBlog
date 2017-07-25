var searchBox = $('.search-box'), searchBtn = $('a.btn-search'), menuBtn = $('.menu-toggle'), navMenu = $('.nav-menu'), menuClose = $('.btn-close');

searchBtn.click(function () {
    $(this).hide();
    searchBox.addClass('active');
    return false;
});
$(document).click(function () {
    searchBtn.show();
    searchBox.removeClass('active');
    navMenu.removeClass('active');
});
function clickStop(div) {
    div.click(function (evt) {
        evt.stopPropagation();
    });
};
clickStop(navMenu);
clickStop(searchBox);
menuBtn.click(function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    navMenu.addClass('active');
});
menuClose.click(function () {
    navMenu.removeClass('active');
});

//sliders
var slideThumb = $('.nb-img'), slideTitle = $('.ng-txt'), mainSlide = $('.main-swiper-container .swiper-slide'), slideBtnTxt = $('.nb-txt'), indexX, slideImg, slideImgtitle;



function slideBtnNextAct(index) {
    slideImg = mainSlide.eq(index).find('img').attr('src');
    slideImgtitle = mainSlide.eq(index).find('img').attr('alt');
    slideThumb.css('background-image', 'url(' + slideImg + ')');
    slideBtnTxt.empty().text(slideImgtitle);
}
slideBtnNextAct(1);


var mainSwiper = new Swiper('.main-swiper-container', {
    slidesPerView: 'auto',
   // loopedSlides: 1,
    //loop: true,
    centeredSlides: true,
    nextButton: '.main-swiper-button-next',
    prevButton: '.main-swiper-button-prev',
    autoplay: 4000,
    runCallbacksOnInit: true,

    onSlideChangeStart: function () {
        indexX = mainSwiper.realIndex + 1;
        slideBtnNextAct(indexX);
        if (slideImg == '' || slideImg == undefined) {
            slideThumb.width(0);
            slideThumb.css('min-width', '0');
        } else {
            slideThumb.width('auto');
            slideThumb.css('min-width', '150px');
        }
        if (slideImgtitle == '' || slideImgtitle == undefined) {
            slideBtnTxt.css('padding', '0');
        } else {
            slideBtnTxt.css('padding', '30px');
        }
    }

});
var newsSwiper = new Swiper('.news-swiper-container', {
    paginationClickable: true,
    nextButton: '.news-swiper-button-next',
    prevButton: '.news-swiper-button-prev',
    direction: 'vertical',
    autoplay: 4000
});

