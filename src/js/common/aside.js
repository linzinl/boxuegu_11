/* 取用户的登录信息,并且更新 */
var userinfoStr = localStorage.getItem("userInfo");
var userinfo = JSON.parse(userinfoStr);
$(".profile img").attr("src", userinfo.tc_avatar);
$(".profile h4").text(userinfo.tc_name);

/* 分类管理/课程管理子列表显示隐藏 */
$(".navs a").on("click", function() {
    $(this).next("ul").slideToggle();
});

/* 根据访问的页面给对应的标题添加焦点 */
var path = location.pathname;
$(".navs a").removeClass("active");
$(".navs a[href='" + path + "']").addClass("active").parents().show();