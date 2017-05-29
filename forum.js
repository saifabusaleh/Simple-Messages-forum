/**
 * Created by Admin on 5/25/2017.
 */
$(document).ready(function() {
    $("#save").click(function () {
        var d = {
            name: $("#userName").text(),
            message: $("#message").val()
        };
        $.ajax({
            url: "/forum.php",
            type: "post",
            data: d,
            dataType: "text",
            success: function (data) {
                refreshMessages();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    function refreshMessages() {
         counter=0;
         $("#posts").empty();
         $("#messages").append("<li class='list-group-item'>Loading...</li>");
        $.ajax({
            url: "/forum.php",
            type: "get",
            success: function (data) {
                $("#posts").empty();
                $("#message").val('');
                for (i = 0; i < data.length; i++) {
                    data[i].name = data[i].name.split("\"").join("");
                    $("#posts").append(createPostTemplate(data[i].name,data[i].message));
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    refreshMessages();

    $.ajax({
        url: "/profile.php",
        type: "get",
        success: function (data) {
            data = JSON.parse(data);
            if(data && data[0]){
                var username = data[0].user;
                var isAdmin=data[0].is_admin;
                if(isAdmin == 0 ) {
                    $(".glyphicon-remove").hide();
                }
                $("#userName").text(username);
                enableMessageInputAndSave();
                hideLoginTab()
            } else {
                $(".glyphicon-remove").hide();
                showLoginTab();
                hideLogoutButton();
                disableMessageInputAndSave();
            }

        },
        error: function (err) {
            console.log(err);
        }
    });

    $("#logout").click(function(e){
        e.preventDefault();
        $.ajax({
            url: "/logout.php",
            type: "get",
            success: function (data) {
                window.location.replace("https://saifweb.000webhostapp.com/forum.html");
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $(document).on('click','.glyphicon-remove',function(){
        var postHeader = $(this).parent().text().split(".");
        var user = postHeader[1];
        var texts = $(".panel-body");
        var text = texts.eq(postHeader[0]).text();
        text = text.split(" ").join("");
        var d = {
            name: user,
            message: text
        };
        $.ajax({
            url: "/deletePost.php",
            type: "post",
            data: d,
            dataType: "text",
            success: function () {
                refreshMessages();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
    function hideLoginTab() {
        $("#loginTab").hide();
    }

    function showLoginTab() {
        $("#loginTab").show();
    }

    function hideLogoutButton() {
        $("#logout").hide();
    }

    function disableMessageInputAndSave() {
        $("#message").prop('disabled', true);
        $("#save").prop('disabled', true);

    }

    function enableMessageInputAndSave() {
        $("#message").prop('disabled', false);
        $("#save").prop('disabled', false);
    }

    var counter=0;
    function createPostTemplate(username,  text) {
        var result = '<div class="col-sm-5">' +
        '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<strong>'+ counter + '.' + username + '</strong>' +
            ' <span class="glyphicon glyphicon-remove"></span> ' +
           ' </div>' +
            '<div class="panel-body"> '+
            '' + text +
        '</div>' +
        '</div>' +
        '</div>';

        counter++;
        return result;
    }

});