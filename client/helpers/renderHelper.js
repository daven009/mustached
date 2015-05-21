render = function(){
  $('.tool-tip').tooltip();

  $('body').off('mouseenter','.hover-display').off('mouseleave','.hover-display').on('mouseenter','.hover-display',function(){
    $(this).find('.showOnHover').toggleClass('hidden');
  }).on('mouseleave','.hover-display',function(){
    $(this).find('.showOnHover').toggleClass('hidden');
  })

  $('body').off('click','.githubHelp').on('click','.githubHelp',function(){
    $('#githubHelpModal').modal('show');
  });

  $('body').off('mouseenter','.message').off('mouseleave','.message').on('mouseenter','.message',function(){
    $(this).find('.user-avatar').toggleClass('onhover');
  }).on('mouseleave','.message',function(){
    $(this).find('.user-avatar').toggleClass('onhover');
  })

  //popover  
  $('body').off('mouseenter','[data-toggle="popover"]').off('mouseleave','[data-toggle="popover"]').on('mouseenter','[data-toggle="popover"]',function(){
    //加载资料
    var id = $(this).data('originalId');
    Session.set('currentOnHoverUser',id);
  })

  $('body').off('click','[data-toggle="popover"]').off('mouseleave','[data-toggle="popover"]').on('click','[data-toggle="popover"]',function(){
    //加载资料
    $(this).popover({
      html: true,
      animation: false,
      delay: {show: 50, hide: 200},
      trigger: 'click',
      content:  function() {
        return $('.namecard').html();
      }
    }).popover('toggle');
    //隐藏其他popover
    $('[data-toggle="popover"]').not(this).each(function(){
      if ($(this).next('div.popover:visible').length) {
        $(this).popover('hide');
      }
    });
  })

  //点击quote class
  $('body').off('click','.quote').on('click','.quote',function(){
    var originalTitle = $(this).data('originalTitle');
    $('#chat-input-textarea').val($('#chat-input-textarea').val() + originalTitle + ' ').focus();
  })

  //处理点击切换
  $('body').off('click','#composeSwitch').on('click','#composeSwitch',function(){
    if (composeMode == 'chat') {
      composeMode = 'compose';
    }
    else {
      composeMode = 'chat';
    }
    Session.set('composeMode',composeMode);
  })
}
