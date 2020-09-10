function mouseover(obj) {
    var temp = document.getElementById('password');
    var icon = document.querySelector(".toggle-password");
    $("#eye-icon").attr('class', 'fa fa-eye-slash');
    temp.type = "text";
  }
function mouseout(obj) {
    var temp = document.getElementById('password');
    temp.type = "password";
    $("#eye-icon").attr('class', 'fa fa-eye');
  }