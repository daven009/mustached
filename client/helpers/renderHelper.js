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
  $('body').off('mouseenter','[data-link-type="mention"]').off('mouseleave','[data-link-type="mention"]').on('mouseenter','[data-link-type="mention"]',function(){
    //加载资料
    var username = $(this).data('username');
    Session.set('currentOnHoverUser',username);
  })

  $('body').off('click','[data-link-type="mention"]').off('mouseleave','[data-link-type="mention"]').on('click','[data-link-type="mention"]',function(){
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
    $('[data-link-type="mention"]').not(this).each(function(){
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
