var collapseSlider = function() {
  var onLoad = true;
  document.querySelector('.js-toggle-sidebar').addEventListener('click', function () {
     if (onLoad) {
       document.querySelector('.js-sidebar').classList.add('sidebar--loaded');
       onLoad = true;
     }

     document.querySelector('.js-sidebar').classList.toggle('sidebar--collapsed');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  collapseSlider();
});
