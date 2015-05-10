Messages = new Meteor.Collection("messages");

var Schemas = {};

Schemas.Message = new SimpleSchema({
  from: {
    type: String,
    label: "发送者ID"
  },
  to: {
    type: String,
    label: "收讯者ID"
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
  }
});

Messages.attachSchema(Schemas.Message);