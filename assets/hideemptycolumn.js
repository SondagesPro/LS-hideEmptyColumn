/*
 * JavaScript functions to hide empty answers colum in LimeSurvey 
 * This allow using Expression Manager to hide answers in array question type
 *
 * @author Denis Chenu <denis@sondages.pro>
 * @copyright 2013-2014 Denis Chenu <http://sondages.pro>
 * @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later
 * @version 1.0
 *
 */
$("table.question").each(function(){
    var basetable=$(this);
    basetable.find('col.odd,col.even').addClass('havewidth');
    $(this).find("thead th").each(function(){
        if($.trim($(this).html())==""){
            if(basetable.find('col.havewidth').length){
                basetable.find('col.havewidth').removeAttr('width').removeClass('havewidth');
            }
            var colindex=$(this).parent('tr').find('td,th').index($(this));
            basetable.find('col').eq(colindex).css('width',0);
            basetable.find('col').eq(colindex).width(0);
            basetable.find('tr').each(function(){
                $(this).find('td,th').eq(colindex).addClass('hiddencolumn').children().hide();
            });
            basetable.addClass('widthhiddencolumn');
        }
    });
});
