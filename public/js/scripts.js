if (detect.parse(navigator.userAgent).device.type == "Mobile" || detect.parse(navigator.userAgent).device.type == "Tablet") {
  var DEVICE = 'touchend';
} else {
  var DEVICE = 'click';
}

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
    dropdownButton.addEventListener('click', function(e) {
      thisDropdown = this.parentNode;

      if (!this.parentNode.classList.contains('dropdown--clicked')) {
        this.parentNode.classList.add('dropdown--clicked');
        isDropdownActive = true;
      } else {
        this.parentNode.classList.remove('dropdown--clicked');
        isDropdownActive = false;
      }
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
  // var notifications = document.querySelector('.js-notifications');
  // var notificationsButton = document.querySelector('.js-notifications-button');
  // var notificationsList = document.querySelector('.js-notifications-list');
  // var notificationsReadAllButton = document.querySelector('.js-notifications-read-all');
  // var notificationsMoreButton = document.querySelector('.js-notifications-more');
  // var notificationsReadButton = document.querySelectorAll('.js-notification-read'); SPRAWDZIĆ
  // var notificationsItem = document.querySelectorAll('.js-notification');
  // var notificationHeadings = document.querySelectorAll('.js-notification-heading');
  // var notificationsPaddingSmall = 33;
  // var notificationsPaddingFull = 86;
  var WRAPPER = document.querySelector('.js-wrapper');
  var isFullNotification = false;
  var windowResizeTimer;

  var NOT = {
    CONT: document.querySelector('.js-notifications'),
    OPEN_BTN: document.querySelector('.js-notifications-button'),
    READ_BTN: document.querySelector('.js-notifications-read-all'),
    ALL_BTN: document.querySelector('.js-notifications-more'),
    LIST: document.querySelector('.js-notifications-list'),
    ITEM: document.querySelectorAll('.js-notification'),
    HEADINGS: document.querySelectorAll('.js-notification-heading'),
    PADDING: {
      DEFAULT: 33,
      FULL: 86,
    },
    DELAY: 300,
  };

  // TODO:
  // Rewrite setting height for elements
  // Rewrite clicking DONE
  // Write Mark as read function

  var setNotHeight = function(height) {
    var height = NOT.LIST.clientHeight + NOT.PADDING.FULL + parseInt(getComputedStyle(NOT.CONT).paddingBottom) + NOT.ALL_BTN.clientHeight + parseInt(getComputedStyle(NOT.ALL_BTN).marginTop);
    NOT.CONT.style.height = height + 'px';
  }

  var showAllNot = function() {
    NOT.CONT.classList.add('notifications--animation');

    setTimeout(function() {
      WRAPPER.classList.add('wrapper--fade');

      NOT.CONT.classList.add('notifications--full');

      NOT.READ_BTN.classList.remove('link', 'link--read', 'link--small')
      NOT.READ_BTN.classList.add('btn', 'btn--dark', 'btn--color-green', 'btn--notification');

      NOT.ALL_BTN.classList.remove('btn--full')
      NOT.ALL_BTN.classList.add('btn--color-green', 'btn--notification');
      NOT.ALL_BTN.textContent = 'mark all as read';

      setNotHeight();
    }, NOT.DELAY);
    setTimeout(function() {
      NOT.CONT.classList.remove('notifications--animation');
    }, NOT.DELAY * 4);
  }

  NOT.OPEN_BTN.addEventListener(DEVICE, function(e) {
    if (!this.parentNode.classList.contains('notifications-nav--clicked')) {
      this.parentNode.classList.add('notifications-nav--clicked');
      toolbar.classList.add('toolbar--active');
    } else {
      this.parentNode.classList.remove('notifications-nav--clicked');
      toolbar.classList.remove('toolbar--active');

      if (NOT.CONT.classList.contains('notifications--full')) {
        NOT.CONT.parentNode.classList.remove('notifications--full');
        // smallNotifications();
      }

      isFullNotification = false;
    }
  });

  NOT.ALL_BTN.addEventListener(DEVICE, function() {
    if (isFullNotification === false) {
      console.log('Full');
      showAllNot();
    } else {
      console.log('Close');
      // markAsRead();
    }

    isFullNotification = !isFullNotification;
  });

  //
  // notifications.style.height = notificationsList.clientHeight + notificationsPaddingSmall + parseInt(getComputedStyle(notifications).paddingBottom) + notificationsMoreButton.clientHeight + parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //
  // var smallNotifications = function () {
  //   notifications.classList.add('notifications--animation');
  //
  //   setTimeout(function (){
  //     notifications.classList.remove('notifications--full');
  //     notificationsReadAllButton.classList.add('link', 'link--read', 'link--small');
  //     notificationsReadAllButton.classList.remove('btn', 'btn--dark', 'btn--color-green', 'btn--notification');
  //     notificationsMoreButton.classList.add('btn--full');
  //     notificationsMoreButton.classList.remove('btn--color-green', 'btn--notification');
  //     notificationsMoreButton.textContent = 'See all notifications';
  //     wrapper.classList.remove('wrapper--fade');
  //   }, 300);
  //   setTimeout(function (){
  //     getWindowHeight();
  //     notifications.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';
  //     notificationsList.style.maxHeight = parseInt(getComputedStyle(notifications).maxHeight) - parseInt(getComputedStyle(notifications).paddingTop) - parseInt(getComputedStyle(notifications).paddingBottom) - parseInt(getComputedStyle(notificationsReadAllButton).height) - parseInt(getComputedStyle(notificationsMoreButton).height) - parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //     notifications.style.height = notificationsList.clientHeight + notificationsPaddingSmall + parseInt(getComputedStyle(notifications).paddingBottom) + notificationsMoreButton.clientHeight + parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //   }, 1200);
  //   setTimeout(function (){
  //     notifications.classList.remove('notifications--animation');
  //   }, 900);
  // };
  //
  // var fullNotifications = function() {
  //   notifications.classList.add('notifications--animation');
  //
  //   setTimeout(function (){
  //     notifications.classList.add('notifications--full');
      // notificationsReadAllButton.classList.remove('link', 'link--read', 'link--small');
      // notificationsReadAllButton.classList.add('btn', 'btn--dark', 'btn--color-green', 'btn--notification');
      // notificationsMoreButton.classList.remove('btn--full');
      // notificationsMoreButton.classList.add('btn--color-green', 'btn--notification');
      // notificationsMoreButton.textContent = 'mark all as read';
      // wrapper.classList.add('wrapper--fade');
  //     getWindowHeight();
  //     notifications.style.maxHeight = windowHeight - parseInt(getComputedStyle(toolbar).height) - 60 + 'px';
  //     notificationsList.style.maxHeight = parseInt(getComputedStyle(notifications).maxHeight) - notificationsPaddingFull - parseInt(getComputedStyle(notifications).paddingBottom) - parseInt(getComputedStyle(notificationsReadAllButton).height) - parseInt(getComputedStyle(notificationsMoreButton).height) - parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //     notifications.style.height = notificationsList.clientHeight + notificationsPaddingFull + parseInt(getComputedStyle(notifications).paddingBottom) + notificationsMoreButton.clientHeight + parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //   }, 300);
  //   setTimeout(function (){
  //     notifications.classList.remove('notifications--animation');
  //   }, 1200);
  // };
  //
  // window.addEventListener('click', function (e) {
  //   if (notifications.contains(e.target) === false && notificationsButton.contains(e.target) === false && notifications.parentNode.classList.contains('notifications-nav--clicked')) {
  //     notifications.parentNode.classList.remove('notifications-nav--clicked');
  //     if (wrapper.classList.contains('wrapper--fade')) {
  //       wrapper.classList.remove('wrapper--fade');
  //     }
  //     if (notifications.classList.contains('notifications--full')) {
  //       isFullNotification = false;
  //
  //       if (notifications.classList.contains('notifications--full')) {
  //         notifications.parentNode.classList.remove('notifications--full')
  //         smallNotifications();
  //       }
  //     }
  //   }
  // });
  //
  //
  // notifications.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';
  // notificationsList.style.maxHeight = parseInt(getComputedStyle(notifications).maxHeight) - parseInt(getComputedStyle(notifications).paddingTop) - parseInt(getComputedStyle(notifications).paddingBottom) - parseInt(getComputedStyle(notificationsReadAllButton).height) - parseInt(getComputedStyle(notificationsMoreButton).height) - parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //
  // window.addEventListener('resize', function() {
  //   clearTimeout(windowResizeTimer);
  //   windowResizeTimer = setTimeout(function() {
  //     getWindowHeight();
  //
  //     if (isFullNotification === false) {
  //       notifications.style.maxHeight = windowHeight - (parseInt(getComputedStyle(toolbar).height) * 2) + 'px';
  //     } else {
  //       notifications.style.maxHeight = windowHeight - parseInt(getComputedStyle(toolbar).height) - 60 + 'px';
  //     }
  //
  //     notificationsList.style.maxHeight = parseInt(getComputedStyle(notifications).maxHeight) - parseInt(getComputedStyle(notifications).paddingTop) - parseInt(getComputedStyle(notifications).paddingBottom) - parseInt(getComputedStyle(notificationsReadAllButton).height) - parseInt(getComputedStyle(notificationsMoreButton).height) - parseInt(getComputedStyle(notificationsMoreButton).marginTop) + 'px';
  //   }, 100);
  // });
  //
  // for (var i = 0; i < notificationsReadButton.length; i++) {
  //   var element = notificationsReadButton[i];
  //
  //   element.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     this.parentNode.classList.add('notifications__item--readed');
  //     this.classList.add('notifications__item__action--readed');
  //     this.textContent = 'read';
  //   });
  // }
  //
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
