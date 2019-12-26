function my$(id) {
    return document.getElementById(id);
}
var html=my$("html");
var css=my$("css");
var js=my$("javaScript");
var htmlS=html.getElementsByTagName("div");
var cssS=css.getElementsByTagName("div");
var jsS=js.getElementsByTagName("div");

//内容颜色隔个变色函数
function color(obj) {
    for(var i=0;i<obj.length;i++){
        if(i%2==0){
            obj[i].style.color="#050059";
        }else{
            obj[i].style.color="black";
        }
    }
}
color(htmlS);
color(cssS);
color(jsS);
var nav_html=my$("nav-html");
var nav_css=my$("nav-css");
var nav_js=my$("nav-javaScript");
var htmlAll=my$("htmlAll");
var cssAll=my$("cssAll");
var javaScriptAll=my$("javaScriptAll");
var htmlMain=my$("htmlMain");
var cssMain=my$("cssMain");
var javaScriptMain=my$("javaScriptMain");
var htmlScroll=my$("htmlScroll");
var cssScroll=my$("cssScroll");
var javaScriptScroll=my$("javaScriptScroll");
var htmlBar=my$("htmlBar");
var cssBar=my$("cssBar");
var javaScriptBar=my$("javaScriptBar");
var nav_fMain=my$("nav-fMain");
var nav_fSpans=nav_fMain.getElementsByTagName("span");


//为每个h3设置自定义属性,并赋值
for(var i=0;i<nav_fSpans.length;i++){
    nav_fSpans[i].setAttribute("index",i);
}



//点击nav-f中小块的显示与隐藏函数,并移动到相应位置
function hidden(objSpan,box){
    objSpan.onclick=function () {
        if(box.style.display=="none"){
            box.style.display="block";
            index=this.getAttribute("index");
            nav_fMain.style.marginTop=-index*50+"px";  //每个h3高为50;
        }else if (box.style.display=="block"){
            box.style.display="none";
            nav_fMain.style.marginTop="0";
        }

    };
}
hidden(nav_html,htmlAll);//-----------------------------------------要增加1;
hidden(nav_css,cssAll);
hidden(nav_js,javaScriptAll);


//鼠标进入显示滚动条,离开隐藏滚动条函数
function f1(obj1,obj2) {
    obj1.onmouseover=function(){
        obj2.style.visibility="visible";
    };
    obj1.onmouseout=function () {
        obj2.style.visibility="hidden";
    }
}


//nav-f中滚动条函数
function scroll(box,main,scroll,bar) {
    if(main.offsetHeight>box.offsetHeight){  //内容够才显示滚动条;
        f1(box,scroll);//显示与隐藏滚动条
        //设置滚动轮bar的高:    滚动轮的高/滚动条scroll的高=box的高/内容main的高
        bar.style.height=scroll.offsetHeight*box.offsetHeight/main.offsetHeight+"px";
        bar.onmousedown=function (e) {
            //获取滚动轮点击位置距离顶部的高度:
            var height=e.clientY-bar.offsetTop;
            //注册移动事件,应该是document的移动事件,否则离开了滚动条就无效了
            document.onmousemove=function (e) {
                scroll.style.visibility="visible";
                //获取移动距离
                var y=e.clientY-height;
                //设置最大最小移动范围
                y=y<0?0:y;
                y=y>scroll.offsetHeight-bar.offsetHeight?scroll.offsetHeight-bar.offsetHeight:y;
                bar.style.top=y+"px";


                //设置鼠标移动的时候文字不被选中
                window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();

                //内容main的最大移动距离
                var mainMax=main.offsetHeight-box.offsetHeight;
                //获取内容移动的距离:  滚动轮bar移动的距离/滚动轮的最大移动距离=内容main移动的距离/main的最大移动距离
                main.style.marginTop=-mainMax*y/(scroll.offsetHeight-bar.offsetHeight)+"px";
            };

        };
        document.onmouseup=function () {
            scroll.style.visibility="hidden";
            document.onmousemove=null;
        }
    }

}///    注意 滚动轮bar要脱标,内容main不用;


//为各个隐藏块设置滚动条-------------------------------------------------------要增加2;
scroll(htmlAll,htmlMain,htmlScroll,htmlBar);
scroll(cssAll,cssMain,cssScroll,cssBar);
scroll(javaScriptAll,javaScriptMain,javaScriptScroll,javaScriptBar);

//要设置下面事件是因为: 对象.offset系列(这里是Height)无法获取一个display:none的对象的高;!!!!!!!!!!!!!!
window.onload=function () {
    cssAll.style.display="none";
    htmlAll.style.display="none";
    javaScriptAll.style.display="none";
};//页面加载完毕,隐藏各个大标签下的分区内容---------------------要增加3