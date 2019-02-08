$(document).ready(function(){
    $("#slider").on('slid.bs.carousel', function () {
    var currentIndex = $('div.active').index();
    for (let  i = 0; i < 5; i++) { 
        s = 'btn'+ i;
        if (i == currentIndex){
            document.getElementById(s).style.backgroundColor  = 'white';
        } else {
            document.getElementById(s).style.backgroundColor  = '#EE2D2F';
        }
      }
    });
 });
 
 function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}
