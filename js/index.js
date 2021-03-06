jQuery.fn.fade = function(status, duration=400) {
    return status ? this.fadeIn(duration) : this.fadeOut(duration);
};

function checkSideNav() {
    $('.sidenav')
        .css("top", $('#content').offset().top)
        .css("left", $('#content').offset().left + $('#content').width() - 1)
        .show();
}

function checkSticky() {
    let sticky = $(window).scrollTop() >= $('.nav').offset().top;
    $('.nav, .progress, #backToTop').toggleClass("sticky", sticky);

    let h = document.documentElement, b = document.body;
    let scroll = (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight) * 100;
    $(".progress-bar").css("width", `${scroll}%`);
}

function windowScrollTo(pos=0) {
    window.scrollTo({
        top: pos,
        left: 0,
        behavior: 'smooth'
    });
}

$(document).ready(() => {
    checkSideNav();
    checkSticky();
    $(window).resize(checkSideNav).scroll(checkSticky);

    $('.nav-link, #backToTop').click(windowScrollTo);

    $('.nav-link').on('shown.bs.tab', function(e) {
        $('.sidenav > .tab-pane').removeClass('show active');

        let target = $(e.target).attr('href');
        $(target + "SideNav").addClass('show active');
    });

    $('.sidenav .list-group-item').click(function(e) {
        e.preventDefault();

        let url = $(this).attr('href');
        windowScrollTo($(`a[name=${url.substring(1)}]`).offset().top - $('.nav-tabs').height());
    });

    $('.double-content').mouseenter(function() {
        $(this).toggleClass("fadeInDown fadeOutUp");
        $(this).siblings('.double-alt').toggleClass("fadeOutDown fadeInUp");
    });
    $('.double').mouseleave(function() {
        $(this).children('.double-content').removeClass("fadeOutUp").addClass("fadeInDown");
        $(this).children('.double-alt').removeClass("fadeInUp").addClass("fadeOutDown");
    });
    $('.double').trigger("mouseleave");

    $('.preview').click(function() {
        let src = $(this).attr("src");
        bootbox.dialog({
            message: `<img src=${src}>`,
            onEscape: true,
            backdrop: true,
            closeButton: false
        });
    });

    $("body").on("click", ".bootbox", () => bootbox.hideAll());

    $('[title]').tooltip({
        container: 'body',
        placement: 'bottom'
    });

    $("#backgroundNote").hover(() => $("#background").toggleClass("reveal"));

    var stars = $('body');
    var numStars = 25 + 50 * Math.random();
    for(let i = 0; i < numStars; i++){
        let scale = 0.5 + Math.random();
        let x = Math.random() * 100, y = Math.random() * 100;

        let star = $("<div/>");
        star.addClass("star").css({
            left: `${x}%`,
            top: `${y}%`,
            transform: `scale(${scale})`
        });

        stars.append(star);
    }

    var coolObjs = $(".avatar, .avatar-shadow, .double, .star, body");
    var enteredAvater = false;
    $('.avatar')
        .on('animationiteration', () => {
            if (!enteredAvater) {
                coolObjs.removeClass("cool");
            }
        })
        .hover(
            () => {
                enteredAvater = true;
                coolObjs.addClass("cool");
            },
            () => enteredAvater = false
        );
});
