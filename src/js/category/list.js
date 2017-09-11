require("../common/header.js");
require("../common/aside.js");

/* 请求分类列表的ajax */
$.get("/v6/category", function(data) {
    if (data.code == 200) {
        $(".table_cg_list tbody").append(template("category_list_tpl", data.result));
    }
})