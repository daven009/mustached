render = function(){
  $('.tool-tip').tooltip();

  $('body').off('mouseenter','.hover-display').off('mouseleave','.hover-display').on('mouseenter','.hover-display',function(){
    $(this).find('.showOnHover').toggleClass('hidden');
  }).on('mouseleave','.hover-display',function(){
    $(this).find('.showOnHover').toggleClass('hidden');
  })

  $('body').off('click','#githubHelp').on('click','#githubHelp',function(){
    $('#githubHelpModal').modal('show');
  });

  $('body').off('mouseenter','.message').off('mouseleave','.message').on('mouseenter','.message',function(){
    $(this).find('.timestamp').show();
    $(this).find('.user-avatar').toggleClass('onhover');
  }).on('mouseleave','.message',function(){
    $(this).find('.timestamp').hide();
    $(this).find('.user-avatar').toggleClass('onhover');
  })
}
