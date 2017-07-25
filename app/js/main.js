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