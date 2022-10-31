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
    var fixedtable = $(this).hasClass('table-fixed') || $(this).hasClass('table-responsive');
    var countEmpty = 0;
    var countNotEmpty = 0;
        $(this).find("thead tr th").each(function(){
            var colindex = $(this).parent('tr').find('td,th').index($(this));
            if (colindex > 0) {
                if($.trim($(this).html())==""){
                    basetable.find('col').eq(colindex).css('width',0);
                    basetable.find('col').eq(colindex).width(0);
                    basetable.find('tr').each(function(){
                        if(fixedtable) {
                            $(this).find('td,th').eq(colindex).addClass('hideEmptyColumn-hiddencolumn').children().hide();
                        } else {
                            $(this).find('td,th').eq(colindex).addClass('hideEmptyColumn-hiddencolumn').addClass('hidden-xs').children().hide();
                        }
                    });
                    basetable.addClass('hideEmptyColumn-widthhiddencolumn');
                    countEmpty++;
                } else {
                    basetable.find('col').eq(colindex).addClass('havewidth');
                    countNotEmpty++;
                }
            }
        });
        if(countEmpty && countNotEmpty && $(this).find('col.col-answers')) {
            var colanswersWidth = $(this).find('col').attr("style").replace("width:","").replace("%","").replace(";","").trim();
            if(!isNaN(colanswersWidth)) {
                finalWidth = (100 - colanswersWidth)/countNotEmpty;
                $(this).find('col.havewidth').css("width",finalWidth+"%");
            }
        }
});
