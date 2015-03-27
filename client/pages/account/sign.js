Template.sign.events({
  //如果用户没有存在将直接变成注册
  'keyup input[name=username]' : function(e, t) {
    var username = CommonHelper.trimInput(t.find('input[name=username]').value.toLowerCase());
    if (CommonHelper.isValidName(username)) {
      var count = Meteor.users.find({username:username}).count();
      if (0 == count) {
        $('#emailField').removeClass('hide');
        $('#signLabel').html('新用户注册');
        $('#modalLoginBtn').html('注册');
      }
      else {
        $('#emailField').addClass('hide');
        $('#signLabel').html('用户登录');
        $('#modalLoginBtn').html('登陆');
      }
    }
    else {
      $('#emailField').addClass('hide');
      $('#signLabel').html('用户登录');
      $('#modalLoginBtn').html('登陆');
    }
  },
  'submit #signForm' : function(e, t) {
    e.preventDefault();
    var username = CommonHelper.trimInput(t.find('input[name=username]').value.toLowerCase())
      , password = t.find('input[name=password]').value
      , email = t.find('input[name=email]').value;

      if (CommonHelper.isValidName(username) && CommonHelper.isValidPassword(password)){
        var count = Meteor.users.find({username:username}).count();
        if (0 == count) {
          Accounts.createUser({
            username: username,
            email: email,
            password: password
          }, function(err){
            if (err && err.error === 403) {
              console.log(err);
            } else {
              $('#signModal').modal('hide');
              swal('注册成功', '欢迎加入胡子客！', 'success');
            }
          });
        }
        else {
          Meteor.loginWithPassword(username, password, function(err){
            if (err && err.error === 403) {
            //console.log(err);
          }
          else {
            $('#signModal').modal('hide');
          }
        });
        }
      }
    }
  });