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


var instagramRef;
$('.box-item.social-menu').each(function () {
    var facebookLink = 'http://www.facebook.com/sharer.php?u=' + sayfaLinki;
    var twitterLink = 'https://twitter.com/share?url=' + sayfaLinki;
    var googleLink = 'https://plus.google.com/share?url=' + sayfaLinki;
    instagramRef = $(this).siblings().eq(1).find('h2').text();
    var tr = new Array("ı", "ş", "ç", "ü", "ö", "ğ", "İ", "Ş", "Ç", "Ü", "Ö", "Ğ");
    var en = new Array("i", "s", "c", "u", "o", "g", "I", "S", "C", "U", "O", "G");
    for (var i = 0; i < tr.length; i++) {
        instagramRef = instagramRef.replace(new RegExp(tr[i], "g"), en[i]);
    }
    instagramRef = instagramRef.replace(/\s/g, '_');
    instagramRef = instagramRef.replace(/\W+/g, '');
    var instagramLink = 'https://www.instagram.com/dkyinsaat/?ref=' + instagramRef;
    var youtubeLink = 'https://www.youtube.com/dkyinsaat/?ref=' + instagramRef;
    $(this).find('.fa-facebook').parent().attr('href', facebookLink);
    $(this).find('.fa-twitter').parent().attr('href', twitterLink);
    $(this).find('.fa-google-plus').parent().attr('href', googleLink);
    $(this).find('.fa-instagram').parent().attr('href', instagramLink);
    $(this).find('.fa-youtube').parent().attr('href', youtubeLink);
});

