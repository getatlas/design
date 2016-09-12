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

  Array.prototype.forEach.call(dropdownMenus, function(element, i) {
    element.style.maxHeight = element.offsetHeight + 'px';

    if (Boolean(element.getAttribute('data-dropdown-hidden')) === true) {
      element.classList.add('dropdown-menu__children--hidden');
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
  var tabsNav = document.querySelector('.js-tabs-nav');
  var tabsNavs = document.querySelectorAll('.js-tabs-nav');
  var tabsNavItem = document.querySelector('.js-tabs-nav-item');
  var tabsNavItems = document.querySelectorAll('.js-tabs-nav-item');
  var tabsContentItems = document.querySelectorAll('.js-tabs-content-item');
  var tabsContentItem = document.querySelector('.js-tabs-content-item');

  //Handle Tab Nav Switch
  for (var i = 0; i < tabsNavs.length; i++) {
    var element = tabsNavs[i];
    var checker = true;
    element.addEventListener('click', function(e) {
      e.preventDefault();

      if (checker === false) return false;

      var tabsContentPath;

      if (e.target !== e.currentTarget) {
        Array.prototype.forEach.call(this.querySelectorAll('.js-tabs-nav-item'), function(element, i) {
          if (element.parentNode.classList.contains('tabs__nav__item--active') === true) {
            element.parentNode.classList.remove('tabs__nav__item--active');

            return false;
          }
        });

        tabsContentPath = e.target.getAttribute('href');
        e.target.parentNode.classList.add('tabs__nav__item--active');

        Array.prototype.forEach.call(this.closest('.js-tabs').querySelectorAll('.js-tabs-content-item'), function(element, i) {
          var tabPath = '#' + element.getAttribute('id');
          if (tabPath == tabsContentPath) {
            console.log('No Witamy ponownie Panie Junior Front Adamie');
            element.parentNode.style.height = element.offsetHeight + 'px';

            element.closest('.js-tabs').querySelector('.tabs__content__item--active').classList.add('tabs__content__item--hiding');
            element.classList.add('tabs__content__item--active');

            setTimeout(function() {
              element.closest('.js-tabs').querySelector('.tabs__content__item--hiding').classList.remove('tabs__content__item--active');
              element.closest('.js-tabs').querySelector('.tabs__content__item--hiding').classList.remove('tabs__content__item--hiding');
            }, parseFloat(getComputedStyle(element.closest('.js-tabs').querySelector('.tabs__content__item--hiding')).transitionDuration) * 1000);

            return false;
          }
        });

        checker = false;

        setTimeout(function() {
          checker = true;
          console.log('Uff!');
        }, 1000);
      }
    });
  }

  //Set maxHeight for first active element
  Array.prototype.forEach.call(tabsContentItems, function(element, i) {
    if (element.classList.contains('tabs__content__item--active') === true) {
      element.parentNode.style.height = element.offsetHeight + 'px';

      return false;
    }
  });
}

window.addEventListener('load', function () {
  collapseSlider();
  dropdownMenuToggle();
  search();
  tabs();
});
