// function happens everytime the page loads
window.addEventListener('DOMContentLoaded', function(){
    // *--- Print Scroll height in console
    let navOffset = $("#navbar").offset().top;
    console.log(navOffset);

    $(window).scroll(function(){
        let scrollPos = $(window).scrollTop();
        console.log(scrollPos);

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
        // Project One
        let sectionOne = $("#item1").offset().top;
        if(scrollPos >= sectionOne -350){ // this is a calculation!!! 500px scroll
            $('.project-cont-one').addClass('appear');
        }else{
            $('.project-cont-one').removeClass('appear');
        }
        // Project Two
        let sectionTwo = $("#item2").offset().top;
        if(scrollPos >= sectionTwo -350){ // this is a calculation!!! 500px scroll
            $('.project-cont-two').addClass('appear');
        }else{
            $('.project-cont-two').removeClass('appear');
        }
        // Project Three
        let sectionThree = $("#item3").offset().top;
        if(scrollPos >= sectionThree -350){ // this is a calculation!!! 500px scroll
            $('.project-cont-three').addClass('appear');
        }else{
            $('.project-cont-three').removeClass('appear');
        }
        // More project btn
        let sectionMore = $("#secMore").offset().top;
        if(scrollPos >= sectionMore -500){ // this is a calculation!!! 500px scroll
            $('.btnOne').addClass('appear');
        }else{
            $('.btnOne').removeClass('appear');
        }
        // About
        let sectionAbout = $("#about").offset().top;
        if(scrollPos >= sectionAbout -400){ // this is a calculation!!! 500px scroll
            $('.about-text').addClass('appear');
        }else{
            $('.about-text').removeClass('appear');
        }
    });


    // *--- call function - adding links to nav
    let sideNav = document.getElementById("mySideNav");
    addLinks(sideNav);

    scrollAnimation();
});


// *--- Humberger menu Open and Close 
function openNav(){
    $('#mySideNav').addClass("openMenu");
}
function closeNav(){
    $('#mySideNav').removeClass("openMenu");
}

function addLinks(apples){
    apples.innerHTML += "<a href='#about' style='font-size: 2.5em; padding-top:120px; letter-spacing: 2px;'>ABOUT</a>";
    apples.innerHTML += "<a href='#work-top3' style='font-size: 2.5em; padding-top:40px; letter-spacing: 2px;'>WORK</a>";
    apples.innerHTML += "<a href='#linkTwo' style='font-size: 1.2em; padding-top:5px; letter-spacing: 2px;'>UX / UI</a>";
    apples.innerHTML += "<a href='#linkThree' style='font-size: 1.2em; padding-top:5px; letter-spacing: 2px;'>Graphic Design</a>";
    apples.innerHTML += "<a href='#linkFour' style='font-size: 1.2em; padding-top:5px; letter-spacing: 2px;'>Art</a>";
}


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
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}


// Hamberger Navbar Down
window.onscrollHam = function() {
    let currentScrollPos = window.pageYOffset;
    
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("ham-container").style.top = "0";
      } else {
        document.getElementById("ham-container").style.top = "-60px";
      }
      prevScrollpos = currentScrollPos;
    }