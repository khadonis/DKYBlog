/*! Main Script */
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
    if (index < mainSlide.length) {
        slideImg = mainSlide.eq(index).find('img').attr('src');
        slideImgtitle = mainSlide.eq(index).find('img').attr('alt');
        slideThumb.css('background-image', 'url(' + slideImg + ')');
        slideBtnTxt.empty().text(slideImgtitle);
    }
}
slideBtnNextAct(1);


var mainSwiper = new Swiper('.main-swiper-container', {
    slidesPerView: 'auto',
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
    },
    breakpoint: {
        slidesPerView: 1
        //centeredSlides: false
    }

});
var newsSwiper = new Swiper('.news-swiper-container', {
    paginationClickable: true,
    nextButton: '.news-swiper-button-next',
    prevButton: '.news-swiper-button-prev',
    direction: 'vertical',
    autoplay: 4000
});

// Sosyal paylaşım linkleri
var sayfaLinki = window.location.href;

var latin = new Array("s", "S", "c", "C", "g", "G", "u", "U", "i", "I");
var turkce = new Array("ş", "Ş", "ç", "Ç", "ğ", "Ğ", "ü", "Ü", "ı", "İ");

//instagramRef = instagramRef.replace(new RegExp(turkce), latin);

$('.box-item.social-menu').each(function () {
    var facebookLink = 'http://www.facebook.com/sharer.php?u=' + sayfaLinki;
    var twitterLink = 'https://twitter.com/share?url=' + sayfaLinki;
    var googleLink = 'https://plus.google.com/share?url=' + sayfaLinki;
    var instagramRef = $(this).siblings().eq(1).find('h2').text();
    instagramRef = turkce.replace(/\s/g, '_');
    for (var i = 0; i < instagramRef.length; i++) {
        instagramRef = instagramRef.replace(new RegExp(turkce[i]), latin[i]);
    }
    var instagramLink = 'https://www.instagram.com/dkyinsaat/?ref=' + instagramRef;
    var youtubeLink = 'https://www.youtube.com/dkyinsaat/?ref=badge';
    $(this).find('.fa-facebook').parent().attr('href', facebookLink);
    $(this).find('.fa-twitter').parent().attr('href', twitterLink);
    $(this).find('.fa-google-plus').parent().attr('href', googleLink);
    $(this).find('.fa-instagram').parent().attr('href', instagramLink);
    $(this).find('.fa-youtube').parent().attr('href', youtubeLink);
});