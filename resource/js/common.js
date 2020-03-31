$(function() {
     var top = $('.btn.top');
     //스크롤시
     $(window).scroll(function() {
          if ($(window).scrollTop() >= 60) {
               $('header').addClass('headerScroll');
               top.addClass('show');
          } else {
               $('header').removeClass('headerScroll');
               top.removeClass('show');
          }
     });

     //위로가기
     top.on('click', function() {
          $("html,body").animate({
               scrollTop: 0
          }, 600);
     });

     //햄버거버튼
     var btn_menu = $('.btn.menu');
     var m_menu = $('.btn.m_menu');
     btn_menu.on('click', function() {
          if ($(this).hasClass('open') && m_menu.hasClass('open')) {
               $(this).removeClass('open');
               m_menu.removeClass('open');
          } else {
               $(this).addClass('open');
               m_menu.addClass('open');
          }
     });

     //오버레이메뉴 닫기버튼
     var close = $('.close-panel');
     $(close).on('click', function() {
          btn_menu.removeClass('open');
          m_menu.removeClass('open');
     });

     //오버레이메뉴 메뉴클릭
     var over_li = $('.btn.m_menu li a');
     over_li.on('click', function() {
          btn_menu.removeClass('open');
          m_menu.removeClass('open');
     });

     //home btn_down 버튼
     var down = $('.btn.down');
     down.on('click', function() {
          var about = $('#about').offset().top;
          $("html,body").animate({
               scrollTop: about
          }, 600);
     });


     // init Isotope
     var $grid = $('#grid').isotope({
          itemSelector: '.element',
          layoutMode: 'fitRows',
          getSortData: {
               date: '.date parseInt',
               participation: function(itemElem) {
                    var ele = $(itemElem).find('.participation').text();
                    return parseInt(ele.slice(0, -1));
               }
          }
     });


     // bind sort button click
     $('.sort-value-button-group').on('click', 'button', function() {
          var sortValue = $(this).attr('data-sort-value');
          $grid.isotope({
               sortBy: sortValue
          });
     });

     // bind filter button click
     $('.filters-button-group').on('click', 'button', function() {
          var filterValue = $(this).attr('data-filter');
          $grid.isotope({
               filter: filterValue
          });
     });

     // change is-checked class on buttons
     $('.button-group').each(function(i, buttonGroup) {
          var $buttonGroup = $(buttonGroup);
          $buttonGroup.on('click', 'button', function() {
               $buttonGroup.find('.is-checked').removeClass('is-checked');
               $(this).addClass('is-checked');
          }).on('mouseover', 'button', function() {
               $(this).addClass('hover');
          }).on('mouseout', 'button', function() {
               $(this).removeClass('hover');
          });

     });

});

$(window).load(function() {
     $('#grid').isotope();
});
