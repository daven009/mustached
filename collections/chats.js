//当前参与的私聊
Chats = new Mongo.Collection("chats");

var Schemas = {};

Schemas.Chat = new SimpleSchema({
  creator: {
    type: String,
    label: "用户ID"
  },
  chatWith: {
    type: String,
    label: "主题ID"
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
  }
});

Chats.attachSchema(Schemas.Chat);