//2017-02-06 : 남인식
//2016-12-19 : 남인식

var defaultMobileScale = '960px';
var commonjs,validCheck,zipValidCheck;

////////////////////////////////////////////////////////
//  주소에 파라미터가 있는 경우 키, 값 가져오기 //
////////////////////////////////////////////////////////

var QueryString = function () {
      var QS = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i< vars.length;i++) {
        var pair = vars[i].split("=");
        if (typeof QS[pair[0]] === "undefined") {
          QS[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof QS[pair[0]] === "string") {
          var arr = [ QS[pair[0]],decodeURIComponent(pair[1]) ];
          QS[pair[0]] = arr;
        } else {
          QS[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }
     console.log('길이' +  Object.keys(QS).length);
     return QS;
}();
//end QueryString

//----------------------------------------------------------------------- 셋타임이 내장된 리사이즈 함수
function resizeModule(fn){
    "use strict";
    var setID;
    fn();
    $(window).resize(function(){
        window.clearTimeout(setID);
        setID = window.setTimeout(function(){
            if(typeof(fn) == 'function')fn();
//            console.log('s : ' + setID)
},10);
    });
}
//----------------------------------------------------------------------- 외부 html 파일 불러와서 엘리먼트에 파싱
function parseHTML(urlval, typeval, param, ele){
//    console.log(" ajaxcalling 모듈 실행 : " + urlval);
    $.ajax({
         type: typeval,
         url: urlval,
         dataType: "html",
         data : param,
         success: function(data){
            ele.html(data);
        },error: function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(urlval + " error : " + textStatus);
        },timeout: 100000
    });
}
//ajaxcallingHTML(json경로, 타입, 콜백함수)
//----------------------------------------------------------------------- 외부 html 형식 파일 불러와서 콜백하는 함수
function ajaxcallingHTML(urlval, typeval, param, callback){
    "use strict";
    var p = param;
    $.ajax({
         type: typeval,
         url: urlval,
         dataType: "html",
         data : param,
         success: function(data){
            callback(data,p);
        },error: function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(urlval + " error : " + textStatus);
        },timeout: 100000
    });
}
//ajaxcallingHTML(json경로, 타입, 콜백함수)

//----------------------------------------------------------------------- 외부 json 형식 파일 불러와서 콜백하는 함수
function ajaxcallingJSON(urlval, typeval, param, callback){
    "use strict";
    $.ajax({
         type: typeval,
         url: urlval,
         dataType: "JSON",
         data : param,
         success: function(data){
            callback(data);
        },error: function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(urlval + " error : " + textStatus);
        },timeout: 100000
    });
}
//ajaxcallingJSON(json경로, 타입, 콜백함수)
//----------------------------------------------------------------------- 외부 파일 불러와서 콜백하는 함수
function ajaxcalling(urlval, typeval, param, callback){
    "use strict";
    $.ajax({
         type: typeval,
         url: urlval,
         data : param,
         success: function(data){
            callback(data);
        },error: function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(urlval + " error : " + textStatus);
        },timeout: 100000
    });
}
//ajaxcalling(json경로, 타입, 콜백함수)

function ajaxcalling_jsonp(urlval, typeval, param, typeData, jsonpCall, callback){
    "use strict";
    $.ajax({
         type: typeval,
         url: urlval,
         data : param,
         dataType:typeData,
         jsonpCallback : jsonpCall,
//         jsonp : jsonpCall,
         success: function(data){
            callback(data);
        },error: function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(urlval + " error : " + textStatus);
        },timeout: 100000
    });
}
//ajaxcalling_jsonp(json경로, 타입, datatype, callback네임, 콜백함수)

////////////////////////////////////////////////////////
//  스케일 체크를 위한 엘리먼트 & 스타일 dom에 추가 //
////////////////////////////////////////////////////////

var styleNode = document.createElement('style');
    styleNode.type = 'text/css';
if(!!(window.attachEvent && !window.opera)) {
    styleNode.styleSheet.cssText = '#ResponsiveWebCheckDiv { background-color:rgb(255, 255, 255);} @media screen and (min-width:' + defaultMobileScale + ') { #ResponsiveWebCheckDiv { background-color:rgb(0, 0, 0);}};';
}else{
    var styleText = document.createTextNode('#ResponsiveWebCheckDiv { background-color:rgb(255, 255, 255);} @media screen and (min-width:' + defaultMobileScale + ') { #ResponsiveWebCheckDiv { background-color:rgb(0, 0, 0);}};');
    styleNode.appendChild(styleText);
}

