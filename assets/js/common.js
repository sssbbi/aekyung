'use strict';

/* 모달팝업 */
var startPop = function() {
  var winW = $(window).width();
  if (winW > 1024) {
    $('.start_pop').draggable({
      handle: '.modal-header',
      containment: 'html'
    });
  }
}

/* loading image */
$(window).on('load', function(){
  $('.loading-image').fadeOut(300);
});


/* 모바일 네비게이션 */
var navMobile = {
  init: function () {
    this.nav_mobile_btn(); // 모바일네비 토글
    this.nav_mobile_active(); //활성화된 메뉴 열어두기
    this.nav_mobile_down(); //하위메뉴가 있는 항목 찾아서 addClass
    this.nav_mobile_action(); // 아코디언 메뉴
  },
  nav_mobile_btn: function () {
    var $navBtn = $('.nav-mobile__btn'),
      $navBg = $('.nav-mobile__bg'),
      $nav = $('.nav-mobile');
    var toggleNav = function () {
      $navBg.fadeToggle(200,"linear");
      $nav.toggleClass('active');
    };
    $navBtn.on('click', function () {
      toggleNav();
    });
    $navBg.on('click', function () {
      toggleNav();
    });
  },
  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $('.nav-mobile .depth-1 > .link.on,.nav-mobile .depth-2 > .link.on').addClass('active').next().show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $('.nav-mobile .depth-1, .nav-mobile .depth-2').each(function () {
      if ($(this).children('').next().length > 0) {
        $(this).addClass('_down');
      } else {
        $(this).removeClass('_down');
      }
    });
  },
  nav_mobile_action: function () {
    var $depth1 = $('.nav-mobile .depth-1'),
      $depth2 = $('.nav-mobile .depth-2'),
      $depth2_list = $('.nav-mobile .nav-list--depth2'),
      // $depth3 = $('.nav-mobile .depth-3'),
      $depth3_list = $('.nav-mobile .nav-list--depth3');

    $depth1.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth2.find('.link').removeClass('active');
          $depth1.children('.link').removeClass('active');
          $(this).addClass('active');
          $depth3_list.hide();
          $depth2.find('.link').removeClass('active');
          $depth2_list.slideUp(300);
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth2.find('.link').removeClass('active');
          $(this).next().slideUp(200);
          $depth1.children('.link').removeClass('active');
        }
        return false;
      } else {
      }
    });

    // 2dp action 생략 ?
    $depth2.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {

          $depth2.children('.link').removeClass('active');
          $depth3_list.find('.link').removeClass('active');

          $depth3_list.stop(false, true).slideUp(300);
          $(this).addClass('active');
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth3_list.find('.link').removeClass('active');
          $(this).removeClass('active');
          $(this).next().stop(false, true).slideUp(300);
        }
        return false;
      } else {
      }
    });
  },
};

/* 서브 네비게이션 */
var subNav = {
  init: function () {
    this.depth_clone();
    this.drop_down();
  },
  depth_clone: function () {
    var $depth1Active = $('.nav').find('.depth-1 > .link'); // 1dp 가져오기
    var $depth2Active = $('.nav').find('.depth-1 > .link.on').next().find('.depth-2 > .link'); //활성화된 2depth
    var $depth3Active = $('.nav').find('.depth-2 > .link.on').next().find('.depth-3 > .link'); //활성화된 3depth

    // console.log(depth2Active);
    var $depth1List = $('.sub-nav-clone--depth1'); //depth1Active를 복사해 넣을 컨테이너
    var $depth2List = $('.sub-nav-clone--depth2'); //depth2Active를 복사해 넣을 컨테이너
    var $depth3List = $('.sub-nav-clone--depth3'); //depth3Active를 복사해 넣을 컨테이너

    //1뎁스 클론
    var $depth1Clone = $depth1Active.clone();
    //1뎁스 클론에 루프 하여 li생성후 넣기
    $.each($depth1Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth1List);
      $(ele).appendTo(li);
    });

    //2뎁스 클론
    var $depth2Clone = $depth2Active.clone();
    //2뎁스 내용 넣기
    $.each($depth2Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth2List);
      $(ele).appendTo(li);
    });

    //3뎁스 클론
    var $depth3Clone = $depth3Active.clone();
    //3뎁스 내용 넣기
    $.each($depth3Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth3List);
      $(ele).appendTo(li);
    });
  },

  drop_down: function () {
    var $dropDown = $('.sub-nav--dropdown .sub-nav__item'),
      $dropDownBtn = $('.sub-nav__button'),
      $dropDownList = $('.sub-nav__drawer');

    $dropDown.each(function () {
      $(this)
        .find($dropDownBtn)
        .click(function () {
          if ($(this).hasClass('on') == true) {
            $(this).removeClass('on');
            $(this).next().stop(false, true).slideUp(200);
          } else {
            $dropDownList.stop(false, true).hide();
            $dropDownBtn.removeClass('on');
            $(this).next().stop(false, true).slideDown(100);
            $(this).addClass('on');
          }
          return false;
        });
    });
  },
};

