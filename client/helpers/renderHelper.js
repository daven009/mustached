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
    $(this).find('.user-avatar').toggleClass('onhover');
  }).on('mouseleave','.message',function(){
    $(this).find('.user-avatar').toggleClass('onhover');
  })

  //点击quote class
  $('body').off('click','.quote').on('click','.quote',function(){
    var originalTitle = $(this).data('originalTitle');
    $('#chat-input-textarea').val($('#chat-input-textarea').val() + originalTitle + ' ').focus();
  })
}
