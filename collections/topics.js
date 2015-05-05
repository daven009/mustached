Topics = new Meteor.Collection("topics");

var Schemas = {};

Schemas.Topic = new SimpleSchema({
  creator: {
    type: String,
    label: "创建者ID"
  },
  title: {
    type: String,
    label: "标题"
  },
  content: {
    type: String,
    label: "内容",
    optional: true
  },
  category: {
    type: String,
    label: "类别"
  },
  node: {
    type: String,
    label: "节点"
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    },
    denyUpdate: true,
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    optional: true
  }
});

Topics.attachSchema(Schemas.Topic);