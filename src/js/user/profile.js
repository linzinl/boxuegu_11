require("../common/header.js");
require("../common/aside.js");


/* 请求ajax */
$.ajax({
    url: "/v6/teacher/profile",
    type: "get",
    success: function(data) {
        if (data.code == 200) {
            $(".settings").html(template("settings-tpl", data.result));
        }
    }
})