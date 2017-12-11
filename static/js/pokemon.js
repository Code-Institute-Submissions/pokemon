// On page load set size of background image to browser height
$(document).ready(function(){
    $("#backgroundimg").css({
        "height": $(window).height() + 53 + 'px',
        "min-width": $(window).width() + 'px'});
    $("#welcome_image").fadeIn(1000);
});

// Resize background image if window is resized
$(window).resize(function(){
   $("#backgroundimg").css({
       "height": $(window).height() + 53 + 'px',
       "min-width": $(window).width() + 'px'});
});