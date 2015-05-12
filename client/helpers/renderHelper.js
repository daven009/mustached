render = function(){
  //override display regulations
  var originalLeave = $.fn.popover.Constructor.prototype.leave;
  $.fn.popover.Constructor.prototype.leave = function(obj){
    var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
    var container, timeout;

    originalLeave.call(this, obj);

    if(obj.currentTarget) {
      container = $(obj.currentTarget).siblings('.popover')
      timeout = self.timeout;
      container.one('mouseenter', function(){
      //We entered the actual popover – call off the dogs
      clearTimeout(timeout);
      //Let's monitor popover content instead
      container.one('mouseleave', function(){
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    })
    }
  };

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

  //popover  
  $('body').off('mouseenter','[data-toggle="popover"]').off('mouseleave','[data-toggle="popover"]').on('mouseenter','[data-toggle="popover"]',function(){
    //加载资料
    Session.set('currentOnHoverUser',$(this).data('originalId'));
    $(this).popover({
      html: true,
      delay: {show: 50, hide: 200},
      trigger: 'click'
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
