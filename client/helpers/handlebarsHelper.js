Handlebars.registerHelper('getUsernameByUserId', function(userId){
  Meteor.subscribe("userData",userId);
  var loggedInUser = Meteor.users.findOne({_id:userId});
  if (typeof loggedInUser != "undefined") {
    if(loggedInUser.username) return loggedInUser.username;
  }
  return 'user';
});

Handlebars.registerHelper('getCurrentUsername', function(){
  return Meteor.user().username;
});

Handlebars.registerHelper('getCurrentUserAvatar', function(size){
  if (Meteor.user()) {
    var email =  Meteor.user().emails[0].address;
    var url = Gravatar.imageUrl(email, {
      s: size,
      d: 'retro'
    });
    return url;
  }
  else {
    return null;
  }
});

Handlebars.registerHelper('getUserAvatarByUserId', function(userId, size){
  Meteor.subscribe("userData",userId);
  if (Meteor.users.findOne({_id:userId})) {
    var email =  Meteor.users.findOne({_id:userId}).emails[0].address;
    var url = Gravatar.imageUrl(email, {
      s: size,
      d: 'retro'
    });
    return url;
  }
  else {
    return null;
  }
});

Handlebars.registerHelper('momentDatetime',function(date, format){
  return moment(date).format(format);
});

Handlebars.registerHelper('markdown',function(content){
  if (content) {
    var renderer = new marked.Renderer();
    renderer.code = function(code, lang) {
      if (!lang || !hljs.getLanguage(lang)) {
        return '<pre class="no-padder"><code class="hljs">'
        + hljs.highlightAuto(code).value
        + '\n</code></pre>';
      }
      else{
        return '<pre class="no-padder">'
        + '<code class="hljs ' + lang + '">' + hljs.highlight(lang, code).value + '</code>'
        + '</pre>';
      }
    };
    return marked(content,{renderer:renderer});
  }
  else {
    return null;
  }
})

Handlebars.registerHelper('arrayify',function(obj){
  result = [];
  for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Handlebars.registerHelper('equals', function(val1, val2){
  if (val1 == val2) {
    return true;
  }
  else {
    return false;
  }
})

Handlebars.registerHelper('notEquals', function(val1, val2){
  if (val1 == val2) {
    return false;
  }
  else {
    return true;
  }
})

Handlebars.registerHelper('getFullNodeName', function(category, node){
  var result = Nodes.findOne({tag:category,"sub.tag":node});
  if (result) {
    var tagName = result.name;
    var nodeName = '';
    _.each(result.sub,function(sub) {
      if (sub.tag == node) {
        nodeName = sub.name;
      }
    })
    return '<code>'+nodeName+'</code>';
  }
  return null;
})

Handlebars.registerHelper('getUserOnlineStatus', function(userId){
  Meteor.subscribe("userData",userId);
  var userStatus = Meteor.users.findOne({"_id":userId,"status.online": true });
  if (userStatus) {
    return "<strong class='text-success'>在线中</strong>";
  }
  else {
    return "<stong class='text-muted'>离线</span>";
  }
})

Handlebars.registerHelper('isOnline', function(userId){
  Meteor.subscribe("userData",userId);
  var userStatus = Meteor.users.findOne({"_id":userId,"status.online": true });
  if (userStatus) {
    return true;
  }
  else {
    return false;
  }
})

Handlebars.registerHelper('totalTopicsByUserId', function(userId) {
  Meteor.subscribe('topicsByUserId',userId);
  return Topics.find({creator: userId}).count();
})

Handlebars.registerHelper('getTopicNameById', function(topicId) {
  Meteor.subscribe('topic', topicId);
  var topic = Topics.findOne({_id:topicId});
  if (topic) {
    return topic.title;
  }
  return false;
})