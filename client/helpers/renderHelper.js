render = function(){
  $('.tool-tip').tooltip();

  $('body').off('mouseenter,mouseleave','.hover-darken').on('mouseenter','.hover-darken',function(){
    $(this).toggleClass('text-muted');
  }).on('mouseleave','.hover-darken',function(){
    $(this).toggleClass('text-muted');
  })

  $('body').off('click','#githubHelp').on('click','#githubHelp',function(){
    $('#githubHelpModal').modal('show');
  });

  $('body').off('mouseenter,mouseleave','.message').on('mouseenter','.message',function(){
    $(this).find('.timestamp').show();
    $(this).find('.user-avatar').toggleClass('onhover');
  }).on('mouseleave','.message',function(){
    $(this).find('.timestamp').hide();
    $(this).find('.user-avatar').toggleClass('onhover');
  })
}
