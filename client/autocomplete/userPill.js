Template.userPill.helpers({
  'labelClass':function(){
    if(this.status.online === true) {
      return 'text-success';
    }
    else {
      return 'hidden';
    }
  }
})