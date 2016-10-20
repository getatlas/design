var userAgent = detect.parse(navigator.userAgent);
var windowHeight = window.innerHeight;

var getWindowHeight = function() {
  windowHeight = window.innerHeight;
};

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
  var thisDropdown = document.querySelector('.js-dropdown-button');
  var isDropdownActive = false;

  Array.prototype.forEach.call(dropdownMenus, function(element, i) {
    element.style.maxHeight = element.offsetHeight + 'px';

    if (Boolean(element.getAttribute('data-dropdown-hidden')) === true) {
      element.classList.add('dropdown-menu__children--hidden');
    }
  });

  if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
    dropdownButton.addEventListener('touchend', function(e) {
      thisDropdown = this.parentNode;

      if (!this.parentNode.classList.contains('dropdown--clicked')) {
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
    window.addEventListener('touchend', function (e) {
      if (thisDropdown.contains(e.target) === false && isDropdownActive === true) {
        thisDropdown.classList.remove('dropdown--clicked');
        isDropdownActive = false;
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

  searchCancel.addEventListener('click', function(e) {
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
  var calendars = document.querySelectorAll('.js-calendar-button');
  var thisCalendar = document.querySelector('.js-calendar-button');
  var isCalendarActive = false;

  for (var i = 0; i < calendars.length; i++) {
    var element = calendars[i];

    if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
      element.addEventListener('touchend', function(e) {
        thisCalendar = this.parentNode;

        if (!this.parentNode.classList.contains('calendar--clicked')) {
          this.parentNode.classList.add('calendar--clicked');
          isCalendarActive = true;
        } else {
          this.parentNode.classList.remove('calendar--clicked');
          isCalendarActive = false;
        }
      });
    } else {
      element.parentNode.addEventListener('mouseenter', function(e) {
        this.classList.add('calendar--hover');
      });

      element.parentNode.addEventListener('mouseleave', function(e) {
        thisCalendar = this;
        setTimeout(function (){
          thisCalendar.classList.remove('calendar--hover');
        }, 200);
      });
    }
  }

  if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
    window.addEventListener('touchend', function(e) {
      if(thisCalendar.contains(e.target) === false && isCalendarActive === true) {
        thisCalendar.classList.remove('calendar--clicked');
        isCalendarActive = false;
      }
    });
  }
}

var results = function() {
  var windowResizeTimer;
  var results = document.querySelector('.js-results');
  var toolbar = document.querySelector('.js-toolbar');

  if (userAgent.device.type == "Mobile" || userAgent.device.type == "Tablet") {
    results.style.height = windowHeight - parseInt(getComputedStyle(toolbar).height) + 'px';

    window.addEventListener("resize", function() {
      clearTimeout(windowResizeTimer);
      windowResizeTimer = setTimeout(function() {
        getWindowHeight();
        results.style.height = windowHeight - parseInt(getComputedStyle(toolbar).height) + 'px';
      }, 100);
    });
  } else {
    results.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';

    window.addEventListener("resize", function() {
      clearTimeout(windowResizeTimer);
      windowResizeTimer = setTimeout(function() {
        getWindowHeight();
        results.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';
      }, 100);
    });
  }
}

var notifications = function() {
  var toolbar = document.querySelector('.js-toolbar');
  var notifications = document.querySelector('.js-notifications');
  var notificationsList = document.querySelector('.js-notifications-list');
  var notificationsReadAllButton = document.querySelector('.js-notifications-read-all');
  var notificationsMoreButton = document.querySelector('.js-notifications-more');
  var notificationsReadButton = document.querySelectorAll('.js-notification-read');
  var notificationsItem = document.querySelectorAll('.js-notification');
  var notificationHeadings = document.querySelectorAll('.js-notification-heading');
  var wrapper = document.querySelector('.js-wrapper');
  var isFullNotification = false;
  var windowResizeTimer;

  notifications.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';
  notificationsList.style.maxHeight = parseInt(getComputedStyle(notifications).maxHeight) - parseInt(getComputedStyle(notifications).paddingTop) - parseInt(getComputedStyle(notifications).paddingBottom) - parseInt(getComputedStyle(notificationsReadAllButton).height) - parseInt(getComputedStyle(notificationsMoreButton).height) - parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';

  window.addEventListener('resize', function() {
    clearTimeout(windowResizeTimer);
    windowResizeTimer = setTimeout(function() {
      getWindowHeight();
      notifications.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';
      notificationsList.style.maxHeight = parseInt(getComputedStyle(notifications).maxHeight) - parseInt(getComputedStyle(notifications).paddingTop) - parseInt(getComputedStyle(notifications).paddingBottom) - parseInt(getComputedStyle(notificationsReadAllButton).height) - parseInt(getComputedStyle(notificationsMoreButton).height) - parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
    }, 100);
  });

  Array.prototype.forEach.call(notificationHeadings, function(element, i) {
    element.style.height = element.offsetHeight + 'px';
  });

  for (var i = 0; i < notificationsReadButton.length; i++) {
    var element = notificationsReadButton[i];

    element.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.add('notifications__item--readed');
      this.classList.add('notifications__item__action--readed');
      this.textContent = 'read';
    });
  }

  notificationsMoreButton.addEventListener('click', function() {
    if (isFullNotification === false) {
      isFullNotification = true;
      notifications.classList.add('notifications--full');
      notificationsList.classList.add('notifications__list--full');
      notificationsReadAllButton.classList.remove('link', 'link--read', 'link--small');
      notificationsReadAllButton.classList.add('btn', 'btn--dark', 'btn--color-green', 'btn--notification');
      notificationsMoreButton.classList.remove('btn--full');
      notificationsMoreButton.classList.add('btn--color-green', 'btn--notification');
      wrapper.classList.add('wrapper--fade');
    } else {
      isFullNotification = false;
      notifications.classList.remove('notifications--full');
      notificationsList.classList.remove('notifications__list--full');
      notificationsReadAllButton.classList.add('link', 'link--read', 'link--small');
      notificationsReadAllButton.classList.remove('btn', 'btn--dark', 'btn--color-green', 'btn--notification');
      notificationsMoreButton.classList.add('btn--full');
      notificationsMoreButton.classList.remove('btn--color-green', 'btn--notification');
      wrapper.classList.remove('wrapper--fade');
    }
  });
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
  results();
  notifications();
});
