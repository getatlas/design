var collapseSlider = function() {
  var onLoad = true;
  var toggleSidebarButton = document.querySelector('.js-toggle-sidebar');

  toggleSidebarButton.addEventListener('click', function() {
     if (onLoad) {
       document.querySelector('.js-sidebar').classList.add('sidebar--loaded');
       onLoad = true;
     }

     document.querySelector('.js-sidebar').classList.toggle('sidebar--collapsed');
  });
}

var dropdownMenuToggle = function() {
  var dropdownMenus = document.querySelectorAll('.js-dropdown-menu-nav');
  var dropdownMenu = document.querySelector('.js-dropdown-menu');
  var dropdownMenuTrigger = document.querySelector('.js-dropdown-menu-trigger');
  var dropdownMenuNav = document.querySelector('.js-dropdown-menu-nav');

  Array.prototype.forEach.call(dropdownMenus, function(el, i) {
    el.style.maxHeight = el.offsetHeight + 'px';

    if (Boolean(el.getAttribute('data-dropdown-hidden')) === true) {
      el.classList.add('dropdown-menu__children--hidden');
    }
  });

  dropdownMenuTrigger.addEventListener('click', function() {
    this.classList.add('active');
    this.nextElementSibling.classList.contains('dropdown-menu__children--hidden') ? true : this.classList.remove('active');
    this.nextElementSibling.classList.toggle('dropdown-menu__children--hidden');
  });
}

var search = function() {
  var searchField =  document.querySelector('.js-search-field');

  searchField.addEventListener('focusin', function() {
    searchField.parentNode.classList.add('search--active');
  });
  searchField.addEventListener('focusout', function() {
    searchField.parentNode.classList.remove('search--active');
  });
}

var tabs = function() {
  var tabsNavItem = document.querySelector('.js-tabs-nav-item');

  tabsNavItem.addEventListener('click', function(event) {
    // this.classList.add('tabs__nav__item--active');
    event.preventDefault();
  });

  // var tabsContent = document.querySelector('.js-tabs-content');
  // var tabsContentItem = document.querySelector('.js-tabs-content-item');
  //
  // tabsNavItem.addEventListener('click', function() {
  //     console.log('click handler fired');
  // });
}

window.addEventListener('load', function () {
  collapseSlider();
  dropdownMenuToggle();
  search();
  tabs();
});
