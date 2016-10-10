var userAgent = detect.parse(navigator.userAgent);

var detectBrowser = function() {
  var bodyElement = document.querySelector('body');

  if (userAgent.browser.name.indexOf('Chrome') >= 0) {
    bodyElement.classList.add('chrome');
  } else if (userAgent.browser.name.indexOf('Firefox') >= 0) {
    bodyElement.classList.add('firefox');
  } else if (userAgent.browser.name.indexOf('Safari')) {
    bodyElement.classList.add('safari');
  } else if (userAgent.browser.name.indexOf('IE')) {
    bodyElement.classList.add('ie');
  } else if (userAgent.browser.name.indexOf('EDGE')) {
    bodyElement.classList.add('edge');
  }
}

var collapseSlider = function() {
  var onLoad = true;
  var toggleSidebarButton = document.querySelector('.js-toggle-sidebar');

  toggleSidebarButton.addEventListener('click', function() {
     if (onLoad) {
       toggleSidebarButton.classList.toggle('sidebar__btn--active');
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
  var dropdown = document.querySelector('.js-dropdown');
  var dropdownButton = document.querySelector('.js-dropdown-button');
  var dropdownNav = document.querySelector('.js-dropdown-nav');
  var thisDropdown;
  var isDropdownActive = false;

  Array.prototype.forEach.call(dropdownMenus, function(element, i) {
    element.style.maxHeight = element.offsetHeight + 'px';

    if (Boolean(element.getAttribute('data-dropdown-hidden')) === true) {
      element.classList.add('dropdown-menu__children--hidden');
    }
  });

  if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
    dropdownButton.addEventListener('touchend', function(e) {
      thisDropdown = this;

      if (!this.classList.contains('dropdown--clicked')) {
        this.parentNode.classList.add('dropdown--clicked');
        isDropdownActive = true;
      } else {
        this.parentNode.classList.remove('dropdown--clicked');
        isDropdownActive = false;
      }
    });
  } else {
    dropdown.addEventListener('mouseenter', function(e) {
      thisDropdown = this;
      this.classList.add('dropdown--hover');
    });

    dropdown.addEventListener('mouseleave', function(e) {
      thisDropdown = this;
      setTimeout(function (){
        thisDropdown.classList.remove('dropdown--hover');
      }, 200);
    });
  }

  if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
    window.addEventListener('touchstart', function(e){
      if(e.target != thisDropdown && e.target.parentNode != thisDropdown && isDropdownActive === true) {
        thisDropdown.parentNode.classList.remove('dropdown--clicked');
      }
    });
  }

  dropdownMenuTrigger.addEventListener('click', function() {
    this.classList.add('active');
    this.nextElementSibling.classList.contains('dropdown-menu__children--hidden') ? true : this.classList.remove('active');
    this.nextElementSibling.classList.toggle('dropdown-menu__children--hidden');
  });
}

var search = function() {
  var searchField =  document.querySelector('.js-search-field');
  var searchCancel = document.querySelector('.js-search-cancel');
  var searchOpen = document.querySelector('.js-search-open');
  var isSearchFocused = false;

  searchField.addEventListener('focusin', function() {
    searchField.parentNode.classList.add('search--active');
    isSearchFocused = true;
    console.log('isSearchFocused', isSearchFocused);
  });

  window.addEventListener('click', function(e) {
    if (isSearchFocused === true) {
      if(e.target != searchField && e.target.parentNode != searchField) {
        searchField.parentNode.classList.remove('search--active');
        isSearchFocused = false;
      }
    }
  });

  searchCancel.addEventListener('click', function() {
    searchField.parentNode.classList.remove('search--active');
    this.parentNode.querySelector('.js-search-field').value = "";
  });

  searchOpen.addEventListener('click', function() {
    this.parentNode.classList.toggle('search--active');
  });
}

var tabs = function() {
  var tabsNav = document.querySelector('.js-tabs-nav');
  var tabsNavs = document.querySelectorAll('.js-tabs-nav');
  var tabsNavItem = document.querySelector('.js-tabs-nav-item');
  var tabsNavItems = document.querySelectorAll('.js-tabs-nav-item');
  var tabsContentItems = document.querySelectorAll('.js-tabs-content-item');
  var tabsContentItem = document.querySelector('.js-tabs-content-item');
  var tabsChecker = true;
  var tabsAnimationDelay;
  var tabsResizeTimer;

  //Handle Tab Nav Switch
  for (var i = 0; i < tabsNavs.length; i++) {
    var element = tabsNavs[i];

    element.addEventListener('click', function(e) {
      e.preventDefault();

      if (tabsChecker === false) return false;

      var tabsContentPath;
      var tabsActiveContentPath;

      if (e.target !== e.currentTarget) {
        Array.prototype.forEach.call(this.querySelectorAll('.js-tabs-nav-item'), function(element, i) {
          if (element.parentNode.classList.contains('tabs__nav__item--active') === true) {
            if (element.getAttribute('href') === e.target.getAttribute('href')) {
              tabsActiveContentPath = element.getAttribute('href');

              return false;
            }

            element.parentNode.classList.remove('tabs__nav__item--active');

            return false;
          }
        });

        tabsContentPath = e.target.getAttribute('href');


        if (tabsActiveContentPath !== tabsContentPath) {
          e.target.parentNode.classList.add('tabs__nav__item--active');

          Array.prototype.forEach.call(this.closest('.js-tabs').querySelectorAll('.js-tabs-content-item'), function(element, i) {
            var tabPath = '#' + element.getAttribute('id');
            if (tabPath == tabsContentPath) {
              element.parentNode.style.height = element.offsetHeight + 'px';

              element.closest('.js-tabs').querySelector('.tabs__content__item--active').classList.add('tabs__content__item--hiding');
              element.classList.add('tabs__content__item--active');

              tabsAnimationDelay = parseFloat(getComputedStyle(element.closest('.js-tabs').querySelector('.tabs__content__item--hiding')).transitionDuration) * 1000;

              setTimeout(function() {
                element.closest('.js-tabs').querySelector('.tabs__content__item--hiding').classList.remove('tabs__content__item--active');
                element.closest('.js-tabs').querySelector('.tabs__content__item--hiding').classList.remove('tabs__content__item--hiding');
              }, tabsAnimationDelay);

              return false;
            }
          });

          tabsChecker = false;
          setTimeout(function() {
            tabsChecker = true;
          }, tabsAnimationDelay);
        }
      }
    });
  }

  var tabsHeightOnResize = function() {
    Array.prototype.forEach.call(tabsContentItems, function(element, i) {
      if (element.classList.contains('tabs__content__item--active') === true) {
        element.parentNode.style.height = element.offsetHeight + 'px';

        return false;
      }
    });
  }

  tabsHeightOnResize();

  window.addEventListener("resize", function(){
    clearTimeout(tabsResizeTimer);
    tabsResizeTimer = setTimeout(tabsHeightOnResize(), 100);
  });
}

var form = function() {
  var formFields = document.querySelectorAll('.js-field');
  var formField = document.querySelector('.js-field');
  var formInputs = document.querySelectorAll('.js-input');
  var formInput = document.querySelector('.js-input');
  //Keep watching every input on padding-left
  for (var i = 0; i < formInputs.length; i++) {
    var element = formInputs[i];

    element.addEventListener('focusin', function(e) {
        this.parentNode.classList.add('focus');
    });
    element.addEventListener('focusout', function(e) {
        this.parentNode.classList.remove('focus');
    });
  }
}

var calendar = function() {
  var calendars = document.querySelectorAll('.js-calendar');
  var thisCalendar;
  var isCalendarActive = false;

  for (var i = 0; i < calendars.length; i++) {
    var element = calendars[i];

    if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
      element.addEventListener('touchend', function(e) {
        thisCalendar = this;

        if (!this.classList.contains('calendar--clicked')) {
          this.classList.add('calendar--clicked');
          isCalendarActive = true;
        } else {
          this.classList.remove('calendar--clicked');
          isCalendarActive = false;
        }
      });
    } else {
      element.addEventListener('mouseenter', function(e) {
        this.classList.add('calendar--hover');
      });

      element.addEventListener('mouseleave', function(e) {
        thisCalendar = this;
        setTimeout(function (){
          thisCalendar.classList.remove('calendar--hover');
        }, 200);
      });
    }
  }

  if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
    window.addEventListener('touchstart', function(e){
      if(e.target != thisCalendar && e.target.parentNode != thisCalendar && isCalendarActive === true) {
        thisCalendar.classList.remove('calendar--clicked');
      }
    });
  }
}

//Run fastclick
// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }

window.addEventListener('load', function () {
  detectBrowser();
  collapseSlider();
  dropdownMenuToggle();
  search();
  calendar();
  tabs();
  form();
});