/* 서브네비게이션 스크롤 형태 */
var frontScroll = {
  init: function () {
    this.sticky_header();
    this.sticky_nav();
    this.sticky_prodNav();
    this.sticky_historyTab();
  },

  sticky_header: function () {
    var $header = $('.header');
    if ($(window).outerWidth() > 1024) {
      if ($(window).scrollTop() > 500) {
        $header.addClass('fix');
      } else {
        $header.removeClass('fix');
      }
    } else {
      if ($(window).scrollTop() > 100) {
        $header.addClass('fix');
      } else {
        $header.removeClass('fix');
      }
    }
  },
  sticky_nav: function () {
    var $subNav = $('.sub-nav--sticky'),
      $subNavWrap = $('.sub-nav--sticky .sub-nav__wrap'),
      $headerHeight = $('.header').outerHeight();
    if ($subNav.length > 0) {
      var subNavOffset = $subNav.offset(),
        // subNavTop = subNavOffset.top;
        subNavTop = subNavOffset.top - $headerHeight;

      //if ($(window).outerWidth() > 1024) {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass('fix');
          $subNavWrap.css('top', $headerHeight);
          if ( $('.header').hasClass('up') ) {
            $subNavWrap.css('margin-top', -$headerHeight);
          } else {
            $subNavWrap.css('margin-top', 0);
          }
        } else {
          $subNav.removeClass('fix');
          $subNavWrap.css('top', 0);
        }
      //} else {
        // if ($(window).scrollTop() > subNavTop) {
        //   $subNav.addClass('fix');
        // } else {
        //   $subNav.removeClass('fix');
        // }
      //}
    }
  },
  sticky_prodNav: function () {
    var $prodNav = $('.product-depth3'),
      $prodNavWrap = $('.product-depth3-wrap'),
      $subNavHeight = $('.sub-nav.fix').find('.sub-nav__button').height(),
      $headerHeight = $('.header').outerHeight();
    if ($prodNav.length > 0) {
      var prodNavOffset = $prodNav.offset(),
        prodNavTop = prodNavOffset.top - $headerHeight - $subNavHeight;

      if ($(window).scrollTop() > prodNavTop) {
        $prodNav.addClass('fix');
        $prodNavWrap.css('top', $headerHeight + $subNavHeight);
        if ( $('.header').hasClass('up') ) {
          $prodNavWrap.css('margin-top', -$headerHeight);
        } else {
          $prodNavWrap.css('margin-top', 0);
        }
      } else {
        $prodNav.removeClass('fix');
        $prodNavWrap.css('top', 0);
      }
    }
  },
  sticky_historyTab: function () {
    var $historyTab = $('.history-tab'),
      $historyTabWrap = $('.history-tab-wrap'),
      $subNavHeight = $('.sub-nav.fix').find('.sub-nav__button').height(),
      $headerHeight = $('.header').outerHeight();
    if ($historyTab.length > 0) {
      var historyTabOffset = $historyTab.offset(),
        historyTabTop = historyTabOffset.top - $headerHeight - $subNavHeight;

      if ($(window).scrollTop() > historyTabTop) {
        $historyTab.addClass('fix');
        $historyTabWrap.css('top', $headerHeight + $subNavHeight);
        if ( $('.header').hasClass('up') ) {
          $historyTabWrap.css('margin-top', -$headerHeight);
        } else {
          $historyTabWrap.css('margin-top', 0);
        }
      } else {
        $historyTab.removeClass('fix');
        $historyTabWrap.css('top', 0);
      }
    }
  },
};

