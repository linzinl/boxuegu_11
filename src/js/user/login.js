$("#login-form").ajaxForm({
    success: function(data) {
        if (data.code == 200) {
            alert("登录成功");
            /* 存储接收到的data.result到localStorage */
            localStorage.setItem("userInfo", JSON.stringify(data.result));
            location.href = "/dist";
        } else {
            alert("登录失败");
        }
    },
    error: function() {
        alert("登录失败");
    }
})