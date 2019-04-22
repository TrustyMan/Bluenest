function historyBackAnimation(){
    if($('.requestpage').hasClass('requestpage1')==true){
        $('.homeleadcapture').toggleClass('homeleadcapture1');
        $('.requestpage').toggleClass('requestpage1');
    }
    else if($('.homeleadcapture').hasClass('homeleadcapture3')==true){
        $('.homeleadcapture').removeClass('homeleadcapture3');
        $('.schedulepage').removeClass('schedulepage3');
        $('.personalinfopage').removeClass('personalinfopage3');
    }
    else if($('.homeleadcapture').hasClass('homeleadcapture2')==true){
        $('.homeleadcapture').removeClass('homeleadcapture2');
        $('.schedulepage').removeClass('schedulepage2');
        $('.personalinfopage').removeClass('personalinfopage2');
    }
    else if($('.homeleadcapture').hasClass('homeleadcapture1')==true){
        $('.homeleadcapture').removeClass('homeleadcapture1');
        $('.schedulepage').removeClass('schedulepage1');
        $('.personalinfopage').removeClass('personalinfopage1');
    }
}
function carouselInstall(){
    $('#owl-one').flickity({
        // options
        cellAlign: 'left',
        pageDots: false
    });
    $('#owl-two').flickity({
        // options
        cellAlign: 'left',
        pageDots: false
    });
}
function getCalender(){
    var d = new Date();
    var month = d.getUTCMonth();
    var day = d.getUTCDate();
    var nextMonth = month + 1;
    var febDays = '';
    var counts = 14;
    //Getting February Days Including The Leap Year
    if (month == 1) {
        if ((year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0)) {
        febDays = 29;
        } else {
        febDays = 28;
        }
    }
    // Getting The Months and Days of the Week
    var weekDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var daysOfMonth = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var index;
    for(index = 0; index < 14; index++){
        var element = document.createElement('div');
        var child1 = document.createElement('div');
        var child2 = document.createElement('div');
        var child3 = document.createElement('div');
        $(child1).text(weekDayName[day%7]);
        $(child1).addClass('dayoftheweek');
        $(child2).text(day);
        $(child2).addClass('dayofthemonth');
        $(child3).text(monthName[month]);
        $(child3).addClass('month');
        $(element).addClass('carousel-cell');
        $(element).addClass('item');
        $(element).append(child1);
        $(element).append(child2);
        $(element).append(child3);
        if(index==0){
        $(element).addClass('selected'); //Default Selection of Date
        var str = weekDayName[day%7].substring(0, 3) + ", " + day + " " + monthName[month];
        $(".timedatediv").text(str);
        }
        var parent = document.getElementById('owl-one');
        $(parent).append(element);
        day=day+1;
        if(day>daysOfMonth[month]){
        day=1;
        }
    }
}
$(document).ready(function(){
    getCalender();
    carouselInstall(); //date and time picker Install
    //display date in the footer
    $(".item").click(function(){
        //console.log($(this).children("div").html());
        var dayoftheweek=$(this).children('.dayoftheweek').text();
        var dayofthemonth=$(this).children('.dayofthemonth').text();
        var month=$(this).children('.month').text();
        var str = dayoftheweek.substring(0, 3) + ", " + dayofthemonth + " " + month;
        $(".timedatediv").text(str);
        //add click effect
        $(".item").removeClass('selected');
        $(".item").removeClass('hover');
        $(".timebox").removeClass('selected');
        $(this).addClass('selected');
        $(".nextbutton").removeClass("enabledBtn");
        $(".nextbutton").addClass("disabledBtn");
    });
    //adding hover effect
    $(".item").hover(function(){
        $(".item").removeClass('hover');
        $(this).addClass('hover');
    });
    //remove hover effect when out of box
    $(".item").mouseleave(function(){
        $(this).removeClass('hover');
    });
    //adding click effect on timebox
    $(".timebox").click(function(){
        $(".timebox").removeClass('selected');
        $(".timebox").removeClass('hover');
        $(this).addClass('selected');
    });
    //adding hover effect on timebox
    $(".timebox").hover(function(){
        $(".timebox").removeClass('hover');
        $(this).addClass('hover');
    });
    //remove hover effect when out of timebox
    $(".timebox").mouseleave(function(){
        $(this).removeClass('hover');
    });
    //display time in the footer
    $(".timebox").click(function(){
        var strArray=$(".timedatediv").text().split(' '), str;
        if(strArray.length==3){
        str=$(".timedatediv").text()+" at "+$(this).text().toLowerCase();
        $(".nextbutton").removeClass("disabledBtn");
        $(".nextbutton").addClass("enabledBtn");
        }
        else if(strArray.length>3){
            str=strArray[0]+" "+strArray[1]+" "+strArray[2]+" at "+$(this).text().toLowerCase();
            $(".nextbutton").removeClass("disabledBtn");
            $(".nextbutton").addClass("enabledBtn");
        }
        else{
            str='';
        }
        $(".timedatediv").text(str);
    });
    //display
    $(".svgicon").click(function(){
        if($(".shapeddialog").css("visibility")=="hidden")
        $(".shapeddialog").css("visibility","visible");
            else $(".shapeddialog").css("visibility","hidden");
    });
    //page transition effect
    $(".requestbutton").click(function(){
        $('.homeleadcapture').addClass('homeleadcapture1');
        $('.schedulepage').addClass('schedulepage1');
        $('.personalinfopage').addClass('personalinfopage1');
        setTimeout(function(){
            $('.homeleadcapture').hide();
          }, 1000 );
    });
    $('.requestbutton2').click(function(){
        $('.homeleadcapture').toggleClass('homeleadcapture1');
        $('.requestpage').toggleClass('requestpage1');
        setTimeout(function(){
            $('.homeleadcapture').hide();
            }, 1000 );
    });
    $('.nextbutton').click(function(){
        $('.homeleadcapture').addClass('homeleadcapture2');
        $('.schedulepage').addClass('schedulepage2');
        $('.personalinfopage').addClass('personalinfopage2');
    });
    //historyBackAnimation
    if (window.history && window.history.pushState)
    {
        $(window).on('popstate', function() {
            historyBackAnimation();
        });
    }
});