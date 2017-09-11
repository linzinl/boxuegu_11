/* 取出网址拼接的cg_id */
function getCgId(key) {
    var idStr = location.search.slice(1);
    var idArr = idStr.split("&");
    var idObj = {};
    for (var i = 0; i < idArr.length; i++) {
        var tempArr = idArr[i].split("=");
        idObj[tempArr[0]] = tempArr[1];
    }
    return key ? idObj[key] : idObj;
}

module.exports.getCgId = getCgId;