var nodes = {
  'skill' : {
    'name': '技术',
    'peak': false,
    'sub': {
      'meteor': {'name':'Meteor'},
      'programmer': {'name':'程序员'},
      'php': {'name':'PHP'}
    }
  },
  'creative' : {
    'name': '创意',
    'peak': true,
    'sub': {
      'share': {'name':'分享创造'},
      'design': {'name':'设计'},
      'idea': {'name':'奇思妙想'}
    }
  }
}

Meteor.methods({
  fetchNodes: function(){
    return nodes;
  }
})