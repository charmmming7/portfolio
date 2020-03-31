function mobilecheck() {
     var check = false;
     (function(a) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
     })(navigator.userAgent || navigator.vendor || window.opera);
     return check;
};


//사파리,파폭에서 뒤로가기 해도 자바스크립트 항상 실행 (캐싱데이터X)
window.onpageshow = function(event) {
     if (event.persisted) {
          location.replace('/');
     }
};

$(document).ready(function() {
     $('.insertCode').val('');
     var isMobileSize = false;
     var scrollPos = '';
     var $closebtn = $('.btn.popup.confirm');
     var $section = $('section');
     var rank = '';
     var isValid = '';
     var pageLink = {
          main: "/",
          end: "./complete.html",
          check100_ajax: "./json/checkCode.html",
          delivery_save: "./json/apply.html"
     };

     if (mobilecheck() && $(window).width() < 1100) {
          //mobile
          window.onload = function() {
               $('.videoimg.mobile').on('click', function(e) {
                    window.open('./video/Gillette_15.mp4');
                    commonjs.eventClick(e);
               })
          };
     } else {
          //pc
          console.log("pc")
     }


     //size check
     function resizeFunction() {
          if ($(window).width() < 1100) {
               isMobileSize = true;
          } else {
               isMobileSize = false;
          }
          if (isValid == 'valid') mobileBg(rank);

          console.log("isMobileSize : " + isMobileSize);
          return isMobileSize;
     }

     function mobileBg(rank) {
          src = './images/popupItem0' + rank + '.jpg';
          if (isMobileSize) {
               src = './images/popup_item0' + rank + '_m.png';
          }
          $('.popupLayer.line3').find('img').attr('src', src);
     }

     $closebtn.on('click', function(e) {
          $('.popupLayer').hide();
          commonjs.eventClick(e);
     });
     $closebtn.on('keypress', function(e) {
          if (e.which == 13){
                   $('.popupLayer').hide();
          }
          commonjs.eventClick(e);
     });


     //top버튼
     function scrollTop(scrollPos) {
          if (scrollPos > 50) {
               $('.btn.top').show();
          } else {
               $('.btn.top').hide();
          }
     }
     $('.btn.top').on('click', function(e) {
          $('html,body').animate({
               scrollTop: 0
          }, 300);
          commonjs.eventClick(e);
     });


     //팝업 중앙정렬
     function setPopupTop() {
          $(".popupLayer.line3").each(function() {
               var vph = $(window).height();
               var $thisPopup = $(this);
               var boxHeight = $thisPopup.find('.box').height();
               var _top = (vph - boxHeight) / 2;
               $thisPopup.find('.box').css({
                    'top': _top
               });
          });
     }

     /******************** intro *********************/


     /******************** code *********************/
     $('input.insertCode').css("ime-mode", "disabled").keydown(function(e) {
          validCheck.keyDown(e);
     }).keyup(function(e) {
          validCheck.keyUp(e);
     }).focusout(function(e) {
          validCheck.focusOut($(this));
     });


     $('input.insertCode').on('keydown', function(e) {
          if (e.which == 13) {
               $('.guidebtn.start').click();
          }

          if ($('#parseDiv').find('._container').length > 0) {
               $('.popupLayer.prevpopup').find('h2').html('입력된 정보가 초기화 됩니다.<br> 삭제하시겠습니까?');

               //예 -> 삭제
               $('.popupLayer.prevpopup').show().find('.btn.gotoprev').on('click enter', function(e) {
                    $('input.insertCode').val('');
                    $('.popupLayer.prevpopup').hide();
                    $('.section.delivery').find('input.inputData').removeClass('on').val('');
                    $('.section.delivery').find('input[type="checkbox"]').prop("checked", false);

                    $('.section.delivery').find('.alertMsg').each(function() {
                         $(this).css('visibility', 'hidden');
                    });
                    $('#parseDiv').html('');
                    commonjs.eventClick(e);
               });

               //아니오
               $('.popupLayer.prevpopup').show().find('.btn.confirm').on('click enter', function(e) {
               });
               commonjs.eventClick(e);
          }
     });


     $('input.insertCode').on('click focus', function(e) {
          var $this = $(this);
          $('.inputmsg').css({'max-height':'340px'});
          commonjs.eventClick(e);
     });

     $('.inputmsg .btnclose').on('click', function(e) {
          $('.inputmsg').css({'max-height':'0'});
          commonjs.eventClick(e);
     });


     $('.guidebtn.start').on('click', function(e) {
          if ($('input.insertCode').val().length == 0) {
               $('.popupLayer.default').find('h2').html('구매 시 발급된 코드를<br class="mobilebr"> 입력해주세요.');
               $('.popupLayer.default').show();
          } else if ($('input.insertCode').val().length < 14) {
               $('.popupLayer.default').find('h2').html('구매 시 발급된 코드를<br class="mobilebr"> 입력해주세요.');
               $('.popupLayer.default').show();
          } else {
               //var sendData = $('input.insertCode').val().replace(/[^0-9]/g, '');
               var sendData = $('input.insertCode').val();
               console.log("start 입력코드 : " + sendData)

               // 해당 이벤트가 종료된 관계로 서버통신이 불가하여 임시 코드로 테스트.
               var code;
               var vals = {
                    "master" : ["4593-9872-5484", "0001-0001-0001"],
                    "valid" : {
                         "rank" : {
                              "first"  : "1111-1111-1111",
                              "second" : "2222-2222-2222",
                              "third"  : "3333-3333-3333",
                              "fourth" : "4444-4444-4444",
                              "fifth"  : "5555-5555-5555"
                         }
                    },
                    "invalid" : "0000-0000-0000",
                    "endtoday" : "1234-1234-1234",
                    "used" : "1234-5678-9012"
               };

               console.log(vals.valid)

               // vals = 'valid' 유효한 코드 (응모가능)
               // vals = 'invalid' 유효하지 않은 코드
               // vals = 'used' 이미 사용된 코드
               // vals = 'endtoday' 금일 100개 마감

               var popup = $('.popupLayer.line2');
               if (sendData == vals.endtoday ) {
                    popup.find('h2').html('금일 SMTM 777 신청이<br>마감되었습니다.');
                    popup.find('.text').html('내일 다시 신청해주세요!');
                    popup.show();
               } else if (sendData == vals.invalid) {
                    popup.find('h2').html('코드번호가 맞지 않습니다.');
                    popup.find('.text').html('SMTM 777 구입하고 질레트 코드 받아보세요!');
                    popup.show();
               } else if (sendData == vals.used) {
                    popup.find('h2').html('이미 사용된 코드입니다.');
                    popup.find('.text').html('SMTM 777 구입하고 질레트 코드를<br class="mobilebr"> 받아보세요!');
                    popup.show();
               }else{
                    console.log("valid")
                    //  임시 코드 제거
                    
                    // 운영 종료로 인한 통신 불가
                    // ajaxcallingJSON('./json/result.json', 'POST', {
                    //      code : sendData
                    // }, function(vals) {
                         console.log(vals)

                         var _rank = vals.valid.rank;
                         var rank;
                         if(sendData == _rank.first) {
                              rank = 1;
                         }else if(sendData == _rank.second) {
                              rank = 2;
                         }else if(sendData == _rank.third) {
                              rank = 3;
                         }else if(sendData == _rank.fourth) {
                              rank = 4;
                         }else if(sendData == _rank.fifth) {
                              rank = 5;
                         }else{
                              rank = 0;
                         }
                         console.log(rank)

                         if (rank == 0) {
                              //미당첨
                              $('.popupLayer.line2').find('h2').html('SMTM777 팩을 <br class="mobilebr"> 구매해주셔서 감사합니다.');
                              $('.popupLayer.line2').find('.text').html('고객님께서는 아쉽게도<br class="mobilebr"> 당첨되지 않으셨습니다.<br>감사합니다.');
                              $('.popupLayer.line2').show();
                         } else {
                              //당첨
                              mobileBg(rank); //팝업백그라운드 (상품이미지) 사이즈별로 교체

                              $('.popupLayer.line3').show().find('.btn.confirm').on('click enter', function(e) {
                                   $('.popupLayer.line3').hide();

                                   if ($('#parseDiv').find('._container').length > 0) {
                                        console.log("이미 하단 열림.")
                                        $('html,body').animate({
                                             scrollTop: $('.section.delivery').offset().top
                                        }, 300);

                                   } else {
                                        console.log("하단 안열려있으므로 이제 열림")
                                        var sectionDel = $('<div class="section delivery"></div>');
                                        //하단 배송입력 섹션 열림(외부 html 파일 삽입) + 배송입력 스크립트 실행
                                        var makeRandnum = new Date().getTime();
                                        ajaxcallingHTML('./delivery.html?&rand=' + makeRandnum, 'GET', {}, function(data) {
                                             // sectionDel.appendTo("#contents").html(data);
                                             console.log(parseDiv)
                                             $('#parseDiv').html(data);
                                             $('#setR').val(rank);
                                             $('#code').val(sendData);
                                             $('html,body').animate({
                                                  scrollTop: $('#parseDiv').offset().top
                                             }, 300);

                                             $('input#delivery_zipcode, .phone').css("ime-mode", "disabled").keydown(function(e) {
                                                  zipValidCheck.keyDown(e);
                                             }).keyup(function(e) {
                                                  zipValidCheck.keyUp(e);
                                             }).focusout(function(e) {
                                                  zipValidCheck.focusOut($(this));
                                             });

                                             //daum 우편번호
                                             var element_layer = document.getElementById('zipcodeLayer');

                                             function openZipcode() {
                                                  new daum.Postcode({
                                                       oncomplete: function(data) {
                                                            var fullAddr = data.address; // 최종 주소 변수
                                                            var extraAddr = ''; // 조합형 주소 변수

                                                            // 기본 주소가 도로명 타입일때 조합한다.
                                                            if (data.addressType === 'R') {
                                                                 //법정동명이 있을 경우 추가한다.
                                                                 if (data.bname !== '') {
                                                                      extraAddr += data.bname;
                                                                 }
                                                                 // 건물명이 있을 경우 추가한다.
                                                                 if (data.buildingName !== '') {
                                                                      extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                                                                 }
                                                                 // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                                                                 fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                                                            }

                                                            $('.zipcodeLayerWrap').hide();
                                                            // 우편번호와 주소 정보를 해당 필드에 넣는다.
                                                            document.getElementById('delivery_zipcode').value = data.zonecode; //5자리 새우편번호 사용
                                                            document.getElementById('delivery_address1').value = fullAddr;
                                                       },
                                                       width: '100%',
                                                       height: '100%',
                                                       maxSuggestItems: 5
                                                  }).embed(element_layer);
                                                  $('.zipcodeLayerWrap').show();
                                             }

                                             $('.btn.zipcode').on('click', function(e) {
                                                  openZipcode();
                                                  commonjs.eventClick(e);
                                             });
                                             //우편번호 클릭

                                             var checkAll = false;
                                             $('.guidebtn.finish').on('click', function(e) {
                                                  var checkCount = 0; //hidden 코드 2개(#setR, #code)

                                                  /*************** 배송정보 입력 *********************/
                                                  $('.inputData.req').each(function(index) {
                                                       console.log("----- index : " + index + "-----")
                                                       var $this = $(this);

                                                       if ($this.val().length == 0) {
                                                            //값이 입력되었는지 안되었는지 체크
                                                            $this.addClass('on').next('.alertMsg').css('visibility', 'visible');
                                                            checkAll = false;

                                                       } else {
                                                            //값이 입력되었으나 제대로 입력되지 않은 경우(휴대폰번호 4자리 미만) 확인
                                                            $this.removeClass('on').next('.alertMsg').css('visibility', 'hidden');
                                                            console.log('진입')

                                                            var numcheck = [];

                                                            if ($this.hasClass('phone') && $('#order_user_phone1').val() == "010" && $('#order_user_phone2').val().length < 4) {
                                                                 console.log('2번째 전화 자리수 부족')
                                                                 $('#order_user_phone2').addClass('on');
                                                                 numcheck[0] = false;
                                                                 checkAll = false;
                                                            } else {
                                                                 console.log('2번째 전화 자리수 완료')
                                                                 numcheck[0] = true;
                                                                 checkAll = true;
                                                            }


                                                            if ($this.hasClass('phone') && $('#order_user_phone3').val().length < 4) {
                                                                 console.log('3번째 전화 자리수 부족')
                                                                 $('#order_user_phone3').addClass('on');
                                                                 numcheck[1] = false;
                                                                 checkAll = false;
                                                            } else {
                                                                 console.log('3번째 전화 자리수 완료')
                                                                 numcheck[1] = true;
                                                                 checkAll = true;
                                                            }

                                                            if (!numcheck[0] || !numcheck[1]) {
                                                                 $this.siblings('.alertMsg.eq01').css('visibility', 'visible');
                                                            } else {
                                                                 $this.siblings('.alertMsg.eq01').css('visibility', 'hidden');
                                                            }
                                                       }
                                                       if (checkAll) checkCount = checkCount + 1;
                                                       console.log("checkAll : " + checkAll)
                                                       console.log("checkCount(통과된 아이템의 갯수) : " + checkCount)
                                                  });
                                                  //each
                                                  /*************** //배송정보 입력 *********************/

                                                  $('.inputData.req.on').eq(0).focus();

                                                  /*************** 이용약관 동의 *********************/
                                                  $('.agreebox').find('input[type="checkbox"]').each(function(index) {
                                                       var $this = $(this);
                                                       if ($this.prop("checked") == false) {
                                                            //값이 입력되었는지 안되었는지 체크
                                                            console.log('input : ' + $this.attr('id') + ' 비어있음');
                                                            $this.siblings('.alertMsg').css('visibility', 'visible');
                                                       } else {
                                                            $this.siblings('.alertMsg').css('visibility', 'hidden');
                                                       }
                                                  });

                                                  console.log(checkCount)
                                                  if ($('#agreeCheck').prop("checked") == true && $('#agreeCheck2').prop("checked") == true && $('#ageCheck').prop("checked") == true && checkCount == 8) {
                                                       // var param = {
                                                       //      code: $('#code').val(),
                                                       //      setR: $('#setR').val(),
                                                       //      delivery_username: $('#order_user_name').val(),
                                                       //      delivery_userphone: $('#order_user_phone1').val() + '-' + $('#order_user_phone2').val() + '-' + $('#order_user_phone3').val(),
                                                       //      delivery_zipcode: $('#delivery_zipcode').val(),
                                                       //      delivery_address: $('#delivery_address1').val() + ' ' + $('#delivery_address2').val(),
                                                       //      delivery_memo: $('#delivery_memo').val()
                                                       // }
                                                       // console.log(param)
                                                       // ajaxcallingJSON('./json/apply2.aspx', 'POST', param, function(vals) {
                                                       //      console.log(vals.result)
                                                       //      if (vals.result == "success") {
                                                       //           console.log('db 입력 성공 / 완료 페이지로 이동');
                                                       //           location.href = pageLink.end;
                                                       //      } else if (vals.result == "fail") {
                                                       //           console.log('db 입력 실패 / 안내 팝업창 띄우기');
                                                       //           alert("저장실패. 오류가 발생하였습니다.")
                                                       //      }
                                                       //      commonjs.eventClick(e);
                                                       // });
                                                       //ajax
                                                       location.href = pageLink.end;

                                                  }
                                                  /*************** //이용약관 동의 *********************/
                                                  console.log("===============================")
                                                  commonjs.eventClick(e);
                                             });
                                             //guidebtn.finish
                                        });
                                        //ajaxcallingHTML
                                   commonjs.eventClick(e);
                                   }
                                   //else
                              });
                              //.btn.confirm click enter
                         }
               }
               //valid
          }
          //if
          commonjs.eventClick(e);
     });


     $(window).on('load', function() {
          resizeFunction();
          setPopupTop();
     });
     $(window).on('resize', function() {
          resizeFunction();
          setPopupTop();
     });
     $(window).on('scroll mousewheel DOMMouseScroll', function(event) {
          scrollPos = $(window).scrollTop();
          scrollTop(scrollPos);
     });
});
