window.onload = function () {
    var container = document.getElementById('banner');
    var list = document.getElementById('inner');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1; 
    var len = 3;      		//图片的数量
    var animated = false;  
    var interval = 4000;    //自动播放定时器秒数，这里是4秒
    var timer;             //定时器

    var Container = document.getElementById('Container');
    var List = document.getElementById('List');
    var Prev = document.getElementById('Prev');
    var Next = document.getElementById('Next');
    var Animated = false;


    function animate (offset) {
        animated = true;    
        var time = 400;    
        var inteval = 10;  
        var speed = offset/(time/inteval);  
        var left = parseInt(list.style.left) + offset; //目标值

        var go = function (){
         if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go,inteval);
            }
            else {
                list.style.left = left + 'px';
                if(left>-1920){
                    list.style.left = -1920 * len + 'px';
                }
                if(left<(-1920 * len)) {
                    list.style.left = '-1920px';
                }
                animated = false; //切换完成
            }
        }
        go();
     
    }

    function Animate (Offset) {
            Animated = true;
                var newleft = parseInt(List.style.left) + Offset;
                var Time = 300;
                var Interval = 10;
                var Speed = Offset/(Time/Interval);

                var GO = function(){
                    if((Speed < 0  && parseInt(List.style.left) > newleft || (Speed > 0 && parseInt(List.style.left) < newleft)))
                    {
                        List.style.left = parseInt(List.style.left) + Speed +'px';
                        setTimeout(GO,Interval);
                    }
                    else{
                            Animated = false;
                            List.style.left = newleft+'px';

                            if (newleft>-400){
                                List.style.left=-800+'px';
                            }
                            if (newleft<-800){
                                List.style.left=-400+'px';
                            }
                    }

                }
                 GO();
    }

    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }
    
    function play() {
        timer = setTimeout(function () { //自动播放
            next.onclick();
            play();
        }, interval);
    }
     //清除定时器
    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {   
            return;
        }
        if (index == 3) {
            index = 1; 
        }
        else {
            index += 1;
        }
        animate(-1920);
        showButton();
    }

    prev.onclick = function () {
        if (animated) { 
            return;
        }
        if (index == 1) {
            index = 3;
        }
        else {
            index -= 1;
        }
        animate(1920);
        showButton();
    }

    Next.onclick = function(){
                Animate(-400);
            }

    Prev.onclick = function(){
                Animate(400);
            }


    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {       
                return;
            }
            if(this.className == 'on') {     
                return;
            }
            //获取按钮的自定义属性index，用于得到索引值
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -1920 * (myIndex - index);   

            animate(offset);
            index = myIndex;   //将新的索引值赋值index
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();  //调用自动播放函数

}