function prodNavScroll_front() {
  var $prodNav = $('.product-depth3');
  var prodNavLinkLeft = $('.product-depth3 .link.on').offset().left;
  var prodNavWidth = $('.product-depth3-wrap');
  var totalWidth = 0;

  for (var i = 0; i < prodNavWidth.length; i++) {
    totalWidth += prodNavWidth[i].offsetWidth;
  }

  $prodNav.animate({ scrollLeft: prodNavLinkLeft - 100 }, 1);
}


$(document).ready(function () {
  if ($('.product-depth3').length > 0) {
    if ($(window).innerWidth() < 1025) {
      prodNavScroll_front();
    }
  }
});
$(window).resize(function () {
  if ($('.product-depth3').length > 0) {
    if ($(window).innerWidth() < 1025) {
      prodNavScroll_front();
    }
  }
});

var lastScrollTop = 0;
$(window).scroll(function (event) {
  if ($('body').hasClass('business') || $('body').hasClass('history')) {
    if ($(window).scrollTop() > $('.sub-visual').outerHeight()) {
      var scrT = $(window).scrollTop();
      if (scrT > lastScrollTop) {
        $('.header').addClass('up');
      } else {
        $('.header').removeClass('up');
      }
      lastScrollTop = scrT;
    }
  }
});


/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $('.popup-link').magnificPopup({
      type: 'ajax',
      closeOnBgClick: false,
      mainClass: 'mfp-fade',
      callbacks: {
        ajaxContentAdded: function () {
          var $content = $(this.content[0]);
          var $pop = $content.find('.popup-in-popup');
          var aURL = '';

          if ($pop.length > 0) {
            aURL = $pop.attr('href');

            $pop.on('click', function (e) {
              e.preventDefault();

              $.ajax({
                url: aURL,
                dataType: 'html',
                success: function (data) {
                  var item = '<div class="pop-in-pop">';
                  item += data;
                  item += '</div>';

                  /* HTML append */
                  $content.append(item);

                  /* 닫기 버튼 append */
                  $('.pop-in-pop').children().append('<div class="pop-in-close"><i class="xi-close"></i></div>');

                  /* 닫기 버튼 */
                  $('.pop-in-close').on('click', function(){
                    $('.pop-in-pop').remove();
                  });
                }
              });
            });
          }
        }
      }
    }, 500);
  },
};

function closePopup() {
  $.magnificPopup.close();
}

$(window).on('scroll', function () {
  frontScroll.init();

  // console.log(
  //   $(window).scrollTop(),
  // )
  // 퀵메뉴 하단 고정
  var footHeight = $('.footer').outerHeight();
  if($(window).scrollTop() > $('body').outerHeight() - $(window).outerHeight() - footHeight){
    // console.log('넘음')
    $('.quick-menu').addClass('fix')
  }else{
    $('.quick-menu').removeClass('fix')
  }
});

$(window).on('resize', function () {
  frontScroll.init();
});

$(document).on('mouseover', function () {
  magnificPop.init();
});

// FIXME: @ 개발 : 제품검색
$(document).on('click', '.btn--reset', function(){
  $('#searchformdepth1').val('');
  $('#searchformdepth2').val('');
  $('#searchformproductuid').val('');
  $('#searchformkeyword').val('');
  $('.select option:eq(0)').prop("selected", true);
  //console.log($('.select option:eq(1)').val());
  $('.product-search__depth .btn').removeClass('on');
  $(this).closest('.product-search__depth').next().find('.product-search__content.scrollbar-outer').removeClass('d-block');
  $('.product-search__depth:not(.product-search__depth--1) .product-search__content.scrollbar-outer').removeClass('d-block').addClass('d-none');
  $('.product-search__depth:not(.product-search__depth--1) .product-search__content--blank').addClass('d-flex').removeClass('d-none');
});

