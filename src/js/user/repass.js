require("../common/header.js");
require("../common/aside.js");



$("#repass-form").on("submit", function() {
    if ($("#input-pass").val() !== $("#input-newPass").val()) {
        alert("两次输入密码不一致");
        return false;
    }
    $("#repass-form").ajaxSubmit({
        success: function(data) {
            if (data.code == 200) {
                console.log(data);
            }
        }
    })
    return false;
})