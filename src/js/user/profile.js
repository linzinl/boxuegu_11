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
});

$("#settings-form").ajaxForm({
    /* 等上面的ajax请求成功后才执行该ajax请求 */
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert("修改成功");
        }
    }
})