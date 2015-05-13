//对帖子的评论
Conversations = new Meteor.Collection("conversations");

var Schemas = {};

Schemas.Conversation = new SimpleSchema({
  creator: {
    type: String,
    label: "创建者ID"
  },
  topic: {
    type: String,
    label: "主题ID"
  },
  content: {
    type: String,
    label: "内容",
    optional: true
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

Conversations.attachSchema(Schemas.Conversation);