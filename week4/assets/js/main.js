
window.addEventListener('DOMContentLoaded', function(){
    // *--- call function - adding links to nav
    // let sideNav = $("#mySideNav");
    let sideNav = document.getElementById("mySideNav");
    addLinks(sideNav);

    scrollAnimation();

    // let navOffset = document.getElementById("nav");
    // let topPos = navOffset.offsetTop;
    // console.log(topPos);

    let navOffset = $("nav").offset().top;
    console.log(navOffset);

    $(window).scroll(function(){
        let scrollPos = $(window).scrollTop();
        console.log(scrollPos);

        let stickNav = $("nav");
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
        let sectionTwo = $("#linkTwo").offset().top;
        if(scrollPos >= sectionTwo -500){ // this is a calculation!!! 500px scroll
            $('.t2').addClass('appear');
        }else{
            $('.t2').removeClass('appear');
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

function addLinks(apples){
    apples.innerHTML += "<a href='#home'>HOME</a>";
    apples.innerHTML += "<a href='#linkOne'>LINK 1</a>";
    apples.innerHTML += "<a href='#linkTwo'>LINK 2</a>";
    apples.innerHTML += "<a href='#linkThree'>LINK 3</a>";
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
