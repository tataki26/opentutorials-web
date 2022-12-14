// same function name, different object
var Body = {
    setColor: function (color) {
        // document.querySelector('body').style.color = color;
        $('body').css('color', color);
    },
}
var Links = {
    setColor: function (color) {
        // let alist = document.querySelectorAll('a');
        // for(let i = 0; i < alist.length; i++){
        //     alist[i].style.color = color;
        // }
        $('a').css('color', color);
    },
}
// 기존에 사용하던 this를 그대로 두면 전역 변수로서 window를 받게 된다
// 매개변수를 통해 JS가 적용될 태그를 가리키는 this를 사용하도록 한다
function nightDayHandler(self) {
    let target = document.querySelector('body');
    if(self.value === 'Night'){
        self.value = 'Day'
        target.style.backgroundColor = 'black';
        Body.setColor('white');
        Links.setColor('powderblue');  
    }
    else {
        self.value = 'Night';
        target.style.backgroundColor = 'white';
        Body.setColor('black');
        Links.setColor('blue');
    }
}