$(document).ready(function () {
  /* Navigation Active */
  $('.nav, .nav-all, .nav-mobile').navActive({
    depth1: '.depth-1',
    depth2: '.depth-2',
    depth3: '.depth-3',
    activeClass: 'on',
    callback: function () {
      // console.log('callback function');
    },
  });



  $('.product-search-btn.__function').on('click',function(){
    if($(this).hasClass('active')){
      $('html').removeClass('overflow-hidden');//스크롤막기
      $('.product-search__bg').stop().hide();//(200,"linear");
      $(this).removeClass('active');
      $('.product-search').removeClass('active');
      $('.header').removeClass('header-search')
    }
    else{
      $('html').addClass('overflow-hidden');//스크롤막기
      $('.product-search__bg').stop().show();//.fadeIn(200,"linear");
      $(this).addClass('active');
      $('.product-search').addClass('active');
      $('.header').addClass('header-search')
    }
  })

  if ($(window).width() > 1024) {
    $('.header').on('mouseover',function(){
      $('.header').addClass('header-hover');
    })
    $('.header').on('mouseleave',function(){
      $('.header').removeClass('header-hover');
    })
  }


  $('.header .nav .link').on('focus',function(){
    $('.header').addClass('header-focus');
  })
  $('.header .nav .link').on('blur',function(){
    $('.header').removeClass('header-focus');
  })

  $('.nav-all__btn').on('click', function(){
    $('.nav-all').stop().toggleClass('active')//slideDown(200);
    $(this).stop().toggleClass('is-active')//slideDown(200);
    $('.header').toggleClass('header-nav-all')
  })



  /* HEADER GNB Drop */
  $('.header').navDrop({
    type: 'each', // 기본값 udnefiend, 선언하지 않거나 없는 값을 선언할 경우 콘솔창에 경고문구 출력
    background: true, // 기본값 true, 배경 엘리먼트가 없을 경우 콘솔창에 경고문구 출력
    backgroundClass: '.nav__bg', // 기본값 .nav__bg
    backgroundAutoColor: false, // 기본값 false, depth2의 배경색을 자동으로 적용
    effect: 'fade', // 기본값 fade, 옵션값은 fade, slide
    delay: 200, // 출력시 delay
    callback: function () {}, // 콜백 함수
  });


  // $(window).scrollTrack({
  //   threshold: 0,
  //   activeClass: 'active',
  // });


  //gnbdrop.init();
  navMobile.init();
  subNav.init();
  frontScroll.init();
  startPop();

  var wowJS = new WOW().init();
  /*
    File Upload
    이벤트 버블링 방지를 위해 on('change') 형태로 변경함.
  */
  $('.file_box > input').on('change', function(){
    var tmp = $(this).val().replace(/^.*\\/, "");
    $(this).siblings('p').text(tmp);
    $(this).siblings('p').addClass('on');
  });

  /* Bullet List */
  $('.bullet-list').each(function () {
    if ($(this).hasClass('bullet-list--decimal')) {
      $(this)
        .children('.item')
        .each(function (index) {
          $(this).prepend('<span class="decimal-number">' + (index + 1) + ')</span>');
        });
    }

    $(this).addClass('bullet-type--js');
  });

  /*
  min-width지정 rowscroll
  */
  $('.row-scrollwrap').each(function () {
    var $rowScrollTxtWidth = $(this).data('show'),
      $rowScrollTxt = $(this).find('.row-scrollwrap__txt');
    $(this).find('.row-scrollwrap__content').css('min-width', $rowScrollTxtWidth);
    // 가로스크롤 영역 min-width지정
    var $gutter = 40; // $container-gutter-width (_var.scss)
    if ($(window).width() < $rowScrollTxtWidth + $gutter) {
      $rowScrollTxt.show();
      // 지정된 rowScrollTxtWidth + (gutter) 해상도에서 안내문구 노출
    }
  });

  /* scrollbar js */
  $('.scrollbar-inner').scrollbar();
  $('.scrollbar-outer').scrollbar();

  if ($(window).innerWidth() > 768) {
    if ( $('.product-search__depth--2 .product-search__content .btn.on').length > 0 ) {
      var onTop1 = $('.product-search__depth--1 .product-search__content .btn.on').position().top;
      var onTop2 = $('.product-search__depth--2 .product-search__content .btn.on').position().top;
      var onTop3 = $('.product-search__depth--3 .product-search__content .btn.on').position().top;
      //console.log(onTop2);
      $('.product-search__depth--1 .product-search__content').scrollTop(onTop1);
      $('.product-search__depth--2 .product-search__content').scrollTop(onTop2);
      $('.product-search__depth--3 .product-search__content').scrollTop(onTop3);
    }
  }

  // $('.scrollbar-light').scrollbar();

  /* Resizing Check */
  // var resizing = resizingCheck({
  //   breakpoints: {
  //     414: function () {
  //       // console.log('414 < width < 768');
  //     },
  //     768: function () {
  //       // console.log('768 < width < 1024');
  //     },
  //     1024: function () {
  //       // console.log('1024 < width < 1200');
  //     },
  //     1200: function () {
  //       // console.log('1200 < width');
  //     },
  //   },
  // });
});

