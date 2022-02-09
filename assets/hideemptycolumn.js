/*
 * JavaScript functions to hide empty answers colum in LimeSurvey 
 * This allow using Expression Manager to hide answers in array question type
 *
 * @author Denis Chenu <denis@sondages.pro>
 * @copyright 2013-2015 Denis Chenu <http://sondages.pro>
 * @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later
 * @version 2.0
 *
 */
$("table.ls-answers").each(function(){
    var basetable=$(this);
    var countEmpty = 0;
    var countNotEmpty = 0;
        $(this).find("thead th.answer-text,thead th.answertext").each(function(){
            var colindex=$(this).parent('tr').find('td,th').index($(this));
            if($.trim($(this).html())==""){
                basetable.find('col').eq(colindex).css('width',0);
                basetable.find('col').eq(colindex).width(0);
                basetable.find('tr').each(function(){
                    $(this).find('td,th').eq(colindex).addClass('hideEmptyColumn-hiddencolumn').children().hide();
                });
                basetable.addClass('hideEmptyColumn-widthhiddencolumn');
                countEmpty++;
            } else {
                basetable.find('col').eq(colindex).addClass('havewidth');
                countNotEmpty++;
            }
        });
        if(countEmpty && countNotEmpty && $(this).find('col.col-answers')) {
            var colanswersWidth = basetable.find('col.col-answers').attr("style").replace("width:","").replace("%","").replace(";","").trim();
            if(!isNaN(colanswersWidth)) {
                finalWidth = (100 - colanswersWidth)/countNotEmpty;
                console.warn(finalWidth);
                $(this).find('col.havewidth').css("width",finalWidth+"%");
            }
        }
});
