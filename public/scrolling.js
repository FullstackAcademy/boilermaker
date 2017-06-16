console.log('hello');
$(window).scroll(function(e){
  parallax();
});


function parallax(){
  var scrolled = $(window).scrollTop();
  $('.bg').css('top',-(scrolled*0.1)+'px');
  $('.100').css('top',-(scrolled)+'px');
  $('.150').css('top',-(scrolled*1.5)+'px');
  $('.200').css('top',-(scrolled*2)+'px');
  $('.250').css('top',-(scrolled*2.5)+'px');
  $('.300').css('top',-(scrolled*3)+'px');
}
