CommonHelper = {
  'isInteger': function(n){
    n = parseInt(n);
    return n === +n && n === (n|0);
  },

  'isEmptyString': function(n){
    return '' === n.trim();
  },

  'trimInput' : function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  },

  'isValidPassword' : function(val) {
    if (val.length >= 6) {
      return true;
    }
    return false;
  },

  'isNotEmpty' : function(val) {
    if (!val || val.trim() === ''){
      return false;
    }
    return true;
  },

  'isValidName' : function(val){
    userRegex = /^[-\w\.\$@\*\!]{1,30}$/;
    if(!val.match(userRegex)){
      return false;
    }
    if (val.length < 3) {
      return false;
    }
    return true;
  },

  'isValidEmail' : function(val){
    userRegex = /^[a-z]([a-z0-9]*[-_]?[\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/;
    if(!val.match(userRegex)){
      return false;
    }
    if (val.length < 5) {
      return false;
    }
    return true;
  },

  'sendMessage' : function(topicId, content) {
    if (CommonHelper.isNotEmpty(content)) {
      var formObj = {
        topic: topicId,
        content: content
      };
      Meteor.call('sendMessage', formObj, function(err, res){
        if (err) {
          console.log(err);
        }
      })
    }
  },

  'sendPrivateMessage' : function(to, content) {
    if (CommonHelper.isNotEmpty(content)) {
      var formObj = {
        to: to,
        content: content
      };
      Meteor.call('sendPrivateMessage', formObj, function(err, res){
        if (err) {
          console.log(err);
        }
      })
    }
  },

  'prettyDateTime' : function(date) {
    var onedayago = 86400000; //one hour, 24 hrs
    var twodaysago = 172800000; //one hour, 24 hrs
    if (moment().diff(moment(date)) >= twodaysago) {
      return moment(date).format('MMMMD日 YYYY');
    }
    else if (moment().diff(moment(date)) >= onedayago) {
      return '昨天';
    }
    else {
      return '今天';
    }
  },

  'publishAlert' : function() {
    return {
      title: "确定发布",
      text: "你可以在主题发布后300秒内，对标题或者正文进行编辑。同时，在300秒内，你可以重新为主题选择节点。",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes!",
      closeOnConfirm: false
    }
  },

  'editAlert' : function() {
    return {
      title: "确定修改",
      text: "准备提交，如果修改时间超过主题发布后的300秒提交，提交将会失败。",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes!",
      closeOnConfirm: false
    }
  }
}