Template.nodesList.rendered = function(){
  render();
}

NodesListController = RouteController.extend({
  waitOn: function () {
    delete Session.keys['nodeSelected'];
    var params = this.params;
    if (typeof params.node != 'undefined') {
      return Meteor.subscribe('topicsByNodes', params.category, params.node);
    }
    return Meteor.subscribe('topicsByNodes', this.params.category);
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
        subNodes: subNodes
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
  }
})