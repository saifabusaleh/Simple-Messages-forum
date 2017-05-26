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
        $("#messages").empty();
        $("#messages").append("<li class='list-group-item'>Loading...</li>");
        $.ajax({
            url: "/forum.php",
            type: "get",
            success: function (data) {
                $("#messages").empty();
                for (i = 0; i < data.length; i++) {
                    let li = "<li class='list-group-item'>" +
                        data[i].name + ": " + data[i].message +
                        "</li>";
                    $("#messages").append(li);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    refreshMessages();

    $("#msgHeader, #messages").click(function () {
        refreshMessages();
    });

    $.ajax({
        url: "/profile.php",
        type: "get",
        success: function (data) {
            var username = data;
            $("#userName").text(data);
            console.log("logged user: " + username);
            if(username.length === 2) {//means that its logged/off
                showLoginTab();
                hideLogoutButton();
                disableMessageInputAndSave();
            } else {
                enableMessageInputAndSave();
                hideLoginTab()
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

    $("#logout").click(function(){
        $.ajax({
            url: "/logout.php",
            type: "get",
            success: function (data) {
                console.log(data);
            //    showLoginTab();
             //   hideLogoutButton();
            //    $("#userName").text(" ");
                window.location.replace("https://saifweb.000webhostapp.com/forum.html");
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    function hideLoginTab() {
        //   if ($("#userName").text().length > 0) {
        $("#loginTab").hide();
        //   }
    }

    function showLoginTab() {
        //   if ($("#userName").text().length > 0) {
        $("#loginTab").show();
        //   }
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
});