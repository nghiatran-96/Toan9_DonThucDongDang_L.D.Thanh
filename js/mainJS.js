// *** Tỷ lệ khung hình **** //
var _templateType=1;
var _fullScreenStatus=0;
var wH=0;var wW=0;var tyle=920/470;
// Xử lý di chuyển khung thông báo trang câu hỏi và đáp án câu hỏi có thể di chuyển
$('.DraggablePanel').on('mouseenter',function(){$(this).draggable();});
$('#leftMainContent').on('mouseleave',function(){$('.DraggablePanel').mouseup();$('.DraggablePanel').each(function(){var _curPosition=$(this).position();if (_curPosition.left>($('#leftMainContent').width()-20))$(this).css('left',$('#leftMainContent').width()-30+'px');if (_curPosition.left<-20)$(this).css('left',-($(this).width()-20)+'px');if (_curPosition.top>($('#leftMainContent').height()-20))$(this).css('top',$('#leftMainContent').height()-30+'px');if (_curPosition.top<-($(this).height()-20))$(this).css('top',-($(this).height()-20)+'px');});$('.DraggableAnswer').mouseup();$('.DraggableAnswer').each(function(){var _curPosition=$(this).position();if (_curPosition.left>($('#leftMainContent').width()-20))$(this).css('left',$('#leftMainContent').width()-30+'px');if (_curPosition.left<-20)$(this).css('left',-($(this).width()-20)+'px');if (_curPosition.top>($('#leftMainContent').height()-20))$(this).css('top',$('#leftMainContent').height()-30+'px');if (_curPosition.top<-($(this).height()-20))$(this).css('top',-($(this).height()-20)+'px');});});
// *** Hết phần xử lý khung *** //
$(window).on('load',function(){$('.pageName').first().addClass('RightMenuCurrent');$('.pageNameThumb').first().addClass('RightMenuCurrent');wW=$(window).innerWidth();wH=$(window).innerHeight();resizeAll(wW,wH);$('.mainRightBotPageList').jScrollPane({autoReinitialise: true,showArrows: true});var topBotRightH=$('#mainRightTopBotRight').height();$('.mainRightTopBotRight').css('font-size', topBotRightH*0.18+'px');$('.mainRightBotPageList').css('height',$('#mainRightBot').height() - $('#mainRightBotHeader').height()+'px');$('.mainRightBotPageList').css('width',$('#mainRightBot').width() + 0.5 +'px');$('.jspPane').css('border-right',0 + 'px');$('.jspPane').css('width',$('#mainRightBot').width() - $('.jspVerticalBar').width() +'px');$('.jspTrack').css('height',$('.jspVerticalBar').height() - 2*$('.jspArrow').height() +'px');$('.pageName').css('height',$('.jspContainer').height()*0.084 +'px');if ($('.jspPane').height()<$('.jspContainer').height()) $('.jspPane').css('height',$('.jspContainer').height());$('.jspPane').css('border',$('.jspPane').width()*0.03 + 'px solid #F1F1F1');$('.jspPane').css('background','#F1F1F1');$('#leftMainContent').children('.CELPage').addClass('hidden');if ( typeof $('#wtmImage').attr('src') != typeof undefined && $('#wtmImage').attr('src').length==0 && _imageWTM.length>0) $('#wtmImage').attr('src','data:image/png;base64,' + _imageWTM);if (_imageWTM=='') $('#wtmImage').css('visibility','hidden'); $('#leftMainContent').find('video').each(function(){if (typeof $(this).attr('maxVol')!=typeof undefined){var _maxVol=parseFloat($(this).attr('maxVol')/100);if (this.volume > _maxVol)this.volume = _maxVol;}}); $('#leftMainContent').find('audio').each(function(){if (typeof $(this).attr('maxVol')!=typeof undefined){var _maxVol=parseFloat($(this).attr('maxVol')/100);if (this.volume > _maxVol)this.volume = _maxVol;}}); if (typeof ShowPlayer !== 'undefined' && $.isFunction(ShowPlayer)) ShowPlayer();}); 
$('.pageName').on('click',function(){
    if (ReNhanhCauHoi()==false){
        if (CheckMustAnswerQuestion()==true) // 19-9-16 Dũng
        {
            var page = $('#leftMainContent').children('div > .CELPage').not('.hidden');
            var id=$(this).find('.pageNameLeft').attr('id').substring(9,$(this).find('.pageNameLeft').attr('id').length);
            if (typeof $('#'+id).attr('questype')!= typeof undefined) CountAnswerMaxTime(); else if (typeof timeQuestionPageInterval!=typeof undefined)  clearInterval(timeQuestionPageInterval);
            var idIndex=$(page[page.length-1]).attr('id');
            if(idIndex != id){
                $('#leftMainContent').children('.CELPage').css('visibility','');
                $('#leftMainContent').children('.CELPage').addClass('hidden');
                clickShowPage(id);
            }
            $('.DraggablePanel').css('visibility','hidden');
            $('.DraggablePanel').css('z-index','-1');
            if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
            if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice();
            if (typeof CreatePareConnectCrossAnswer !== 'undefined' && $.isFunction(CreatePareConnectCrossAnswer)) CreatePareConnectCrossAnswer();
        } else ShowMessMustAnswer();
    }
});
$('.pageNameThumb').on('click',function(){
    if (ReNhanhCauHoi()==false){
        if (CheckMustAnswerQuestion()==true) // 19-9-16 Dũng
        {
            var page = $('#leftMainContent').children('div > .CELPage').not('.hidden');
            var id=$(this).find('.pageNameLeftThumb').attr('id').substring(10,$(this).find('.pageNameLeftThumb').attr('id').length);
            if (typeof $('#'+id).attr('questype')!= typeof undefined) CountAnswerMaxTime(); else if (typeof timeQuestionPageInterval!=typeof undefined)  clearInterval(timeQuestionPageInterval);
            var idIndex=$(page[page.length-1]).attr('id');
            if(idIndex != id){
                $('#leftMainContent').children('.CELPage').css('visibility','');
                $('#leftMainContent').children('.CELPage').addClass('hidden');
                clickShowPage(id);
            }
            $('.DraggablePanel').css('visibility','hidden');
            $('.DraggablePanel').css('z-index','-1');
            if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
            if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice();
            if (typeof CreatePareConnectCrossAnswer !== 'undefined' && $.isFunction(CreatePareConnectCrossAnswer)) CreatePareConnectCrossAnswer();
        } else ShowMessMustAnswer();
    }
});
function CheckMustAnswerQuestion(){$('.DragableAnswer').each(function(){if (typeof $(this).attr('clozeId') != typeof undefined && $(this).attr('id').indexOf('swerContent')>0){$(this).css('visibility','');}}); var _curPage=GetCurrentPage();if (typeof _curPage != typeof undefined){if (_curPage.attr('id').indexOf('QuestionPage_')>0){if (_curPage.attr('mustanswer')=='True') return false; else return true;}else return true;}else return true;}
function ShowMessMustAnswer(){$('#ConfirmAnswerRight_OnePage_Content_IMG').attr('src','images/button/Question/messageWarning.png');$('#ConfirmAnswerRight_OnePage_Content_Content').text('Trả lời câu hỏi này để tiếp tục!');$('#ConfirmAnswerRight_OnePage_Message').css('visibility','visible');$('#ConfirmAnswerRight_OnePage_Message').css('z-index','19998');$('#ConfirmAnswerRight_OnePage_Content_Content').css('line-height',$('#ConfirmAnswerRight_OnePage_Content_btnAccept').height() + 'px');$('#ConfirmAnswerRight_OnePage_Content_Content').css('font-size',$('#ConfirmAnswerRight_OnePage_Content_btnAccept').height()*0.5 + 'px');$('#ConfirmAnswerRight_OnePage_Content_Content').css('padding-top',$('#ConfirmAnswerRight_OnePage_Content_btnAccept').height()/1.5 + 'px');}
$('#mainRightBotHeaderLeft').on('click',function(){$(this).addClass('mainRightBotHeaderActive'); $('#mainRightBotHeaderRight').removeClass('mainRightBotHeaderActive');$('#mainRightBotPageView').children(':eq(1)').css('display','none');$('#mainRightBotPageView').children(':eq(0)').css('display','');});
$('#mainRightBotHeaderRight').on('click',function(){$(this).addClass('mainRightBotHeaderActive'); $('#mainRightBotHeaderLeft').removeClass('mainRightBotHeaderActive');$('#mainRightBotPageView').children(':eq(0)').css('display','none');$('#mainRightBotPageView').children(':eq(1)').css('display','');});
$('#mainBottomBtnReplay').on('click',function(){$('.pageName').first().trigger('click'); $('.pageNameThumb').first().trigger('click');});
function checkVersionIE(){var ua = window.navigator.userAgent;var msie = ua.indexOf ( 'MSIE ' );if ( msie > 0 ) return parseInt (ua.substring (msie+5, ua.indexOf ('.', msie ))); else return 0;}
function resizeAll(p1,p2){var container=document.getElementById('container');var content=document.getElementById('mainContent');if (_fullScreenStatus==0){if (_templateType==3){$('#rightMainContent').css('display','none');$('#leftMainContent').css('width','99.5%');$('#mainBottomFull').css('width','99.5%');if ((p1/p2)<tyle) {container.style.height= (p1 / tyle)+'px';container.style.width= (p1) * 0.757 +'px';content.style.top = ((p2 - (p1/tyle)*0.98)/tyle)+'px';content.style.left = (p1-p1*0.98)/tyle + 'px';};if ((p1/p2)>tyle) {container.style.height= (p2)+'px';container.style.width= (p2*tyle) * 0.757+'px';content.style.top = (p2-p2*0.98)/tyle +'px';};if (p1>1200 && p2>612) {container.style.height= (612)+'px';container.style.width= (1200) * 0.757+'px';content.style.top = ((p2-(612))/2) +'px';};if (p1<600) {content.style.top = ((p2-(306))/2) +'px';container.style.width=600 * 0.757 + 'px';$('#container').css('min-width',600 * 0.757 + 'px');};}else{if ((p1/p2)<tyle) {container.style.height= (p1 / tyle)+'px';container.style.width= (p1)+'px';content.style.top = ((p2 - (p1/tyle)*0.98)/tyle)+'px';content.style.left = (p1-p1*0.98)/tyle + 'px';};if ((p1/p2)>tyle) {container.style.height= (p2)+'px';container.style.width= (p2*tyle)+'px';content.style.top = (p2-p2*0.98)/tyle +'px';};if (p1>1200 && p2>612) {container.style.height= (612)+'px';container.style.width= (1200)+'px';content.style.top = ((p2-(612))/2) +'px';};if (p1<600) {content.style.top = ((p2-(306))/2) +'px';};}}var contentH=$('#mainContent').height();$('.ques-content-p').css('font-size', contentH*0.035+'px');$('.ans-content-p').css('font-size', contentH*0.025+'px');$('#mainTittleContent').css('font-size', contentH*0.03+'px');$('.seo-bold').css('font-size', contentH*0.025+'px');$('.seo-light').css('font-size', contentH*0.025+'px');$('.pageNameLeft').css('font-size', contentH*0.022+'px');$('.pageNameRight').css('font-size', contentH*0.022+'px');$('#mainRightBotHeaderContent').css('font-size', contentH*0.023+'px');$('#mainRightBotHeaderContent').css('line-height', contentH*0.05+'px');$('#mainRightBotHeaderContentRight').css('font-size', contentH*0.023+'px');$('#mainRightBotHeaderContentRight').css('line-height', contentH*0.05+'px');var topBotRightH=$('#mainRightTopBotRight').height();$('.mainRightTopBotRight').css('font-size', topBotRightH*0.2+'px');$('.mainRightBotPageList').css('height',$('#mainRightBot').height() - $('#mainRightBotHeader').height()+'px');$('.mainRightBotPageList').css('width',$('#mainRightBot').width() + 0.5 +'px');$('.jspPane').css('width',$('#mainRightBot').width() - $('.jspVerticalBar').width() +'px');$('.jspTrack').css('height',$('.jspVerticalBar').height() - 2*$('.jspArrow').height() +'px');$('.pageName').css('height',$('#mainContent').height()*0.05 +'px');$('.pageNameThumb').css('height',$('#mainContent').height()*0.132 +'px');$('.DraggablePanel').css('visibility','hidden');$('.DraggablePanel').css('z-index','-1');if (typeof InitMindMapIMG !== 'undefined' && $.isFunction(InitMindMapIMG)) InitMindMapIMG();$('.jspPane').css('border',$('.jspPane').width()*0.03 + 'px solid #F1F1F1');if (typeof ResizeBorderAndText !== 'undefined' && $.isFunction(ResizeBorderAndText)) ResizeBorderAndText(); if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice(); if (typeof ResizeTblPageList !== 'undefined' && $.isFunction(ResizeTblPageList)) ResizeTblPageList(); }
$('#container').on('mouseover',function(){$('.jspPane').each(function(){var borderWidth = parseFloat($(this).css('border-left-width'));if (borderWidth>($(this).width()*0.03))$(this).css('border-width',$(this).width()*0.03 + 'px');})});
var _imageWTM='';
function ExitFullScreen(){$('#leftMainContent').css('left','0.25%');$('#leftMainContent').css('top','0.5%');$('#leftMainContent').css('bottom','auto');$('#leftMainContent').css('right','auto');$('#leftMainContent').css('width','75%');$('#leftMainContent').css('height','92%');wW=$(window).innerWidth();wH=$(window).innerHeight();resizeAll(wW,wH);if (_templateType==3) $('#leftMainContent').css('width','99.5%');if (_templateType==1){$('#leftMainContent').css('right','0.25%');$('#leftMainContent').css('top','0.5%');$('#leftMainContent').css('bottom','auto');$('#leftMainContent').css('left','auto');$('#leftMainContent').css('width','75%');$('#leftMainContent').css('height','92%');}_fullScreenStatus=0;}
$('#mainBottomBtnZoom').on('click',function(){_fullScreenStatus=1;var docElement, request;docElement = document.getElementById('leftMainContent');request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullscreen; if(typeof request!='undefined' && request){request.call(docElement);var left=0.0;var top=0.0;var bot=0.0;var right=0.0;var w=0.0;var h=0.0;wW=screen.width;wH=screen.height;if (wW/wH == 4/3){w=wW;h=w*10/16;top=(wH-h)/2;bot=top;}if (wW/wH == 16/9){h=wH;w=h*16/10;left=(wW-w)/2;right=left;}if (_templateType==3){$('#leftMainContent').css('left',left + 'px');$('#leftMainContent').css('top',top + 'px');$('#leftMainContent').css('bottom',bot + 'px');$('#leftMainContent').css('right',right + 'px');$('#leftMainContent').css('width',parseFloat(100*(wW-right-left)/wW) + '%' );$('#leftMainContent').css('height','auto');}else{$('#leftMainContent').css('left',left + 'px');$('#leftMainContent').css('top',top + 'px');$('#leftMainContent').css('bottom',bot + 'px');$('#leftMainContent').css('right',right + 'px');$('#leftMainContent').css('width','auto');$('#leftMainContent').css('height','auto');}}});
// *** Thoát fullScreenMode *** //
document.addEventListener('fullscreenchange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});
document.addEventListener('webkitfullscreenchange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});
document.addEventListener('mozfullscreenchange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});
document.addEventListener('MSFullscreenChange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});// *** Hết xử lý thoát fullScreenMode *** //
$('.QuestionResultPanelContent_Bottom_NoScore_Right').on('click',function(){$(this).parent().parent().css('z-index',-1);$(this).parent().parent().css('visibility','hidden');});
$('.QuestionResultPanelContent_Bottom').on('click',function(){$(this).parent().parent().css('z-index',-1);$(this).parent().parent().css('visibility','hidden');});
function GetMaxIndex(pageID){var _obj=$('#'+pageID);var _max=_obj.zIndex();_obj.children().each(function(){var _k=GetMaxIndexSub($(this));if (_k>_max)_max=_k;   });return _max;}
function GetMaxIndexSub(_obj){var _max=_obj.zIndex();_obj.children().each(function(){if (typeof $(this) != typeof undefined && $(this).zIndex()>_max)_max=$(this).zIndex();});return _max;}
function ResizeTblPageList(){var _allHeight=0.0;$('#tblPageList').children().each(function(){if (typeof parseFloat($(this).height()) != typeof undefined)_allHeight+= 1 + parseFloat($(this).height());});$('.ConfirmAnswerLeft_Left_btnPre').each(function(){$(this).children().first().css('height',parseFloat(0.8 * $('.ConfirmAnswerLeft_Left_btnPre').parent().parent().parent().height())-1 + 'px');});$('.ConfirmAnswerLeft_Left_btnNext').each(function(){$(this).children().first().css('height',parseFloat(0.8 * $('.ConfirmAnswerLeft_Left_btnNext').parent().parent().parent().height())-1 + 'px');});if (_allHeight<$('#tblPageList').parent().parent().height() && $('#tblPageList').parent().attr('class')=='jspPane') $('#tblPageList').parent().css('height',$('#tblPageList').parent().parent().height()+'px'); else if (_allHeight>$('#tblPageList').parent().parent().height() && $('#tblPageList').parent().attr('class')=='jspPane') $('#tblPageList').parent().css('height',_allHeight+'px');}// *** Phục vụ đa phương tiện *** //
function ShowPlayer(){$('.iconAudio').each(function(){$(this).parent().parent().mouseenter(function(){$(this).find('audio').each(function(){$(this).attr('controls', true);});});$(this).parent().parent().mouseleave(function(){$(this).find('audio').each(function(){$(this).attr('controls', false);});});});$('#leftMainContent').find('audio').each(function(){var _aWidth=$(this).width();var _parWidth=$(this).parent().parent().width();if (_parWidth<_aWidth){$(this).parent().css('left',(_parWidth-_aWidth)/2 + 'px');} else if (_parWidth>_aWidth){$(this).parent().css('left',(_parWidth-_aWidth)/2 + 'px');}});$('video').mouseenter(function(){$(this).attr('controls', true);if (typeof $(this).attr('id')!=typeof undefined && $(this).attr('id')=='mainRightTopBotLeft_Video'){$(this).attr('controls', false);}});$('video').mouseleave(function(){$(this).attr('controls', false);if (typeof $(this).attr('id')!=typeof undefined && $(this).attr('id')=='mainRightTopBotLeft_Video'){$(this).attr('controls', false);}});}
function PlayMedia(namePage){$('#' + namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0 && $(this).hasClass('VideoDemonstration')==false)this.play();});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)this.play();});}
function PauseMedia(namePage){$('#' + namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)this.pause();});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)this.pause();});}
function StopMedia(namePage){$('#' + namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){$(this).get(0).pause();this.currentTime = 0;}});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){$(this).get(0).pause();this.currentTime = 0;}});}
function StopAllMedia(){$('#leftMainContent').children('.CELPage').each(function(){$(this).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){this.pause();this.currentTime = 0;}});$(this).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){this.pause();this.currentTime = 0;}});});}
function stopFlash(IdCelPage) {var child = $('#' + IdCelPage).find('EMBED');for (var i = 0; i < child.length; i++) {var id = $(child[i]).attr('id');document.getElementById(id).StopPlay();}}
function playFlash(IdCelPage) {var child = $('#' + IdCelPage).find('EMBED');for (var i = 0; i < child.length; i++) {var id = $(child[i]).attr('id');document.getElementById(id).Play();}}
function ControlMedia(){var timeSlide = $('#slider-value').html();var timeSlide = parseFloat(parseFloat(timeSlide).toFixed(1));var _curPage = GetCurrentPage();var namePage =_curPage.attr('id');$('#' +namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){var vid = document.getElementById($(this).attr('id'));vid.currentTime = timeSlide;}});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){var aid = document.getElementById($(this).attr('id'));aid.currentTime = timeSlide;}});}
// **** Phục vụ chủ đề **** //
function inlineTest($el,$insert, saveOptions, testOptions) {var svg = $el.html();var canvas = $el.find(testOptions && testOptions.selector || 'svg')[0];svgAsDataUri(canvas,saveOptions,function(uri){$insert.append('<img class="ThemeIMGBackground" src=' + uri + ' />');});}
// **** Phục vụ thuyết minh, đồng bộ //
function GetCurrentPage() {var _curPage;$('#leftMainContent').children().each(function(){if ($(this).hasClass('CELPage')==true && $(this).hasClass('hidden')==false){_curPage=$(this);return _curPage;}});return _curPage;}
function StopGlobalDemonstration(stop)
{
    var timeSlide = $('#slider-value').html();var timeSlide = parseFloat(parseFloat(timeSlide).toFixed(1));var time = timeSlide;var timeStop = time.toFixed(1) * 10;var nubmerPage = checkNumberPage();var list = listObject[nubmerPage];var endTime = list.time;var percent = Math.abs(((100 * timeStop) / (endTime * 10)) - 100);var _curTime= endTime - (percent * endTime/100);
    var _curPage=GetCurrentPage();
    if (typeof _curPage != typeof undefined)
    {
        _curPage.find('audio').each(function(){
            if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0 && $(this).hasClass('AudioDemonstration'))
            {
                if (stop==true) this.pause();
                else
                {
                    if (_curTime<this.duration){this.currentTime=_curTime;this.play();}
                }
            }
        });
    }
    $('#mainRightTopBotLeft').find('video').each(function(){
        if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)
        {
            if (stop==true) this.pause();
            else
            {
                if (_curTime<this.duration){this.currentTime=_curTime;this.play();}
            }
        }
    });
}
window.onresize = function(event){
    wW=$(window).innerWidth();wH=$(window).innerHeight();
    resizeAll(wW,wH); 
    // Thay đổi kích thước chủ đề
    if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
    if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
    if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice();
    if (typeof CreatePareConnectCrossAnswer !== 'undefined' && $.isFunction(CreatePareConnectCrossAnswer)) CreatePareConnectCrossAnswer();
    if (typeof InitDragableAnswer !== 'undefined' && $.isFunction(InitDragableAnswer)) InitDragableAnswer();
    if (typeof InitQuestionPages !== 'undefined' && $.isFunction(InitQuestionPages)) InitQuestionPages();
};
var listBackGroundAudio = [{Name:'BGAudio_0', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3' , Duration: 243.5395625}];
var listSilent_BGAudio_0 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_0.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_0.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_1', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_1 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_1.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_1.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_2', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_2 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_2.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_3', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});

listBackGroundAudio.push({Name:'BGAudio_4', StartTime:0, SRC:'Data/e9c2cbf4-6f78-4a78-badc-aeab52ab99bc.mp3', Duration: 226.9365});

listBackGroundAudio.push({Name:'BGAudio_5', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_5 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_5.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_5.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_6', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_6 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_6.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_7', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});

listBackGroundAudio.push({Name:'BGAudio_8', StartTime:0, SRC:'Data/e9c2cbf4-6f78-4a78-badc-aeab52ab99bc.mp3', Duration: 226.9365});

listBackGroundAudio.push({Name:'BGAudio_9', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_9 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_9.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_9.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_10', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_10 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_10.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_10.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_11', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_11 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_11.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_12', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_12 = [{StartTime:60.6, Duration:135.84}];

listBackGroundAudio.push({Name:'BGAudio_13', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_13 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_13.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_13.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_14', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_14 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_14.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_14.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_15', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_15 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_15.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_16', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_16 = [{StartTime:60.6, Duration:135.84}];

listBackGroundAudio.push({Name:'BGAudio_17', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_17 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_17.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_17.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_18', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_18 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_18.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_18.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_19', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_19 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_19.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_20', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_20 = [{StartTime:60.84, Duration:133.8}];

listBackGroundAudio.push({Name:'BGAudio_21', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_21 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_21.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_21.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_22', StartTime:0, SRC:'Data/ad75a0ef-8282-410f-a9aa-d80d2120ce15.mp3', Duration: 114.270375});

listBackGroundAudio.push({Name:'BGAudio_23', StartTime:0, SRC:'Data/8cf85d91-3241-4a6e-9792-c18407e2daef.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_24', StartTime:0, SRC:'Data/c8224c3e-c734-45ad-b49f-494b40e105c9.mp3', Duration: 239.553625});

listBackGroundAudio.push({Name:'BGAudio_25', StartTime:0, SRC:'Data/644ce926-6b5c-4593-b7e0-c9a123d6d5d7.mp3', Duration: 83.2260625});

listBackGroundAudio.push({Name:'BGAudio_26', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_26 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_26.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_26.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_27', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_27 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_27.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_27.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_28', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_28 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_28.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_29', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_29 = [{StartTime:64.2, Duration:130.8}];

listBackGroundAudio.push({Name:'BGAudio_30', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_30 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_30.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_30.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_31', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_31 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_31.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_31.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_32', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_32 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_32.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_33', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_33 = [{StartTime:64.2, Duration:130.8}];

listBackGroundAudio.push({Name:'BGAudio_34', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_34 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_34.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_34.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_35', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_35 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_35.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_36', StartTime:0, SRC:'Data/402dc152-26f4-432d-81fe-44d516be5dfe.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_37', StartTime:0, SRC:'Data/5ccd28a9-117b-4081-ad72-189f84a43e48.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_38', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_38 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_38.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_38.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_39', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_39 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_39.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_40', StartTime:0, SRC:'Data/402dc152-26f4-432d-81fe-44d516be5dfe.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_41', StartTime:0, SRC:'Data/5ccd28a9-117b-4081-ad72-189f84a43e48.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_42', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_42 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_42.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_42.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_43', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_43 = [{StartTime:120.530143369176, Duration:75.84}];

listBackGroundAudio.push({Name:'BGAudio_44', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});
var listSilent_BGAudio_44 = [{StartTime:0.677562724014333, Duration:26.4}];

listBackGroundAudio.push({Name:'BGAudio_45', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_46', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_46 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_46.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_46.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_47', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_47 = [{StartTime:120.530143369176, Duration:75.84}];

listBackGroundAudio.push({Name:'BGAudio_48', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});
var listSilent_BGAudio_48 = [{StartTime:0.677562724014333, Duration:26.4}];

listBackGroundAudio.push({Name:'BGAudio_49', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_50', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_50 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_50.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_50.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_51', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_51 = [{StartTime:120.530143369176, Duration:75.84}];

listBackGroundAudio.push({Name:'BGAudio_52', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});
var listSilent_BGAudio_52 = [{StartTime:0.677562724014333, Duration:26.4}];

listBackGroundAudio.push({Name:'BGAudio_53', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_54', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_54 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_54.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_54.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_55', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});
var listSilent_BGAudio_55 = [{StartTime:120.530143369176, Duration:75.84}];

listBackGroundAudio.push({Name:'BGAudio_56', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});
var listSilent_BGAudio_56 = [{StartTime:0.677562724014333, Duration:26.4}];

listBackGroundAudio.push({Name:'BGAudio_57', StartTime:0, SRC:'Data/667d030a-a5c0-46ab-8ea6-91a3772fdd20.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_58', StartTime:0, SRC:'Data/e209290e-db0b-4b6d-b545-c9f819d0a250.mp3', Duration: 235.713625});

listBackGroundAudio.push({Name:'BGAudio_59', StartTime:0, SRC:'Data/cf99bffd-035d-41e0-bcf8-bc324499b990.mp3', Duration: 243.5395625});
var listSilent_BGAudio_59 = [{StartTime:29.323870967742, Duration:46.68}];
listSilent_BGAudio_59.push({StartTime:175.076129032258, Duration:66.36});

listBackGroundAudio.push({Name:'BGAudio_60', StartTime:0, SRC:'Data/e209290e-db0b-4b6d-b545-c9f819d0a250.mp3', Duration: 235.713625});
var listSilent_BGAudio_60 = [{StartTime:0.655053763440965, Duration:47.76}];
listSilent_BGAudio_60.push({StartTime:116.489032258065, Duration:116.4});

listBackGroundAudio.push({Name:'BGAudio_61', StartTime:0, SRC:'Data/00452765-52a7-4d0a-81a2-b0017829efe8.mp3', Duration: 200.187125});

listBackGroundAudio.push({Name:'BGAudio_62', StartTime:0, SRC:'Data/0529f7e6-75c0-4c9c-a7ef-1fc79f44c872.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_63', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_63 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_63.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_63.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_64', StartTime:0, SRC:'Data/eddcc169-c04b-4a5c-8955-06923afa17b5.mp3', Duration: 156.4211875});
var listSilent_BGAudio_64 = [{StartTime:0.450752688172242, Duration:45.84}];

listBackGroundAudio.push({Name:'BGAudio_65', StartTime:0, SRC:'Data/3b749c20-d614-4f82-a2e4-c6a96b6389b5.mp3', Duration: 198.854875});
var listSilent_BGAudio_65 = [{StartTime:0.533333333333539, Duration:80.16}];

listBackGroundAudio.push({Name:'BGAudio_66', StartTime:0, SRC:'Data/b37343c8-1bb8-4298-bce8-eb3194aca6f0.mp3', Duration: 200.187125});

listBackGroundAudio.push({Name:'BGAudio_67', StartTime:0, SRC:'Data/e7d5e7b8-43a2-47f7-8308-8c878a98b69c.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_68', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_68 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_68.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_68.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_69', StartTime:0, SRC:'Data/eddcc169-c04b-4a5c-8955-06923afa17b5.mp3', Duration: 156.4211875});
var listSilent_BGAudio_69 = [{StartTime:0.450752688172242, Duration:45.84}];

listBackGroundAudio.push({Name:'BGAudio_70', StartTime:0, SRC:'Data/3b749c20-d614-4f82-a2e4-c6a96b6389b5.mp3', Duration: 198.854875});
var listSilent_BGAudio_70 = [{StartTime:0.533333333333539, Duration:80.16}];

listBackGroundAudio.push({Name:'BGAudio_71', StartTime:0, SRC:'Data/b37343c8-1bb8-4298-bce8-eb3194aca6f0.mp3', Duration: 200.187125});

listBackGroundAudio.push({Name:'BGAudio_72', StartTime:0, SRC:'Data/e7d5e7b8-43a2-47f7-8308-8c878a98b69c.mp3', Duration: 199.89975});

listBackGroundAudio.push({Name:'BGAudio_73', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_73 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_73.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_73.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_74', StartTime:0, SRC:'Data/e682993a-7cfd-4dac-b5c8-0056aa8c4ff8.mp3', Duration: 246.56975});
var listSilent_BGAudio_74 = [{StartTime:0.96422939068103, Duration:49.68}];
listSilent_BGAudio_74.push({StartTime:119.435483870968, Duration:105.6});

listBackGroundAudio.push({Name:'BGAudio_75', StartTime:0, SRC:'Data/c2455f79-2655-4d92-90df-d0d30d29e59d.mp3', Duration: 198.9485625});

listBackGroundAudio.push({Name:'BGAudio_76', StartTime:0, SRC:'Data/b3f77ff1-17cc-42b4-ba65-a120c69e2780.mp3', Duration: 200.187125});

listBackGroundAudio.push({Name:'BGAudio_77', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_77 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_77.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_77.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_78', StartTime:0, SRC:'Data/84fed534-f3e3-43cc-a6af-6ea837aba77c.mp3', Duration: 156.0555});
var listSilent_BGAudio_78 = [{StartTime:1.20645161290333, Duration:46.08}];
listSilent_BGAudio_78.push({StartTime:118.13935483871, Duration:37.8});

listBackGroundAudio.push({Name:'BGAudio_79', StartTime:0, SRC:'Data/ce167d30-6b74-4f14-b6e1-7abc9461a08d.mp3', Duration: 200.187125});
var listSilent_BGAudio_79 = [{StartTime:0.332043010752914, Duration:82.2}];

listBackGroundAudio.push({Name:'BGAudio_80', StartTime:0, SRC:'Data/36ce11cf-1c57-44c3-a6d9-28b899150b42.mp3', Duration: 197.590125});

listBackGroundAudio.push({Name:'BGAudio_81', StartTime:0, SRC:'Data/b3d1a3df-8ea1-47f7-b054-4725a53a384e.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_82', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_82 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_82.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_82.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_83', StartTime:0, SRC:'Data/84fed534-f3e3-43cc-a6af-6ea837aba77c.mp3', Duration: 156.0555});
var listSilent_BGAudio_83 = [{StartTime:1.20645161290333, Duration:46.08}];
listSilent_BGAudio_83.push({StartTime:118.13935483871, Duration:37.8});

listBackGroundAudio.push({Name:'BGAudio_84', StartTime:0, SRC:'Data/ce167d30-6b74-4f14-b6e1-7abc9461a08d.mp3', Duration: 200.187125});
var listSilent_BGAudio_84 = [{StartTime:0.332043010752914, Duration:82.2}];

listBackGroundAudio.push({Name:'BGAudio_85', StartTime:0, SRC:'Data/36ce11cf-1c57-44c3-a6d9-28b899150b42.mp3', Duration: 197.590125});

listBackGroundAudio.push({Name:'BGAudio_86', StartTime:0, SRC:'Data/b3d1a3df-8ea1-47f7-b054-4725a53a384e.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_87', StartTime:0, SRC:'Data/7b7ec342-b675-480f-8dd4-533bcaeb9cf0.mp3', Duration: 243.5395625});
var listSilent_BGAudio_87 = [{StartTime:206.422078853047, Duration:33.6}];
listSilent_BGAudio_87.push({StartTime:177.382078853047, Duration:10.68});
listSilent_BGAudio_87.push({StartTime:32.5240860215054, Duration:47.88});

listBackGroundAudio.push({Name:'BGAudio_88', StartTime:0, SRC:'Data/84fed534-f3e3-43cc-a6af-6ea837aba77c.mp3', Duration: 156.0555});
var listSilent_BGAudio_88 = [{StartTime:1.20645161290333, Duration:46.08}];
listSilent_BGAudio_88.push({StartTime:118.13935483871, Duration:37.8});

listBackGroundAudio.push({Name:'BGAudio_89', StartTime:0, SRC:'Data/ce167d30-6b74-4f14-b6e1-7abc9461a08d.mp3', Duration: 200.187125});
var listSilent_BGAudio_89 = [{StartTime:0.332043010752914, Duration:82.2}];

listBackGroundAudio.push({Name:'BGAudio_90', StartTime:0, SRC:'Data/36ce11cf-1c57-44c3-a6d9-28b899150b42.mp3', Duration: 197.590125});

listBackGroundAudio.push({Name:'BGAudio_91', StartTime:0, SRC:'Data/b3d1a3df-8ea1-47f7-b054-4725a53a384e.mp3', Duration: 131.8138125});

listBackGroundAudio.push({Name:'BGAudio_92', StartTime:0, SRC:'Data/213141be-580c-4b36-86c4-a76a2dc63e8f.mp3', Duration: 243.5395625});
var listSilent_BGAudio_92 = [{StartTime:201.496774193548, Duration:40.8}];

listBackGroundAudio.push({Name:'BGAudio_93', StartTime:0, SRC:'Data/7579b55b-2a4d-41e8-a5b5-b09bec5f598c.mp3', Duration: 235.713625});
var listSilent_BGAudio_93 = [{StartTime:0.976774193548454, Duration:43.92}];
listSilent_BGAudio_93.push({StartTime:117.590537634409, Duration:117});

listBackGroundAudio.push({Name:'BGAudio_94', StartTime:0, SRC:'Data/f6e1a862-2c7f-4e7a-9001-e1d1fd4a853e.mp3', Duration: 200.187125});

listBackGroundAudio.push({Name:'BGAudio_95', StartTime:0, SRC:'Data/f6e1a862-2c7f-4e7a-9001-e1d1fd4a853e.mp3', Duration: 200.187125});
function BackGroundAudio(_nextBack)
{
    var timeSlide = $('#slider-value').html();
    var timeSlide = parseFloat(parseFloat(timeSlide).toFixed(1));
    var time = timeSlide;
    var timeStop = time.toFixed(1) * 10;
    nubmerPage = checkNumberPage();
    var list = listObject[nubmerPage];
    if (typeof list == typeof undefined) return false;
    var listPage = list.listPage;
    var endTime;var percent;var _curTime;
    var _pageTime;var _bgAudioTime=0;var _bgAudioTimePrevious=0;
    var _bgAudio = document.getElementById('BGAudio');
    _bgAudio.volume=0.5;
    if (listPage != null)
    {
        var endTime = list.time;
        var percent = Math.abs(((100 * timeStop) / (endTime * 10)) - 100);
        var _demonstrationTime= endTime - (percent * endTime/100);
        if (_nextBack==true) _demonstrationTime=0;
        var _curPage=GetCurrentPage();
        if (typeof window['listBackGroundAudio'] != typeof undefined)
        {
            // Tổng time từ đầu đến trang hiện tại
            _pageTime=0.0;
            for (i=0;i<nubmerPage;i++){_pageTime += listObject[i].time;}
            _pageTime+=_demonstrationTime; // Thời gian hiện tại
            // Tìm đối tượng BackGround Audio phù hợp - duration + startTime
            _bgAudioTime=0.0;
            _bgIndex=0;
            for (i=0;i<listBackGroundAudio.length;i++)
            {
                _bgAudioTime += listBackGroundAudio[i].Duration;
                _bgAudioTime += listBackGroundAudio[i].StartTime;
                if (i>0)
                {
                    _bgAudioTimePrevious += listBackGroundAudio[i-1].Duration;
                    _bgAudioTimePrevious += listBackGroundAudio[i-1].StartTime;
                }
                if (_bgAudioTime>_pageTime)
                {
                    _bgIndex=i;
                    i=listBackGroundAudio.length;
                }
            }
            if (_pageTime>_bgAudioTime && _bgAudio.paused==false)
            {
                 $('#BGAudio').attr('src','');
                _bgAudio.pause();
            }
            if (_pageTime<_bgAudioTime)
            {
                if (typeof $('#BGAudio').attr('src') != typeof undefined && $('#BGAudio').attr('src') != listBackGroundAudio[_bgIndex].SRC) $('#BGAudio').attr('src',listBackGroundAudio[_bgIndex].SRC);
                if (typeof $('#BGAudio').attr('src') == typeof undefined) $('#BGAudio').attr('src',listBackGroundAudio[_bgIndex].SRC);
                var time = _pageTime-listBackGroundAudio[_bgIndex].StartTime-_bgAudioTimePrevious;
                _bgAudio.currentTime = time;
                if (playingGlobal==true) _bgAudio.play(); else _bgAudio.pause();
            }
        }
    }
}
