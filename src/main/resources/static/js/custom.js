/*-------------------------------------------------------------------
 --------------------------------------------------------------------*/
var acen = {
    mainPage: function() {
        if (!document.getElementById('fullpage')) return false;
        $('#fullpage').fullpage({
            scrollOverflow: true,
            menu: '#mainMenu',
            css3: true,
            navigation: true,
            showActiveTooltip: true,
            verticalCentered: false,
            normalScrollElements:'#aside, .aside_sub_box'
        });
    },
    gnbPc: function() {
        var gnbBox = $('.gnb_inner');
        var gnbBoxH = 406;
        var speed = 200;
        // 사이트맵 추가
        $('.btn_sitemap').on('click', function() {
            if (gnbBox.height() < gnbBoxH) {
                gnbBox.stop().animate({
                    height: gnbBoxH
                }, speed);
            } else {
                $(this).removeClass('active');
                gnbBox.stop().animate({
                    height:76
                }, speed);
            }
            return false;
        });
    },
    scrollTop: function() {
        var topBtn = $('#topBtn');
        $(window).scroll(function() {
            if($(this).scrollTop() != 0) {
                topBtn.fadeIn('fast');
            } else {
                topBtn.fadeOut('fast');
            }
        });
        topBtn.click(function() {
            $('body,html').animate({
                scrollTop:0
            },400);
            return false;
        });
    },
    toggleBrd: function() {
        $('.toggle_list .head').on('click', function() {
            var thisWrap = $(this).closest('.post');
            var thisInfo = $(this).next('.info');
            var postList = $('.toggle_list > li');
            if(!thisWrap.hasClass('active')) {
                postList.removeClass('active').find('.info').hide();
                thisWrap.addClass('active');
                thisInfo.show();
            } else {
                thisWrap.removeClass('active');
                postList.find('.info').hide();
            }
        });

    },
    layerPopup: function() {
        var popup = $('.layer_pop');
        if (popup.length > 0) {
            $('#wrap').append('<div class="popup_bg"></div>');

        } else {
            return false;
        }
        var popBg = $('.popup_bg');
        var speed = 200;
        $('#agreeChk').on('click', function() {
            if ($(this).prop("checked")) {
                showPop('#popup01');
            }
        });
        $('#wrap').on('click', '.close, .popup_bg', function() {
            hidePop();
        });
        function showPop(box) {
            var popBox = $(box);
            if (popBg.length == 1) {
                popBg.fadeIn(speed);
                popBox.fadeIn(speed);
            }
        }
        function hidePop() {
            popup.fadeOut(speed);
            popBg.fadeOut(speed);
        }
    },
    asideMobile: function() {
        var aside = $('#aside'),
            btn = $('#btnSide'),
            body = $('body'),
            wrap = $('#wrapIndex, #wrap');
        if (aside.length) {
            body.append('<div id="asideBg"></div><button type="button" id="asideClose">닫기</button>');
            var bg = $('#asideBg');
            var closeBtn = $('#asideClose');
            function opened() {
                aside.css('left', '0');
                wrap.addClass('fix');
                bg.addClass('bg_show');
                closeBtn.addClass('close_show');
            }
            function closed() {
                aside.removeAttr('style');
                wrap.removeClass('fix');
                bg.removeClass('bg_show');
                closeBtn.removeClass('close_show');
            }
            btn.on('click', function(e){
                e.preventDefault();
                if (!$(this).hasClass('open')) {
                    opened();
                } else {
                    closed();
                }
            });
            $('#aside_header, .close_show').on('click', function() {
                closed();
            });

            $('#asideBg, #asideClose').on('click', function() {
                closed();
            });
            aside.find('.menu > a').each(function() {
                var menus = aside.find('.menu > a'),
                    subs = aside.find('.aside_sub_box'),
                    myBox = $(this).next('.aside_sub_box'),
                    speed = 200;
                $(this).on('click', function() {
                    if (myBox.css('display') != 'block') {
                        menus.removeClass('active');
                        $(this).addClass('active');
                        subs.slideUp(speed);
                        myBox.slideDown(speed);
                    } else {
                        menus.removeClass('active');
                        subs.slideUp(speed);
                    }
                    return false;
                });
            });
        } else {
            return false;
        }
    },
    subTabMobile: function() {
        $('.sub_menu_box > h2').on('click', function (e) {
            var mySub = $(this).parents('.sub_menu_box').find('.sub_menu_list');
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                mySub.slideUp();
            }
            else {
                $(this).addClass('open');
                mySub.slideDown();
            }
        });
    }
};
$(document).ready(function() {
    acen.mainPage();
    acen.gnbPc();
    acen.scrollTop();
    acen.toggleBrd();
    acen.layerPopup();
    acen.asideMobile();
    acen.subTabMobile();
    newTooltipster();
});

//툴팁메세지
function newTooltipster(f, i, e, c, k, d, a, g) {
    function j() {
        try {
            $(f).tooltipster("destroy")
        } catch (l) {}
    }
    j();
    var b = (k) ? "click" : "custom";
    b = (g) ? "hover" : b;
    $(f).tooltipster({
        trigger: b,
        onlyOne: false,
        position: "top",
        contentAsHTML: true,
        interactive: true,
        theme: (e) ? "tooltipster-default " + e : "tooltipster-default"
    });
    if (i) {
        $(f).tooltipster("content", i)
    }
    if (c) {
        $(f).tooltipster("show")
    }
    if (k) {
        $(f).click(function() {
            $(".tooltipster-base").css("opacity", 0);
            j();
            $(f).off("click")
        })
    } else {
        $(f).on("click")
    }
    if (d > 0) {
        if (destoryTrigger) {
            clearTimeout(destoryTrigger)
        }
        destoryTrigger = setTimeout(function() {
            $(".tooltipster-base").css("opacity", 0);
            j();
            if (a) {
                redirectHandler(null, a)
            }
        }, d)
    }
}