//instagram feed
/* (function () { var e; e = function () { function e(e, t) { var n, r; this.options = { target: "instafeed", get: "popular", resolution: "thumbnail", sortBy: "none", links: !0, mock: !1, useHttp: !1 }; if (typeof e == "object") for (n in e) r = e[n], this.options[n] = r; this.context = t != null ? t : this, this.unique = this._genKey() } return e.prototype.hasNext = function () { return typeof this.context.nextUrl == "string" && this.context.nextUrl.length > 0 }, e.prototype.next = function () { return this.hasNext() ? this.run(this.context.nextUrl) : !1 }, e.prototype.run = function (t) { var n, r, i; if (typeof this.options.clientId != "string" && typeof this.options.accessToken != "string") throw new Error("Missing clientId or accessToken."); if (typeof this.options.accessToken != "string" && typeof this.options.clientId != "string") throw new Error("Missing clientId or accessToken."); return this.options.before != null && typeof this.options.before == "function" && this.options.before.call(this), typeof document != "undefined" && document !== null && (i = document.createElement("script"), i.id = "instafeed-fetcher", i.src = t || this._buildUrl(), n = document.getElementsByTagName("head"), n[0].appendChild(i), r = "instafeedCache" + this.unique, window[r] = new e(this.options, this), window[r].unique = this.unique), !0 }, e.prototype.parse = function (e) { var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D; if (typeof e != "object") { if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "Invalid JSON data"), !1; throw new Error("Invalid JSON response") } if (e.meta.code !== 200) { if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, e.meta.error_message), !1; throw new Error("Error from Instagram: " + e.meta.error_message) } if (e.data.length === 0) { if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "No images were returned from Instagram"), !1; throw new Error("No images were returned from Instagram") } this.options.success != null && typeof this.options.success == "function" && this.options.success.call(this, e), this.context.nextUrl = "", e.pagination != null && (this.context.nextUrl = e.pagination.next_url); if (this.options.sortBy !== "none") { this.options.sortBy === "random" ? M = ["", "random"] : M = this.options.sortBy.split("-"), O = M[0] === "least" ? !0 : !1; switch (M[1]) { case "random": e.data.sort(function () { return .5 - Math.random() }); break; case "recent": e.data = this._sortBy(e.data, "created_time", O); break; case "liked": e.data = this._sortBy(e.data, "likes.count", O); break; case "commented": e.data = this._sortBy(e.data, "comments.count", O); break; default: throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.") } } if (typeof document != "undefined" && document !== null && this.options.mock === !1) { m = e.data, A = parseInt(this.options.limit, 10), this.options.limit != null && m.length > A && (m = m.slice(0, A)), u = document.createDocumentFragment(), this.options.filter != null && typeof this.options.filter == "function" && (m = this._filter(m, this.options.filter)); if (this.options.template != null && typeof this.options.template == "string") { f = "", d = "", w = "", D = document.createElement("div"); for (c = 0, N = m.length; c < N; c++) { h = m[c], p = h.images[this.options.resolution]; if (typeof p != "object") throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o); E = p.width, y = p.height, b = "square", E > y && (b = "landscape"), E < y && (b = "portrait"), v = p.url, l = window.location.protocol.indexOf("http") >= 0, l && !this.options.useHttp && (v = v.replace(/https?:\/\//, "//")), d = this._makeTemplate(this.options.template, { model: h, id: h.id, link: h.link, type: h.type, image: v, width: E, height: y, orientation: b, caption: this._getObjectProperty(h, "caption.text"), likes: h.likes.count, comments: h.comments.count, location: this._getObjectProperty(h, "location.name") }), f += d } D.innerHTML = f, i = [], r = 0, n = D.childNodes.length; while (r < n) i.push(D.childNodes[r]), r += 1; for (x = 0, C = i.length; x < C; x++)L = i[x], u.appendChild(L) } else for (T = 0, k = m.length; T < k; T++) { h = m[T], g = document.createElement("img"), p = h.images[this.options.resolution]; if (typeof p != "object") throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o); v = p.url, l = window.location.protocol.indexOf("http") >= 0, l && !this.options.useHttp && (v = v.replace(/https?:\/\//, "//")), g.src = v, this.options.links === !0 ? (t = document.createElement("a"), t.href = h.link, t.appendChild(g), u.appendChild(t)) : u.appendChild(g) } _ = this.options.target, typeof _ == "string" && (_ = document.getElementById(_)); if (_ == null) throw o = 'No element with id="' + this.options.target + '" on page.', new Error(o); _.appendChild(u), a = document.getElementsByTagName("head")[0], a.removeChild(document.getElementById("instafeed-fetcher")), S = "instafeedCache" + this.unique, window[S] = void 0; try { delete window[S] } catch (P) { s = P } } return this.options.after != null && typeof this.options.after == "function" && this.options.after.call(this), !0 }, e.prototype._buildUrl = function () { var e, t, n; e = "https://api.instagram.com/v1"; switch (this.options.get) { case "popular": t = "media/popular"; break; case "tagged": if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option."); t = "tags/" + this.options.tagName + "/media/recent"; break; case "location": if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option."); t = "locations/" + this.options.locationId + "/media/recent"; break; case "user": if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option."); t = "users/" + this.options.userId + "/media/recent"; break; default: throw new Error("Invalid option for get: '" + this.options.get + "'.") }return n = e + "/" + t, this.options.accessToken != null ? n += "?access_token=" + this.options.accessToken : n += "?client_id=" + this.options.clientId, this.options.limit != null && (n += "&count=" + this.options.limit), n += "&callback=instafeedCache" + this.unique + ".parse", n }, e.prototype._genKey = function () { var e; return e = function () { return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1) }, "" + e() + e() + e() + e() }, e.prototype._makeTemplate = function (e, t) { var n, r, i, s, o; r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, n = e; while (r.test(n)) s = n.match(r)[1], o = (i = this._getObjectProperty(t, s)) != null ? i : "", n = n.replace(r, function () { return "" + o }); return n }, e.prototype._getObjectProperty = function (e, t) { var n, r; t = t.replace(/\[(\w+)\]/g, ".$1"), r = t.split("."); while (r.length) { n = r.shift(); if (!(e != null && n in e)) return null; e = e[n] } return e }, e.prototype._sortBy = function (e, t, n) { var r; return r = function (e, r) { var i, s; return i = this._getObjectProperty(e, t), s = this._getObjectProperty(r, t), n ? i > s ? 1 : -1 : i < s ? 1 : -1 }, e.sort(r.bind(this)), e }, e.prototype._filter = function (e, t) { var n, r, i, s, o; n = [], r = function (e) { if (t(e)) return n.push(e) }; for (i = 0, o = e.length; i < o; i++)s = e[i], r(s); return n }, e }(), function (e, t) { return typeof define == "function" && define.amd ? define([], t) : typeof module == "object" && module.exports ? module.exports = t() : e.Instafeed = t() }(this, function () { return e }) }).call(this);
var feed = new Instafeed({
    get: 'tagged',
    tagName: 'awesome',
    userID:'610631495',
    clientId: '836d5c42c9d9457b8637c574f40cfe83',
    template: '<a href="{{link}}"><img src="{{image}}" /></a>'
});
feed.run(); */