// function happens everytime the page loads
window.addEventListener('DOMContentLoaded', function(){
    // *--- Print Scroll height in console
    let navOffset = $("#navbar").offset().top;
    // console.log(navOffset);

    loadData();

    $(window).scroll(function(){
        let scrollPos = $(window).scrollTop();
        // console.log(scrollPos);

        let stickNav = $("#navbar");
        stickyMenu(stickNav);

        let stickMenu = $(".menubar");
        stickyMenu(stickMenu);

        function stickyMenu (stick){
            if(scrollPos >= navOffset){
                stick.addClass("fixed");
            } else{
                stick.removeClass("fixed")
            }
        }

        // *--- Text Pop Up with Scroll
        $( ".items" ).each(function( index ) {
            let section = $(this).offset().top;
            if(scrollPos >= section -300){ // this is a calculation!!! 500px scroll
                $( this ).find( ".work-top3-content" ).addClass('appear');
            }else{
                $( this ).find( ".work-top3-content" ).removeClass('appear');
            }
            // console.log( index + ": " + $( this ) );
          });
          

        // Project One
        // let sectionOne = $("#item1").offset().top;
        // if(scrollPos >= sectionOne -350){ // this is a calculation!!! 500px scroll
        //     $('.project-cont-one').addClass('appear');
        // }else{
        //     $('.project-cont-one').removeClass('appear');
        // }
        // Project Two
        // let sectionTwo = $("#item2").offset().top;
        // if(scrollPos >= sectionTwo -350){ // this is a calculation!!! 500px scroll
        //     $('.project-cont-two').addClass('appear');
        // }else{
        //     $('.project-cont-two').removeClass('appear');
        // }
        // Project Three
        // let sectionThree = $("#item3").offset().top;
        // if(scrollPos >= sectionThree -350){ // this is a calculation!!! 500px scroll
        //     $('.project-cont-three').addClass('appear');
        // }else{
        //     $('.project-cont-three').removeClass('appear');
        // }
        // More project btn
        console.log($("#secMore").length);
        if ($("#secMore").length) {
            let sectionMore = $("#secMore").offset().top;
            if(scrollPos >= sectionMore -500){ // this is a calculation!!! 500px scroll
                $('.btnOne').addClass('appear');
            }else{
                $('.btnOne').removeClass('appear');
            }
        }
        // About
        if ($("#about").length){
        let sectionAbout = $("#about").offset().top;
        if(scrollPos >= sectionAbout -400){ // this is a calculation!!! 500px scroll
            $('.about-content').addClass('appear');
        }else{
            $('.about-content').removeClass('appear');
        }}
    });


    // *--- call function - adding links to nav
    let sideNav = document.getElementById("mySideNav");
    //addLinks(sideNav);

    scrollAnimation();


    // Work Category Click Function
    // Click to active https://stackoverflow.com/questions/3239598/how-can-i-get-the-id-of-an-element-using-jquery
    $(".workCat li" ).click(function() {
        $(".active").removeClass( "active" );
        $(this).addClass( "active" );
        let clickId = $(this).attr('data-id');
        console.log(clickId);
        // alert( "Handler for .click() called." );
        if(clickId =="linkUX"){
            $( ".UX-UI" ).show();
            $( ".TP" ).hide();
            $( ".GD" ).hide();
        }
        if(clickId =="linkGD"){
            $( ".GD" ).show();
            $( ".TP" ).hide();
            $( ".UX-UI" ).hide();
        }
        if(clickId =="linkTP"){
            $( ".TP" ).show();
            $( ".UX-UI" ).hide();
            $( ".GD" ).hide();
        }
      });

});


// *--- Humberger menu Open and Close 
function openNav(){
    $('#mySideNav').addClass("openMenu");
}
function closeNav(){
    $('#mySideNav').removeClass("openMenu");
}

// function addLinks(apples){
//     apples.innerHTML += "<a href='#about' style='font-size: 2.5em; padding-top:120px; letter-spacing: 2px;'>ABOUT</a>";
//     apples.innerHTML += "<a href='work.html' style='font-size: 2.5em; padding-top:40px; letter-spacing: 2px;'>WORK</a>";
//     apples.innerHTML += "<a href='#linkTwo' style='font-size: 1.2em; padding-top:5px; letter-spacing: 2px;'>UX / UI</a>";
//     apples.innerHTML += "<a href='#linkThree' style='font-size: 1.2em; padding-top:5px; letter-spacing: 2px;'>Graphic Design</a>";
//     apples.innerHTML += "<a href='#linkFour' style='font-size: 1.2em; padding-top:5px; letter-spacing: 2px;'>Tangible Product</a>";
// }


// *--- Animation
function scrollAnimation(){
    $('a').click(function(){
        let myTarget = $(this.hash);
        myTarget = myTarget.length && myTarget; //this # and all the content inside

        let targetOffset = myTarget.offset().top;
        $('html,body').animate({scrollTop: targetOffset}, 1000);
    });
}


// *— Nav Down 
// Hide Header on on scroll down https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
// Hamberger Navbar Down 
// Onscroll can only called once!!!!! -----------
let prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    
    //HUM NAV
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("ham-container").style.top = "0";
      } else {
        document.getElementById("ham-container").style.top = "-60px";
      }
      
    //NAV DESKTOP
      let styleTop = 0;
        if($( "#navbar" ).hasClass( "workNav" )){
            styleTop = (prevScrollpos > currentScrollPos)? "0":"-200px";
        }else{
            styleTop = (prevScrollpos > currentScrollPos)? "0":"-60px";
        }
        document.getElementById("navbar").style.top = styleTop;
        // THIS IS SHORTER VERSION OF ORIGINAL IF STATEMENT
        // if($( "#navbar" ).hasClass( "workNav" )){
        //     if (prevScrollpos > currentScrollPos) {
        //         document.getElementById("navbar").style.top = "0";
        //       } else {
        //         document.getElementById("navbar").style.top = "-200px";
        //       }
        // }else{
        //     if (prevScrollpos > currentScrollPos) {
        //         document.getElementById("navbar").style.top = "0";
        //       } else {
        //         document.getElementById("navbar").style.top = "-60px";
        //       }
        // }
        prevScrollpos = currentScrollPos;
    }




// Handle Bar
function loadData(){
    $.getJSON("../data.json", function(data){
        // console.log(data);
        generateWork(data);
    });
}

//putting these contents here so that json file can load first before executing appear function
function generateWork(data){
    let source = $("#work-template").html();
    let template = Handlebars.compile(source);
    let result = template(data);
    let list = $("#work-top3");

    list.append(result);
    hideWork();

    //make items appear on loading the page 
    let scrollPos = $(window).scrollTop();
    $( ".items" ).each(function( index ) {
        let section = $(this).offset().top;
        if(scrollPos >= section -300){ // this is a calculation!!! 500px scroll
            $( this ).find( ".work-top3-content" ).addClass('appear');
        }else{
            $( this ).find( ".work-top3-content" ).removeClass('appear');
        }
      });

    // on loading, make Hero Text appear 
      if ($(".secHero").length){
        let sectionHero = $(".secHero").offset().top;
        $('.heroText').addClass('appear');
    }

}

// Work Category 
function hideWork(){
    console.log( $( ".TP" ));
    $( ".TP" ).hide();
    $( ".GD" ).hide();
}

