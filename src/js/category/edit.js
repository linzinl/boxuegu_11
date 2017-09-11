require("../common/header.js");
require("../common/aside.js");
var util = require("../common/util.js");
var cg_id = util.getCgId("cg_id");
$.get("/v6/category/edit", { cg_id: cg_id }, function(data) {
    if (data.code == 200) {
        $(".category-add").html(template("cg_edit_tpl", data.result));
    }
})

$("#cg_edit_form").ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert("修改学科成功");
        }
    }
})