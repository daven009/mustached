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

    var nodes = Session.get('Nodes');
    if (nodes) {
      return {
        nodes: nodes,
        category:category
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
  
  'subNodes': function(){
    var selected = Session.get('categorySelected');
    if (selected) {
      var nodes = Session.get('Nodes');
      if (nodes) {
        return nodes[selected].sub;
      }
    }
    else {
      return null;
    }
  }
})