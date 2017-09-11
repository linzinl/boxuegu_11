require("../common/header.js");
require("../common/aside.js");
$.get("/v6/category/top", function(data) {
    if (data.code == 200) {
        $("#group-sel").html(template("category-add-tpl", data.result));
    }
})

$("#category-add-form").ajaxForm(function(data) {
    if (data.code == 200) {
        alert("恭喜你添加学科成功");
    }
})