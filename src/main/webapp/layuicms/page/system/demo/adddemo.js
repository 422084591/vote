layui.config({
    base: $config.resUrl+'layuicms/common/js/'//定义基目录
}).extend({
    ajaxExtention:'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool:'tool',
    $api:'api'
}).use(['form', 'layer', 'jquery','ajaxExtention','$tool','$api'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        $tool = layui.$tool,
        $api = layui.$api;


    /**
     * 表单提交
     * */
    form.on("submit(adddemo)", function (data) {
        var bigTitle = data.field.bigTitle;
        var explain = data.field.explain;
        var number = data.field.number;

        var a = $("#zbt_coll").children();
        var zbt_coll = [];

        for (var i = 0; i < a.length; i++) {
            //子标题
            var subtitleContent = $($($($(a[i]).children(".layui-form-item")[0]).children(".layui-input-block")[0]).children("input")[0]).val();
            var e = $($(a[i]).children("#bz_collection")).children();//获取标准
            var t = $($(a[i]).children("#beice")).children();//获取uid
            var beice = [];
            for(var g = 0;g<t.length;g++){
                var uid = $($($(t[g]).children(".layui-input-block")[0]).children("input")[1]).val();
                beice.push({uid:uid});
                alert(uid);
            }
            //var uid = $($($($(a[i]).children(".layui-form-item")[1]).children(".layui-input-block")[0]).children("input")[1]).val();
            var bz_coll = [];//标准数组
            for (var j = 0; j < e.length; j++) {
                //标准
                var standardName = $($($($(e[j]).children(".layui-form-item")[0]).children(".layui-input-block")[0]).children("input")[0]).val();
                alert(standardName);
                //选项
                var id = $($($($(e[j]).children(".layui-form-item")[1]).children(".layui-input-block")[0]).children("input")[0]).is(":checked");
                var only;
                if (id) {
                    only = 78;
                } else {
                    only = 79;
                }
                //子标准
                var f = $(e[j]).children("#zbz").children();
                var zbz_coll = [];//子标准数组
                for (var k = 0; k < f.length; k++) {
                    var substandardName = $($($(f[k]).children(".layui-input-block")[0]).children("input")[0]).val();
                    zbz_coll.push({substandardName:substandardName});//获取子标准数据推入子标准数组中，由内到外
                }
                //获取标准底下数据放入bz_coll下
                var bz_obj = {standardName: standardName, id: only, zbz_coll: zbz_coll};//对象
                bz_coll.push(bz_obj);
            }
            //获取子标题底下数据放入zbt_coll下
            var zbt_obj = {subtitleContent: subtitleContent, bz_coll: bz_coll,beice:beice};
            zbt_coll.push(zbt_obj);
        }
        var coll = [];
        for (var h = 0; h <number ; h++) {
            var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var rens = "";
            for(var g = 0; g < 6 ; g ++) {
                var id = Math.ceil(Math.random()*35);
                rens += chars[id];
            }
            coll.push(rens);
        }
        var gg = {coll:coll};
        var zhang = JSON.stringify(gg);
        window.sessionStorage.setItem("zhang", zhang);//将值存入域，传到下个页面做准备

        var data = {bigTitle: bigTitle, explain: explain, number: number,list:zbt_coll,coll:coll};
        alert(JSON.stringify(data));//转成json对象

        $api.AddDemo(JSON.stringify(data),{contentType:"application/json;charset=UTF-8"},function (data) {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("发布成功！",{time:1000},function () {
                var index = layui.layer.open({
                    title: "账号",
                    type: 2,
                    content: "pwd.html",
                    success: function (layero, index) {
                        setTimeout(function () {
                            layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                                tips: 3
                            });
                        }, 500)
                    }
                });
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function () {
                    layui.layer.full(index);
                });
                layui.layer.full(index);
                // layer.closeAll("iframe");
                // //刷新父页面
                // parent.location.reload();
            });
        });
        return false;
    })
});

function  openAdduser(target) {
    console.log(target.next().attr('id'));
    layer.open({
        type: 2,
        title:"添加被测人员",
        id:"link",
        area: ['75%', '80%'],
        fixed: false, //不固定
        maxmin: true,
        content: 'addUname.html?uidname='+target.attr('id')
    })
}


