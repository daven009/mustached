Template.compose.rendered = function () {
  // $(".nodeSelect").select2();

  Session.set('previewMarkdown','');
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: 'markdown',
    lineNumbers: true,
    theme: "default",
    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
  });

  editor.on("change", function(cm) {
    Session.set('previewMarkdown',cm.getValue());
  });

  $('#preview').off('click').on('click',function(){
    if ($(this).html() == '预览') {
      $(this).html('继续编辑');
      $('.CodeMirror').hide();
      $('#codePreview').show();
    }
    else {
      $(this).html('预览');
      $('.CodeMirror').show();
      $('#codePreview').hide();
    }
  });

  $('#publish').off('click').on('click',function(){
    swal({
      title: "确定发布",
      text: "你可以在主题发布后 300 秒内，对标题或者正文进行编辑。同时，在 300 秒内，你可以重新为主题选择节点。",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes!",
      closeOnConfirm: false
    }, function(){
      var title = $('input[name=title]').val();
      var content = editor.getValue();
      var nodes = $('.nodeSelect').val().split('|');
      var category = nodes[0];
      var node = nodes[1];
      var formObj = {
        creator: Meteor.userId(),
        title: title,
        content: content,
        category: category,
        node: node
      };
      Meteor.call('addTopic', formObj, function(err, topicId){
        if(err){
          //此处应该有alert
          return false;
        }
        Router.go('topic',{_id:topicId});
        swal.close();
      });
    });
  });

  $('#githubHelp').off('click').on('click',function(){
    $('#githubHelpModal').modal('show');
  });
};

Template.compose.helpers({
  'previewMarkdown': function(){
    if (Session.get('previewMarkdown')) {
      return Session.get('previewMarkdown')
    }
    else {
      return null;
    }
  },
  'nodes': function(){
    var nodes = Nodes.find({}).fetch();
    if (nodes) {
      return nodes;
    }
  }

})