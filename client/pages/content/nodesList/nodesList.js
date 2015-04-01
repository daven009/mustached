Template.nodesList.rendered = function(){
  render();
}

NodesListController = RouteController.extend({
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
    Session.set('categorySelected',category);

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
  }
})