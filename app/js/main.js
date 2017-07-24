
var searchBox = $('.search-box'), searchBtn = $('a.btn-search');


searchBtn.click(function () {
    $(this).hide();
    searchBox.addClass('active');
    return false;
});
$(document).click(function () {
    searchBtn.show();
    searchBox.removeClass('active');
});
searchBox.click(function (evt) {
    evt.stopPropagation();
});
