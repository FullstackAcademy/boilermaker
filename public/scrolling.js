$( document ).ready(function() {
    $('#everyone').delay(1000).animate({ opacity: '1' }, 5000);
    $('#parelax-logo').delay(3000).animate({ letterSpacing: '1.39em', opacity: '1' }, 4000);
})


$(window).scroll(function(event){
  parallax();
});

var height = window.height;

function parallax(){
  var scrolled = $(window).scrollTop();
  $('.bg').css('top',-(scrolled*0.1)+'px');
  $('.100').css('top',-(scrolled)+'px');
  $('.150').css('top',-(scrolled*1.5)+'px');
  $('.200').css('top',-(scrolled*2)+'px');
  $('.250').css('top',-(scrolled*2.5)+'px');
  $('.300').css('top',-(scrolled*3)+'px');
}
