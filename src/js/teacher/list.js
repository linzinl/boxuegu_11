require("../common/header.js");
require("../common/aside.js");

/* 请求教师列表的ajax */
$.get("/v6/teacher", function(data) {
    if (data.code == 200) {
        $(".table_teacher_list tbody").append(template("teacher_list_tpl", data.result));
    }
})

/* 请求查看教师信息的ajax */
$(document).on("click", ".btn_look", function() {
    var tc_id = $(this).attr("data-id");
    $.ajax({
        url: "/v6/teacher/view",
        type: "get",
        data: { tc_id: tc_id },
        delegation: true,
        success: function(data) {
            if (data.code == 200) {
                $("#panel_list").html(template("teacher_ifo_tpl", data.result));
            }
        }
    })
})