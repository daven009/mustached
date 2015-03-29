Template.compose.rendered = function () {
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

  $('#githubHelp').off('click').on('click',function(){
    $('#githubHelpModal').modal('show');
  })
};

Template.compose.helpers({
  'previewMarkdown': function(){
    var renderer = new marked.Renderer();

    renderer.code = function(code, lang) {
      console.log(code);
      console.log(lang);
      var language = lang && ('language-' + lang) || '';
      return '<pre class="' + language + '">'
      + '<code>' + hljs.highlight(lang, code).value + '</code>'
      + '</pre>';
    };

    return marked(Session.get('previewMarkdown'),{renderer:renderer});
  }
})