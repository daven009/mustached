CommonHelper = {
  'isInteger': function(n){
    n = parseInt(n);
    return n === +n && n === (n|0);
  },

  'isEmptyString': function(n){
    return '' === n.trim();
  },

  'trimInput' : function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  },

  'isValidPassword' : function(val) {
    if (val.length >= 6) {
      return true;
    }
    return false;
  },

  'isNotEmpty' : function(val) {
    if (!val || val.trim() === ''){
      return false;
    }
    return true;
  },

  'isValidName' : function(val){
    userRegex = /^[-\w\.\$@\*\!]{1,30}$/;
    if(!val.match(userRegex)){
      return false;
    }
    if (val.length < 3) {
      return false;
    }
    return true;
  }
}