$(window).load(function(){
  $('.sub-visual__bg.__zoom').addClass('on');
});


$(document).on('click', '.searchdepth1', function () {
  ProductSearchDepth1($(this),'');
});


function ProductSearchDepth1($thisclass,selectval){
  $('#searchformpage').val('1');
  //$thisclass.siblings('.btn').removeClass('on');
  $('.product-search__depth .btn').removeClass('on');
  $thisclass.addClass('on');
  $thisclass.closest('.product-search__depth').next().find('.product-search__content.scrollbar-outer').addClass('d-block');
  $thisclass.closest('.product-search__depth').next().find('.product-search__content--blank').removeClass('d-flex').addClass('d-none');
  $('.product-search__depth--3').find('.product-search__content.scrollbar-outer').removeClass('d-block').addClass('d-none');
  $('.product-search__depth--3').find('.product-search__content--blank').removeClass('d-none').addClass('d-flex');

  var searchdepth1 = $thisclass.attr('data-depth1');
  if(searchdepth1==undefined){
    searchdepth1 = $thisclass.val();
  }

  $('#searchformdepth1').val(searchdepth1);
  var $targetpc = $('#productsearchdepth2viewpc');
  var $targetm = $('#productsearchdepth2viewm');
  $targetpc.empty();
  $targetm.empty();

	$.ajax({
    type: "POST",
    url: "/sadmin/Bboard/get_cate1.php",
    async: false,
    data:{depth : 2, ucateno : searchdepth1, formcase : "selectbox"},
    dataType: "json",
    success: function(jdata){
      if(jdata.length == 0){
        $targetpc.append('<div class="product-search__content mt-10"><img src="../../assets/images/main/product-search-blank.svg" alt="" /><p class="text">등록된 제품이 없습니다.</p></div>');
        $targetm.append('<option value="" >등록된 제품이 없습니다.</option>');
      }else{
        $targetm.append('<option value="">제품명을 선택해주세요.</option>');
        $(jdata).each(function(i){
          if(selectval==jdata[i].cateno) {
            $targetpc.append('<button type="button" class="btn searchdepth2 on" data-depth2="'+ jdata[i].cateno +'">'+jdata[i].catename +'</button>');
            $targetm.append('<option value="'+ jdata[i].cateno +'" selected>'+jdata[i].catename +'</option>');
          }else{
            $targetpc.append('<button type="button" class="btn searchdepth2 " data-depth2="'+ jdata[i].cateno +'">'+jdata[i].catename +'</button>');
            $targetm.append('<option value="'+ jdata[i].cateno +'" >'+jdata[i].catename +'</option>');
          }
        });
      }
      if(selectval == ''){
        $('#searchformdepth2').val('');
        $('#searchformproductuid').val('');
        ProductSearchShowList();
      }else{
        var onDepth2 = $('.searchdepth2.on');
        ProductSearchDepth2(onDepth2,$('#searchformproductuid').val());
      }
    }, error: function(request,status,error){
      console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
	});


}


$(document).on('click', '.searchdepth2', function () {
  ProductSearchDepth2($(this),'');
});


function ProductSearchDepth2($thisclass,selectval){
  $('#searchformpage').val('1');
  $thisclass.siblings('.btn').removeClass('on');
  $thisclass.addClass('on');
  $thisclass.closest('.product-search__depth').next().find('.product-search__content.scrollbar-outer').addClass('d-block');
  $thisclass.closest('.product-search__depth').next().find('.product-search__content--blank').removeClass('d-flex').addClass('d-none');

  var searchdepth2 = $thisclass.attr('data-depth2');
  if(searchdepth2==undefined){
    searchdepth2 = $thisclass.val();
  }

  $('#searchformdepth2').val(searchdepth2);
  var $targetpc = $('#productsearchdepth3viewpc');
  var $targetm = $('#productsearchdepth3viewm');
  $targetpc.empty();
  $targetm.empty();

	$.ajax({
    type: "POST",
    url: "/sadmin/Bboard/get_cate1.php",
    async: false,
    data:{ucateno : searchdepth2, formcase : "product"},
    dataType: "json",
    success: function(jdata){
      if(jdata.length == 0){
        $targetpc.append('<div class="product-search__content mt-10"><img src="../../assets/images/main/product-search-blank.svg" alt="" /><p class="text">등록된 제품이 없습니다.</p></div>');
        $targetm.append('<option value="" >등록된 제품이 없습니다.</option>');
      }else{
        $targetm.append('<option value="">제품용도를 선택해주세요.</option>');
        $(jdata).each(function(i){
          if(selectval==jdata[i].uid) {
            $targetpc.append('<button type="button" class="btn searchproductuid on" data-productuid="'+ jdata[i].uid +'">'+jdata[i].title +'</button>');
            $targetm.append('<option value="'+ jdata[i].uid +'" selected>'+jdata[i].title +'</option>');
          }else{
            $targetpc.append('<button type="button" class="btn searchproductuid" data-productuid="'+ jdata[i].uid +'">'+jdata[i].title +'</button>');
            $targetm.append('<option value="'+ jdata[i].uid +'">'+jdata[i].title +'</option>');
          }
        });
      }
      if(selectval == ''){
        $('#searchformproductuid').val('');
        ProductSearchShowList();
      }else{
        var onDepth3 = $('.searchproductuid.on');
        ProductSearchDepth3(onDepth3,$('#searchformproductuid').val());
      }
    }, error: function(request,status,error){
      console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
	});

}

$(document).on('click', '.searchproductuid', function () {

      $(this).siblings('.btn').removeClass('on');
      $(this).addClass('on');
      $(this).closest('.product-search__depth').next().find('.product-search__content.scrollbar-outer').addClass('d-block');
      $(this).closest('.product-search__depth').next().find('.product-search__content--blank').removeClass('d-flex').addClass('d-none');


  var searchdepth3 = $(this).attr('data-productuid');

  ProductSearchDepth3($(this),'');
});

function ProductSearchDepth3($thisclass){
  $('#searchformpage').val('1');
  $thisclass.siblings('.btn').removeClass('on');
  $thisclass.addClass('on');

  var searchdepth3 = $thisclass.attr('data-productuid');

  if(searchdepth3==undefined){
    searchdepth3 = $thisclass.val();
  }

  $('#searchformproductuid').val(searchdepth3);
  ProductSearchShowList();
}









function ProductSearchShowList(){
	var params = jQuery("#productsearchform").serialize(); //폼값전송
	$.ajax({
		type : "POST"
		, async : false
		, url : "/kor/search/productlist.php"
		, dataType : "JSON"
		, data : params
		, success : function(res){
      $("#product_listbody").html(res.msg);
      $("#product_paging_area").html(res.paging);
      $("#product_count").html(res.count);
		}
	});
}

