Template.compose.rendered = function () {
  render();

  //Markdown编辑器
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: 'markdown',
    lineNumbers: true,
    theme: "default",
    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
  });

  editor.on("change", function(cm) {
    Session.set('previewMarkdown',cm.getValue());
  });

  //修复在修改模式下点击创作内容还存在的错误
  Tracker.autorun(function (c) {
    if (Session.equals("previewMarkdown", '')) {
      editor.setValue('');
    }
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
    swal(CommonHelper.publishAlert(), function(){
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
        //*daven009添加并加入了* #话题#
        var content = '*daven009添加并加入了* #'+title+'#';
        CommonHelper.sendMessage(topicId,content);

        Router.go('topic',{_id:topicId});
        swal.close();
      });
    });
  });
};



Template.compose.helpers({
  'previewMarkdown': function(){
    if (Session.get('previewMarkdown')) {
      return Session.get('previewMarkdown');
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

ComposeController = RouteController.extend({
  waitOn: function () {
    if (typeof this.params._id != "undefined") {
      return Meteor.subscribe('topic', this.params._id);  
    }
  },
  action: function () {
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
  },
  data: function () {
    params = this.params;
    var topic = Topics.findOne({_id: this.params._id, creator: Meteor.userId()});
    if (!topic) {
      Session.set('previewMarkdown','');
      Router.go('compose');
    }
    else {
      Session.set('previewMarkdown',topic.content);
    }
    return {
      topic: topic
    }
  }
})