Currents = new Meteor.Collection("currents");

var Schemas = {};

Schemas.Current = new SimpleSchema({
  user: {
    type: String,
    label: "用户ID"
  },
  topic: {
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

Currents.attachSchema(Schemas.Current);