render = function(){
    $('.tool-tip').tooltip();

    $('.hover-darken').mouseenter(function(){
      $(this).toggleClass('text-muted');
    }).mouseleave(function(){
      $(this).toggleClass('text-muted');
    });
}
