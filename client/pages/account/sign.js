Template.sign.events({
  //如果用户没有存在将直接变成注册
  'blur input[name=username], keyup input[name=username]' : function(e, t) {
    var username = CommonHelper.trimInput(t.find('input[name=username]').value.toLowerCase());
    if (CommonHelper.isValidName(username)) {
      var count = Meteor.users.find({username:username}).count();
      if (0 == count) {
        $('#emailField').show();
        $('#signLabel').html('新用户注册');
        $('#modalSubmitBtn').val('注册');
      }
      else {
        $('#emailField').hide();
        $('#signLabel').html('用户登录');
        $('#modalSubmitBtn').val('登陆');
      }
    }
    else {
      $('#emailField').hide();
      $('#signLabel').html('用户登录');
      $('#modalSubmitBtn').val('登陆');
    }
  },
  'submit #signForm' : function(e, t) {
    e.preventDefault();
    var username = CommonHelper.trimInput(t.find('input[name=username]').value.toLowerCase())
      , password = t.find('input[name=password]').value
      , email = t.find('input[name=email]').value;

      if (CommonHelper.isValidName(username) && CommonHelper.isValidPassword(password) && CommonHelper.isValidEmail(email)){
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