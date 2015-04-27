Helps = new Meteor.Collection("helps");

var Schemas = {};

Schemas.Help = new SimpleSchema({
  topic: {
    type: String,
    label: "主题ID"
  },
  content: {
    type: String,
    label: "帮助内容"
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

Helps.attachSchema(Schemas.Help);