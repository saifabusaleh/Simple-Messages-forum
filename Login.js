$(document).ready(function() {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#login-submit').click(function() {

        var loginInfo = {
            user: $("#login-form #username").val(),
            password: $("#login-form #password").val()
        };
        $.ajax({
            url: "/login_process.php",
            type: "post",
            data: loginInfo,
            dataType: "text",
            success: function (data) {
                console.log("Success: " + data);
                window.location.replace("https://saifweb.000webhostapp.com/forum.html");

            },
            error: function (err) {
                console.log("Error: " + err);
            }
        });
    });

    $('#register-submit').click(function () {
        var info = {
            user: $("#register-form #username").val(),
            password: $("#register-form #password").val(),
            email: $("#email").val()
        };
        $.ajax({
            url: "/Register.php",
            type: "post",
            data: info,
            dataType: "text",
            success: function (data) {
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});