$(document).ready(function(){
    $('body').append('<div id="ResponsiveWebCheckDiv" style="position:absolute; width:0px;height:0px;opacity:0;z-index:999999;"></div>');
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    ////////////////////////////////////////////////////////
    //  공통 실행 함수 //
    ////////////////////////////////////////////////////////

    commonjs = {
        eventClick : function (event) {
            if(event.preventDefault) {
                event.preventDefault(); //FF
            } else {
                event.returnValue = false; //IE
            }
            // <a href="#">와 같은 빈버튼 클릭시 브라우저 상단으로 올라가는 현상 방지
        },
        agentCheck : function(){
            if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
                return "MOBILE";
            }else{
                return "PC";
            }
            // 접속 디바이스 체크 용도
        },
        ieCheck : function(){
            var agent = navigator.userAgent.toLowerCase();
            if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
                return true;
            }else{
                return false;
            }
            // ie 브라우저 체크 용도
        },
        randomArray : function(array){
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
            // 배열을 받아서 랜덤으로 섞은 후 다시 배열로 반환
        },
        randomNumber : function(min, max){
            max = max+1;
            var RandVal = Math.random() * (max- min) + min;
            return Math.floor(RandVal);
            // 입력받은 min 이상 max 이하 안에서 랜덤 정수 반환
        },
        scrollToBody : function(positionY,speed,callback){
            if($.type(callback) !== "function")callback = function(){};
            if($('body').scrollTop() !== positionY){
                $('body').stop().animate({
                    scrollTop: positionY
                }, speed, 'easeInOutCirc', callback);
            }
            // 브라우저 num 포지션으로 이동한 뒤 콜백 실행
        },
        scrollToDiv : function(ele, speed, callback){
            if($.type(callback) !== "function")callback = function(){};
            if($('body').scrollTop() !== ele.offset().top){
                ele.stop().animate({
                    scrollTop: ele.offset().top
                }, speed, 'easeInOutCirc', callback);
            }
            //
            },
        isMobileScale : function(){
            if($('#ResponsiveWebCheckDiv').css('background-color') == 'rgb(255, 255, 255)' || $('#ResponsiveWebCheckDiv').css('background-color') == 'white'){
                //m
                return true;
            }else{
                //pc
                return false;
            }
        }
    };
    //end commonjs
    validCheck = {
          keyDown : function (e) {
              var key;
              if(window.event)
                  key = window.event.keyCode; //IE
              else
                  key = e.which; //firefox
              var event;
              if (key == 0 || key == 8 || key == 46 || key == 9){
                  event = e || window.event;
                  if (typeof event.stopPropagation != "undefined") {
                      event.stopPropagation();
                  } else {
                      event.cancelBubble = true;
                  }
                  return;
              }
              if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
                  e.preventDefault ? e.preventDefault() : e.returnValue = false;
              }
          },
          keyUp : function (e) {
              var key;
              if(window.event)
                  key = window.event.keyCode; //IE
              else
                  key = e.which; //firefox
              var event;
              event = e || window.event;
              if ( key == 8 || key == 46 || key == 37 || key == 39 )
                  return;
              else
                  // event.target.value = event.target.value.replace(/[^0-9]/g, "");
                  event.target.value = autoHypenPhone(event.target.value);
          },
          focusOut : function (ele) {
              // ele.val(ele.val().replace(/[^0-9]/g, ""));
              ele.val(autoHypenPhone(ele.val()));
          }
      };

      function autoHypenPhone(str){
              str = str.replace(/[^0-9]/g, '').substr(0,12);
              var tmp = '';
              if( str.length < 4){
                return str;
          }else if(str.length < 8){
                tmp += str.substr(0, 4);
                tmp += '-';
                tmp += str.substr(4);
                return tmp;
              }else if(str.length < 11){
                tmp += str.substr(0, 4);
                tmp += '-';
                tmp += str.substr(4, 4);
                tmp += '-';
                tmp += str.substr(8);
                return tmp;
              }else{
                tmp += str.substr(0, 4);
                tmp += '-';
                tmp += str.substr(4, 4);
                tmp += '-';
                tmp += str.substr(8);
                return tmp;
              }
              return str;
        }

        zipValidCheck = {
              keyDown : function (e) {
                  var key;
                  if(window.event)
                      key = window.event.keyCode; //IE
                  else
                      key = e.which; //firefox
                  var event;
                  if (key == 0 || key == 8 || key == 46 || key == 9){
                      event = e || window.event;
                      if (typeof event.stopPropagation != "undefined") {
                          event.stopPropagation();
                      } else {
                          event.cancelBubble = true;
                      }
                      return;
                  }
                  if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
                      e.preventDefault ? e.preventDefault() : e.returnValue = false;
                  }
              },
              keyUp : function (e) {
                  var key;
                  if(window.event)
                      key = window.event.keyCode; //IE
                  else
                      key = e.which; //firefox
                  var event;
                  event = e || window.event;
                  if ( key == 8 || key == 46 || key == 37 || key == 39 )
                      return;
                  else
                      event.target.value = event.target.value.replace(/[^0-9]/g, "");
                      // event.target.value = autoHypenPhone(event.target.value);
              },
              focusOut : function (ele) {
                  ele.val(ele.val().replace(/[^0-9]/g, ""));
                  // ele.val(autoHypenPhone(ele.val()));
              }
          };

});
