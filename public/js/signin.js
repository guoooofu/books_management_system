$(document).ready(function() {
  $('.app-list-icon li a').addClass("active");
 		$(".login-for").click(function(){
 			$('.login-card').hide()
 			$('.forgot-password-card').show();
 		});
 		$(".signin").click(function(){
 			$('.login-card').show()
 			$('.forgot-password-card').hide();
 		});
})
