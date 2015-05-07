Template.nodesList.rendered = function(){
  render();
  $(document).ready(function(){
    $(".nano").nanoScroller();
  })
}

NodesListController = RouteController.extend({
  waitOn: function () {
    delete Session.keys['nodeSelected'];
    var params = this.params;
    if (typeof params.node != 'undefined') {
      return Meteor.subscribe("totalUsers") && Meteor.subscribe("totalTopics") && Meteor.subscribe("totalConversations") && Meteor.subscribe('topicsByNodes', params.category, params.node);
    }
    return Meteor.subscribe("totalUsers") && Meteor.subscribe("totalTopics") && Meteor.subscribe("totalConversations") && Meteor.subscribe('topicsByNodes', this.params.category);
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
    var params = this.params;
    var category = params.category;
    //设置大节点
    Session.set('categorySelected',this.params.category);
    if (typeof params.node != 'undefined') {
      //设置小节点
      Session.set('nodeSelected', this.params.node);
    }
    var nodes = Nodes.find({}).fetch();
    if (nodes) {
      subNodes = [];
      _.each(nodes,function(node) {
        if (node.tag == category) {
          subNodes = node.sub
        }
      })
      return {
        nodes: nodes,
        category: category,
        subNodes: subNodes,
        totalUsers: Meteor.users.find({}).count(),
        totalTopics: Topics.find({}).count(),
        totalConversations: Conversations.find({}).count()
      }
    }
  }
})

Template.nodesList.helpers({
  'activeClass': function(category) {
    var selected = Session.get('categorySelected');
    if (selected == category) {
      return 'active dark';
    }
    else {
      return null;
    }
  },
  'topics': function() {
    var category = Session.get('categorySelected');
    if (typeof Session.get('nodeSelected') != 'undefined') {
      var node = Session.get('nodeSelected');
      return Topics.find({category:category,node:node}).fetch();
    }
    else {
      return Topics.find({category:category}).fetch(); 
    }
  },
  'commentCount': function(topicId) {
    Meteor.subscribe('conversations', topicId);
    var count = Conversations.find({topic:topicId}).fetch();
    if (count) {
      return count.length;
    }
    else {
      return null;
    }
  },
  'onlineUsers': function() {
    Meteor.subscribe('onlineUsers');
    return Meteor.users.find({"status.online": true }).fetch();
  }
})