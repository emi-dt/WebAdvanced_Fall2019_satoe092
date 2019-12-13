

window.addEventListener('DOMContentLoaded', function(event){
            const countdown = document.getElementById("countdown");
        let seconds = 5;
        countTick(countdown,seconds);


        // Actual Function
        function countTick(element, seconds){
            if(seconds >= 0){
                //repeat until
                countdown.innerHTML = seconds;
                seconds--; 
                setTimeout(function(){
                    countTick(element, seconds);
                }, 1000);
            } else{
                var elem = document.querySelector('.countdown-page');
                elem.style.display = 'none';
            }
        }
  });



