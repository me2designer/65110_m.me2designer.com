var ProjectPage = 0;


$(function(){/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    /* 사이트 준비중 안내 */
    if(isReal) LAYER('developing');



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 메인 비주얼 */
    const $wrap = $('#visual');

    // swiper
    let $swiper = $wrap.find('.swiper-container');
    let slide_length = $swiper.find('.swiper-slide').length;
    let $progress = $wrap.find('.progress_bar');
    let swiper = new Swiper($swiper, {
        autoplay: {
            delay: 4000,
            disableOnInteraction : false,
        },
        speed: 1500,
        slidesPerView: 1,
        loop: true,
        loopedSlides: slide_length,
        effect: 'fade',
        lazy: true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        navigation: {
            nextEl: $wrap.find('.swiper-button-next'),
            prevEl: $wrap.find('.swiper-button-prev')
        },
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true
        },
        on : {
            slideChangeTransitionStart: function() {
                $progress.removeClass('is-active');
            },
            slideChangeTransitionEnd: function() {
                $progress.addClass('is-active');
            },
        },
    });

    // videoLayer
    if (isReal) {
        $wrap.find('.videoLayer').on('click', function() {
            LAYER({
                name : 'alert',
                text : '현재 제작 중 입니다.'
            })
        });
    } else {
        $wrap.find('.videoLayer').videoLayer()
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 성장과정 */
    let $wrap = $('#profile');

    // swiper
    var $swiper = $wrap.find('.swiper-container');
    var swiper = new Swiper($swiper, {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction : false,
        // },
        speed: 1000,
        slidesPerView: 1,
        loop: true,
        loopedSlides: $swiper.find('.swiper-slide').length,
        navigation: {
            nextEl: $wrap.find('.swiper-button-next'),
            prevEl: $wrap.find('.swiper-button-prev')
        },
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true
        },
        on : {
            slideChangeTransitionStart: function(){
                // animate counter
                $wrap.attr('data-swiper-slide', this.realIndex);

                var $this = $swiper.find('.swiper-slide[data-swiper-slide-index="'+this.realIndex+'"]');
                var $num = $this.find('.count').get();
                var $mark = $this.find('.desc mark').removeClass('is-textMark');

                var Y = true
                $num.forEach(function(each){
                    var $each = $(each);
                    var _countNum = $each.text();

                    var endNumber = '';
                    for (var i = 0; i < _countNum.length; i++){
                        endNumber = endNumber + '9'
                    }

                    $each.stop().animateNumber({
                        addComma : false,
                        addZero : 2,
                        totalPlayTime : 800,
                        endNumber : endNumber,
                        endValue : _countNum,
                        callback : function(){
                            if (Y) $mark.addClass('is-textMark');
                            Y = false;
                        }
                    });
                });
            },
        },
    });

    // 나이계산기
    // var today = new Date();
    // var birthDate = new Date(1983, 2, 1);
    // var age = today.getFullYear() - birthDate.getFullYear() + 1;

    // $wrap.find('.age').text(age);



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 프로젝트 */
    let $wrap = $('#project');
    let $list = $wrap.find('.list_project');
    let item_copied = $list.find('.item_project').detach();
    let $btnMore = $wrap.find('.btn_more');

    getList(SERVER.public+'/json/project.json', function(infoList) {
        // 태그(tag) 불러오기
        (function() {
            // tag 배열 합치기
            let concat_tag = [];
            filterList(infoList, function(info){
                concat_tag = concat_tag.concat(info.corp, info.tag, info.workRole);
            });

            // tag 중복된 배열 제거
            let filter_tag = concat_tag.filter(function(info, idx){
                return concat_tag.indexOf(info) === idx;
            }).sort(function(a, b){
                return ( a < b ) ? -1 : ( a == b ) ? 0 : 1; //가나다 순 정렬
            });

            // append
            let $list = $wrap.find('.list_tag');
            let $btn_copied = $list.find('.btn_tag').detach();

            filter_tag.forEach(function(info) {
                let $btn_clone = $btn_copied.clone();
                $btn_clone.html('<span>'+info+'</span>');
                if (info == '퍼블리싱') $btn_clone.addClass('fw-bold');
                $btn_clone.appendTo($list);
            });

            // click event
            $list.find('.btn_tag').on('click', function(){
                if ($(this).hasClass('on')) return; //중복클릭 방지

                $(this).addClass('on').siblings().removeClass('on');

                // list 초기화
                ProjectPage = 0;
                $wrap.find('.item_project').remove();
                if ($list.find('.btn_tag.on').length) $wrap.find('.btn_more').trigger('click');
            });
        })();

        //목록 불러오기
        function appendList(list, idx) {
            let list_divi = list.arrDivision(4);

            // append
            list_divi[idx].forEach(function(each) {
                let $item_clone = item_copied.clone();

                // $item_clone click()
                $item_clone.on('click', function(e) {
                    if ($(e.target).is('a, button') || $(e.target).hasClass('link_more')) return;

                    $(this).toggleClass('item_project-active')
                });

                // .inner_default
                $item_clone.find('.inner_default .box_thumb').css({
                    'background-image' : 'url('+SERVER.images+'/portfolio/project_thumb/'+each.thumb+'), url('+SERVER.images+'/portfolio/project_thumb/onerror.png)'
                });
                $item_clone.find('.inner_default .tit').text(each.title);
                $item_clone.find('.inner_default .desc').append('<span>'+each.description+'</span>');

                for (let i = 0; i < each.tag.length && i < 5; i++) {
                    $item_clone.find('.inner_default .tag').append('<span>'+each.tag[i]+'</span>');
                }

                // .inner_overlay
                $item_clone.find('.inner_overlay .tit').text(each.title);
                $item_clone.find('.inner_overlay .desc').text(each.workDesc);
                $item_clone.find('.inner_overlay .role').text(String(each.workRole).replace(/,/gi,', '));
                $item_clone.find('.inner_overlay .work').text(each.workDate);
                $item_clone.find('.inner_overlay .rate').text(each.workRate);

                // .inner_overlay - .list_more
                let $listMore = $item_clone.find('.inner_overlay .list_more');

                if (each.more) {
                    if (each.more.link) $listMore.find('.link_more').css('display', 'inline-flex').attr('href',each.more.link);
                    if (each.more.image) {
                        let $btnImg = $listMore.find('.btn_image').css('display', 'inline-flex');

                        $btnImg.on('click', function() {
                            LAYER({
                                name : 'projectImage',
                                afterLoad : function(){
                                    let $layer = $('#projectImage_wrap');
                                    let $swiper = $layer.find('.swiper-container');
                                    let slide_copied = $swiper.find('.swiper-slide').detach();

                                    // scroll 방지
                                    $layer.on('scroll touchmove mousewheel', function(e){
                                        e.preventDefault();
                                        e.stopPropagation();
                                        return false;
                                    });

                                    // slide_clone
                                    function runSwiper(callback) {
                                        for (let i = 1; i <= each.more.image.count; i++) {
                                            let $slide_clone = slide_copied.clone();

                                            $slide_clone.attr('data-background', ''+SERVER.images+'/portfolio/project_image/'+each.more.image.folder+'/'+i+'.jpg');
                                            $slide_clone.appendTo($swiper.find('.swiper-wrapper'));

                                        }
                                        setTimeout(() => { //swiper 비동기 오류 개선
                                            callback();
                                        }, 100);
                                    }

                                    // swiper()
                                    runSwiper(function() {
                                        let swiper = new Swiper($swiper, {
                                            lazy: true,
                                            lazy: {
                                                loadPrevNext: false,
                                                loadOnTransitionStart: true
                                            },
                                            keyboard: {
                                                enabled: true,
                                            },
                                            navigation: {
                                                nextEl: $layer.find('.swiper-button-next'),
                                                prevEl: $layer.find('.swiper-button-prev')
                                            },
                                            pagination: {
                                                el: $layer.find('.swiper-pagination'),
                                                type: 'fraction'
                                            },
                                        });
                                        if (each.more.image.count <= 1) $layer.find('.swiper-button-next, .swiper-button-prev, .swiper-pagination').remove();
                                    });
                                },
                            });
                        });
                    }
                    if (each.more.video) {
                        let $btnVideo = $listMore.find('.btn_video').css('display', 'inline-flex');

                        $btnVideo.attr({
                            'data-title' : each.title,
                            'data-src' : each.more.video.src,
                            'data-type' : each.more.video.type,
                        });

                        $btnVideo.videoLayer();
                    }
                }
                $item_clone.appendTo($list);
            });

            // lineClamp()
            $list.find('.inner_default .desc span').lineClamp(2);

            // matchPath()
            $list.find('[data-images-path]').matchPath();

            // button hide()
            if (idx >= list_divi.length - 1) $btnMore.hide();
            else $btnMore.show();
        }

        // .btn_more click event
        $btnMore.on('click', function() {
            // 1. 선택된 태그의 keyword 저장
            let tag = [];
            let get_tag = $wrap.find('.list_tag .btn_tag.on').get();

            get_tag.forEach(function(info){
                let text = $(info).find('span').text();
                text = text.replace(/\(/g,'&#40;').replace(/\)/g,'&#41;');
                tag.push(text);
            });

            // 2. 선택된 태그가 포함된 item
            let activeList = []
            let patt = new RegExp(tag.join('|'));

            infoList.forEach(function(each, idx){
                let combineText = each.corp+','+each.workRole.join(',')+','+each.tag.join(',');
                combineText = combineText.replace(/\(/g,'&#40;').replace(/\)/g,'&#41;');

                if (patt.test(combineText)) activeList.push(each);
            });

            // 3.화면생성
            appendList(activeList, ProjectPage)
            ProjectPage++
        });

        // 처음 불러오기
        let keyword = ['피플라이프', '취업뽀개기', '경향신문', '한국경제매거진', '전북은행'];

        keyword.forEach(function(each, idx, arr){
            let $this = $wrap.find('.list_tag :contains("'+each+'")').closest('.btn_tag');

            $this.addClass('on');

            if (idx === arr.length - 1) {
                $btnMore.trigger('click');
                $wrap.find('.list_tag').addClass('is-reset');
            }
        });
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 사용자 편의성 - DOM 생성 */
    var $wrap = $('#device');
    var swiperType = ['pc', 'tablet', 'mobile']
    var listThumb = [
        'peoplelife.co.kr',
        'bohumclinic.com_otc',
        'bohumclinic.com_fa',
        'campus.coachjob.net',
        'motijob.co.kr',
        'vnet.go.kr',
        'sports.khan.co.kr_olympic'
    ]
    var $swiper = $wrap.find('.swiper-container');
    var swiper_copied = $swiper.detach();

    swiperType.forEach(function(type){
        var $swiper_clone = swiper_copied.clone();
        $swiper_clone.addClass('swiper-'+type+'');

        var slide_copied = $swiper_clone.find('.swiper-slide').detach();
        listThumb.forEach(function(fileName){
            var $slide_clone = slide_copied.clone()
            $slide_clone.find('.slide-inner').attr('data-background', ''+SERVER.images+'/portfolio/device_thumb/'+type+'/'+fileName+'.jpg');
            $slide_clone.prependTo($swiper_clone.find('.swiper-wrapper'));
        });
        $swiper_clone.prependTo($wrap.find('.inner'));
    });


    // IOS 배경이미지 위치고정
    if (DEVICE.detail == "ios") {
        scrollAction({
            target: $wrap,
            top: 100,
            scrollDownAction : function(){
                // 스크롤 DOWN 액션
                $wrap.find('.bg').removeClass('d-none');
            },
            scrollUpAction : function(){
                // 스크롤 DOWN 액션
                $wrap.find('.bg').addClass('d-none');
            },
        });

        scrollAction({
            target: $('#professional'),
            top: 0,
            scrollDownAction : function(){
                // 스크롤 DOWN 액션
                $wrap.find('.bg').addClass('d-none');
            },
            scrollUpAction : function(){
                // 스크롤 DOWN 액션
                $wrap.find('.bg').removeClass('d-none');
            },
        });
    }


})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 사용자 편의성 - swiper */
    var $wrap = $('#device');
    var interleaveOffset = 0.5;
    var $swiperTablet = $wrap.find('.swiper-tablet');
    var $swiperPc = $wrap.find('.swiper-pc');
    var $swiperMobile = $wrap.find('.swiper-mobile');
    var swiperOptions = {
        autoplay: {
            delay: 3000,
            disableOnInteraction : false,
        },
        loop: true,
        speed: 1000,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        lazy: true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
                }
            }
        }
    };

    // swiper 실행
    var swiperPc = new Swiper($swiperPc, swiperOptions);
    var swiperMobile = new Swiper($swiperMobile, swiperOptions);
    var swiperTablet = new Swiper($swiperTablet, swiperOptions);

    // swiper stop
    swiperPc.autoplay.stop();
    swiperMobile.autoplay.stop();
    swiperTablet.autoplay.stop();

    // swiper sync
    // swiperPc.controller.control = [swiperMobile]
    // swiperMobile.controller.control = [swiperTablet]

    // swiper play
    swiperPc.autoplay.start();
    swiperMobile.autoplay.start();
    swiperTablet.autoplay.start();

    if(!isReal) $wrap.find('.pointer-none').removeClass('pointer-none');


})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 사용자 편의성 - "적응형, 반응형" 프로젝트 보기 */
    var $wrap = $('#device');
    var $btnSrh = $wrap.find('.btn_search');

    $btnSrh.on('click', function(){
        moveTo({
            top: 150,
            target: $('#project .list_tag'),
        });

        setTimeout(function() {
            var keyword = ['반응형', '적응형'];
            var $project = $('#project')
            var $listTag = $project.find('.list_tag');
            var $btnMore = $project.find('.btn_more');

            // list 초기화
            ProjectPage = 0;
            $project.find('.item_project').remove();

            // tag 초기화 및 선택
            $listTag.find('.btn_tag.on').removeClass('on');
            keyword.forEach(function(info){
                $listTag.find(':contains("'+info+'")').closest('.btn_tag').addClass('on')
            });

            $btnMore.trigger('click');
        }, 400);
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 경력개발 - 탭메뉴 */
    var $wrap = $('#professional');

    tab($wrap.find('.tab-container'),{
        navigation : {
            el : $wrap.find('.tab-nav'),
            autoHeight : true
        },
        afterLoad : function(){
            $wrap.find('.tab-btn').on('click', function(){
                // moveTo()
                var headerH = $('#header').height();
                moveTo({
                    top: headerH,
                    target: $wrap,
                });
            })/* .eq(1).trigger('click'); */
        }
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 경력개발 - 기술역량 */
    let $wrap = $('#professional .tab-slide-tool')
    let $swiper = $wrap.find('.swiper-container');
    let swiper = new Swiper($swiper, {
        autoplay: {
            delay: 2000,
            disableOnInteraction : false,
        },
        speed: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: $swiper.find('.swiper-slide').length,
        navigation: {
            nextEl: $wrap.find('.swiper-button-next'),
            prevEl: $wrap.find('.swiper-button-prev')
        },
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true
        },
    });





})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 경력개발 - 수상경력 및 자격증 */
    let $wrap = $('#professional .tab-slide-license');
    let $swiper = $wrap.find('.swiper-container');
    let $slide = $swiper.find('.swiper-slide');
    let slide_copied = $swiper.find('.swiper-slide').detach();

    // clone()
    getList(SERVER.public+'/json/license.json', function(infoList) {
        infoList.forEach(function(each) {
            let slide_clone = slide_copied.clone();

            slide_clone.find('.date').text(each.date);
            slide_clone.find('.tit').text(each.title);
            slide_clone.find('.desc:eq(0)').text(each.description1);
            slide_clone.find('.desc:eq(1)').text(each.description2);
            slide_clone.appendTo($swiper.find('.swiper-wrapper'))
        });

        afterLoad();
    })

    // afterLoad()
    const afterLoad = function() {
        // swiper
        let swiper = new Swiper($swiper, {
            autoplay: {
                delay: 1,
                disableOnInteraction : false,
            },
            speed: 3000,
            slidesPerView: 'auto',
            centeredSlides: true,
            freeMode: true,
            // grabCursor: true,
            mousewheelControl: true,
            keyboardControl: true,
            on : {
                slideChangeTransitionStart : function(){
                    let $this = $(swiper.el).find('.swiper-slide-active');
                    let $next = $(swiper.el).find('.swiper-slide-next');

                    $this.prevAll().addClass('swiper-slide-active-complete');
                    $this.prevAll().find('.border').addClass('border-active');
                    $this.addClass('swiper-slide-active-complete');
                    $next.addClass('swiper-slide-active-complete');
                    $this.find('.border').addClass('border-active');
                },
                slideChangeTransitionEnd : function(){
                    if (++swiper.realIndex == swiper.slides.length){
                        let tl = new TimelineMax();

                        swiper.autoplay.stop();
                        tl.delay(1)
                        .to(swiper.$wrapperEl, 0.6, {opacity:0, onComplete:function(){
                            swiper.slideTo($(swiper.slides).eq(0).index(), 0, true);
                            $(swiper.slides).removeClass('swiper-slide-active-complete');
                            $(swiper.slides).find('.border').removeClass('border-active');
                        }})
                        .to(swiper.$wrapperEl, 0.6, {opacity:1})
                        .call(function(){
                            swiper.autoplay.start();
                        });
                    }
                },
            },
        });
        swiper.autoplay.stop();

        // siwper reset
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === "class") {
                    if ($wrap.hasClass('tab-slide-active')) {
                        swiper.autoplay.start();
                    } else {
                        swiper.autoplay.stop();
                        swiper.slideTo($(swiper.slides).eq(0).index(), 0, true);
                        $(swiper.slides).removeClass('swiper-slide-active-complete');
                        $(swiper.slides).find('.border').removeClass('border-active');
                    }
                }
            });
        });
        observer.observe($wrap[0], {attributes: true});
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 경력개발 - 인턴·대외활동 및 직무교육 */
    let $wrap = $('#professional .tab-slide-activity');
    let $swiperTop = $wrap.find('.swiper-top');
    let slideTop_copied = $swiperTop.find('.swiper-slide').detach();
    let $swiperThumb = $wrap.find('.swiper-thumb');
    let slideThumb_copied = $swiperThumb.find('.swiper-slide').detach();

    // clone()
    getList(SERVER.public+'/json/activity.json', function(infoList) {
        infoList.forEach(function(each) {
            let $slideTop_clone = slideTop_copied.clone();
            let $slideThumb_clone = slideThumb_copied.clone();

            $slideTop_clone.find('.corp').text(each.corp);
            $slideTop_clone.find('.tit').text(each.title).html(function(i, text) {
                return text.replace('長', '<span>長</span>');
            });
            $slideTop_clone.find('.date').text(each.date);
            $slideTop_clone.find('.desc').text(each.description);
            $slideThumb_clone.attr('data-background', SERVER.images+'/portfolio/professional_activity/'+each.thumb+'_pc.jpg');

            $slideTop_clone.appendTo($swiperTop.find('.swiper-wrapper'))
            $slideThumb_clone.appendTo($swiperThumb.find('.swiper-wrapper'))
        });

        afterLoad();
    });

    // afterLoad()
    const afterLoad = function() {
        // 본문
        let swiperTop = new Swiper($swiperTop, {
            autoplay: {
                delay: 4000,
                disableOnInteraction : false,
            },
            speed: 600,
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            centeredSlides: true,            
            loop: true,
            loopedSlides: $swiperTop.find('.swiper-slide').length,
            navigation: {
                nextEl: $wrap.find('.swiper-button-next'),
                prevEl: $wrap.find('.swiper-button-prev'),
            },
        });

        // 썸네일
        let swiperThumb = new Swiper($swiperThumb, {
            slidesPerView: 1,            
            loop: true,
            loopedSlides: $swiperThumb.find('.swiper-slide').length,
            effect: 'fade',
            lazy: true,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true
            },
        });
        swiperTop.controller.control = swiperThumb;
        swiperThumb.controller.control = swiperTop;
        swiperTop.autoplay.stop();

        // siwper reset
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === "class") {
                    if ($wrap.hasClass('tab-slide-active')) {
                        swiperTop.slideTo($swiperTop.find('[data-swiper-slide-index="0"]').eq(1).index(), 0, true);
                        swiperTop.autoplay.start();
                    } else {
                        swiperTop.autoplay.stop();
                    }
                }
            });
        });
        observer.observe($wrap[0], {attributes: true});
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 근무이력 - DOM 생성 */
    let $wrap = $('#career');
    let $swiper = $wrap.find('.swiper-container');
    let slide_copied = $swiper.find('.swiper-slide').detach();

    getList(SERVER.public+'/json/career.json', function(infoList) {
        infoList.forEach(function(each) {
            let $slide_clone = slide_copied.clone();
            $slide_clone.find('.logo').attr({
                'src': SERVER.images+'/portfolio/career_ci/'+each.logo+cache+'',
                'alt': each.name
            });
            $slide_clone.find('.detail .name, .btn_area .corp').text(each.name);
            $slide_clone.find('.btn_search').attr('data-search', each.name);
            $slide_clone.find('.detail .period').text(each.period).html(function(i, text) {
                return text.replace('재직중', '<strong class="color-primary">재직중</strong>');
            });
            $slide_clone.find('.detail .postion').text(each.postion);
            $slide_clone.find('.list_job .tit').text(each.title);

            for (let i = 0; i < each.job.length && i < 5; i++) {
                $slide_clone.find('.list_job').append('<dd class="desc">'+each.job[i]+'</dd>');
            }

            $slide_clone.appendTo($swiper.find('.swiper-wrapper'));
        });

        afterLoad();
    });

    // afterLoad()
    const afterLoad = function() {
        // swiper
        let swiper = new Swiper($swiper, {
            autoplay: {
                delay: 6000,
                disableOnInteraction : false,
            },
            speed: 1400,
            slidesPerView: 'auto',
            spaceBetween: 30,
            slideToClickedSlide: true,
            centeredSlides: true,
            loop: true,
            loopedSlides: $swiper.find('.swiper-slide').length,
            navigation: {
                nextEl: $wrap.find('.swiper-button-next'),
                prevEl: $wrap.find('.swiper-button-prev')
            },
            pagination: {
                el: $wrap.find('.swiper-pagination'),
                clickable: true
            },
            on: {
                init: function() {
                    $(this.el).find('.swiper-slide').on('click', function() {
                        $(this).toggleClass('swiper-slide-touch-active');

                        if (!$(this).hasClass('swiper-slide-touch-active')) {
                            $(this).find('.btn_area').attr('style', 'animation-delay:0s');
                        }
                    });
                },
                slideChangeTransitionEnd: function() {
                    let $this = $(this.el).find('[data-swiper-slide-index="'+this.realIndex+'"]');

                    $this.siblings().removeClass('swiper-slide-touch-active').find('.btn_area').removeAttr('style');
                },
            }
        });


        /* 선택한 회사 프로젝트 보기 */
        var $btnSrh = $wrap.find('.btn_search');

        $btnSrh.on('click', function(){
            var $this = $(this);

            moveTo({
                top: 150,
                target: $('#project .list_tag'),
            });

            setTimeout(function() {
                var keyword = $this.attr('data-search');
                var $project = $('#project')
                var $listTag = $project.find('.list_tag');
                var $btnMore = $project.find('.btn_more');

                // list 초기화
                ProjectPage = 0;
                $project.find('.item_project').remove();

                // tag 초기화 및 선택
                $listTag.find('.btn_tag.on').removeClass('on');
                $listTag.find(':contains("'+keyword+'")').closest('.btn_tag').addClass('on')

                $btnMore.trigger('click');
            }, 400);
        });
    }




})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 티스토리 API */
    const getTistory = function() {
        let arg = arguments[0];
        let default_option = {
            pars : {
                'accessToken' : '014f0adecdf2a12798c783abbc7a0498_3ea393c3f6e235ff61d1f6e3557bbdb9',
                'outputType' : 'json', //xml 또는 json
                'blogName' : 'https://me2designer.tistory.com'
            },
            type : {
                post : 'https://www.tistory.com/apis/post/list?',
                category : 'https://www.tistory.com/apis/category/list?'
            },
            callback : function(){}
        }
        arg = mergeDeep(default_option, arg);
        arg.count = arg.count == undefined ? '' : '&count='+arg.count;
        arg.page = arg.page == undefined ? '' : '&page='+arg.page;

        let arrType = Object.entries(arg.type)
        let datas = {}
        let Y;

        arrType.forEach(function(each) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', each[1]+'access_token='+arg.pars.accessToken+'&output='+arg.pars.outputType+'&blogName='+arg.pars.blogName+'&visibility=0'+arg.count+arg.page);
            xhr.send();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    datas[each[0]] = each[0] == 'post' ? JSON.parse(xhr.response).tistory.item : JSON.parse(xhr.response).tistory.item.categories;

                    if (Y) arg.callback(datas);

                    Y = true;
                } else {
                    console.log('failed');
                }
            };
        });
    }

    /* 코딩블로그 */
    const $wrap = $('#blog');
    let $tbody = $wrap.find('.table tbody');
    let tr_copied = $tbody.find('tr').detach();
    var $paging = $wrap.find('.table-pagination');
    var bullet_copied = $paging.find('.table-pagination-bullet').detach();

    getTistory({
        count : 4,
        page : 1,
        callback : function(infoList){
            list(infoList);
        }
    })

    // table clone()
    const list = function(infoList) {
        let cate_filter = id => (infoList.category.filter(object => object.id == id)[0].name);

        infoList.post.posts.forEach(function(each){
            let $tr_clone = tr_copied.clone();
            $tr_clone.find('.cate').text(cate_filter(each.categoryId));
            $tr_clone.find('.tit').text(each.title)
            $tr_clone.find('.date').text(each.date.substr(0, 10))
            $tr_clone.appendTo($tbody);

            if (each.visibility !== '0') {
                $tr_clone.on('click', function(){
                    window.open('about:blank').location.href=each.postUrl;
                });
            } else {
                $tr_clone.attr('data-disable','true').on('click', function() {
                    LAYER({
                        name : 'alert',
                        text : '현재 열람이 불가합니다.'
                    })
                });
            }
        });

        // 말줄임
        $tbody.find('.tit').lineClamp(1);

        // clone() - 페이징
        let total = infoList.post.totalCount / infoList.post.count;

        for (let i = 0; i < total; i++) {
            let $bullet_clone = bullet_copied.clone();
            let page = i+1;

            $bullet_clone.attr('data-page-number',page).text(page);
            if (page == infoList.post.page) $bullet_clone.addClass('on');
            $bullet_clone.appendTo($paging)
        }

        $paging.find('.table-pagination-bullet:not(.on)').on('click', function(){
            let page = $(this).attr('data-page-number');

            getTistory({
                count : 4,
                page : page,
                callback : function(newInfoList){
                    $tbody.find('tr').remove();
                    $paging.find('.table-pagination-bullet').remove();

                    list(newInfoList);
                }
            });
        })
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/});// DOCUMENT READY...