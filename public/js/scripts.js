if (detect.parse(navigator.userAgent).device.type == "Mobile" || detect.parse(navigator.userAgent).device.type == "Tablet") {
  var DEVICE = 'touchend';
} else {
  var DEVICE = 'click';
}

var getDeviceType = function() {
  if (detect.parse(navigator.userAgent).device.type == "Mobile" || detect.parse(navigator.userAgent).device.type == "Tablet") {
    return 'mobile';
  } else {
    return 'desktop';
  }
}

var DEVICE_TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
}

if (getDeviceType() === DEVICE_TYPE.DESKTOP) {
  var EVENTS = {
    CLICK: 'click',
    SCROLL: 'scroll',
    RESIZE: 'resize',
  }
} else {
  var EVENTS = {
    CLICK: 'touchend',
    SCROLL: 'touchmove',
    RESIZE: 'orientationchange'
  }
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
  var SIDEBAR = document.querySelector('.js-sidebar');
  var BUTTON_TOGGLE = document.querySelector('.js-toggle-sidebar');
  var USAGE_INFO = document.querySelector('.js-usage-info');

  var isSidebarOpen = false;

  var animateUsageInfoSmall = function() {
    var animationDelay = 300;

    USAGE_INFO.classList.add('usage-info--hide');

    setTimeout(function(){
      USAGE_INFO.classList.remove('usage-info--full');
      USAGE_INFO.classList.add('usage-info--small');
    }, animationDelay);
    setTimeout(function(){
      USAGE_INFO.classList.remove('usage-info--hide');
      USAGE_INFO.classList.add('usage-info--show');
    }, animationDelay + 1);
    setTimeout(function(){
      USAGE_INFO.classList.remove('usage-info--show');
    }, animationDelay * 2);
  }

  var animateUsageInfoFull = function() {
    var animationDelay = 300;

    USAGE_INFO.classList.add('usage-info--hide');

    setTimeout(function(){
      USAGE_INFO.classList.add('usage-info--small');
      USAGE_INFO.classList.remove('usage-info--full');
    }, animationDelay);
    setTimeout(function(){
      USAGE_INFO.classList.remove('usage-info--hide');
      USAGE_INFO.classList.add('usage-info--show');
    }, animationDelay + 1);
    setTimeout(function(){
      USAGE_INFO.classList.remove('usage-info--show');
    }, animationDelay * 2);
  }

  BUTTON_TOGGLE.addEventListener(EVENTS.CLICK, function() {
     this.classList.toggle('sidebar__btn--active');
     SIDEBAR.classList.toggle('sidebar--collapsed');
     // 
    //  if (!isSidebarOpen) {
    //    animateUsageInfoSmall();
    //  } else {
    //    animateUsageInfoFull();
    //  }
     //
    //  isSidebarOpen = !isSidebarOpen;
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

  dropdownButton.addEventListener(EVENTS.CLICK, function(e) {
    thisDropdown = this.parentNode;

    if (!this.parentNode.classList.contains('dropdown--clicked')) {
      this.parentNode.classList.add('dropdown--clicked');
      isDropdownActive = true;
    } else {
      this.parentNode.classList.remove('dropdown--clicked');
      isDropdownActive = false;
    }
  });

  window.addEventListener(EVENTS.CLICK, function (e) {
    if (thisDropdown.contains(e.target) === false && isDropdownActive === true) {
      thisDropdown.classList.remove('dropdown--clicked');
      isDropdownActive = false;
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
  var searchCancel = document.querySelector('.js-search-cancel');
  var searchOpen = document.querySelector('.js-search-open');
  var isSearchFocused = false;

  searchField.addEventListener('focus', function() {
    searchField.parentNode.classList.add('search--active');
    isSearchFocused = true;
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
  var CALENDARS = document.querySelectorAll('.js-calendar-button');
  var CALENDAR = document.querySelector('.js-calendar-button');

  var isCalendarActive = false;
  var whichCalendarIsOpened = null;

  for (var i = 0; i < CALENDARS.length; i++) {
    CALENDARS[i].parentNode.setAttribute('data-calendar-eq', i);
  }

  for (var i = 0; i < CALENDARS.length; i++) {
    var ELEMENT = CALENDARS[i];

    ELEMENT.addEventListener(EVENTS.CLICK, function() {
      if (whichCalendarIsOpened !== this.parentNode.getAttribute('data-calendar-eq') &&
          whichCalendarIsOpened !== null &&
          isCalendarActive) {
        for (var i = 0; i < CALENDARS.length; i++) {
          if (CALENDARS[i].parentNode.classList.contains('calendar--clicked')) {
            CALENDARS[i].parentNode.classList.remove('calendar--clicked');
          }
        }
      } else {
        isCalendarActive = !isCalendarActive;
      }

      CALENDAR = this.parentNode;
      CALENDAR.classList.toggle('calendar--clicked');

      whichCalendarIsOpened = CALENDAR.getAttribute('data-calendar-eq');
    });
  }

  window.addEventListener(EVENTS.CLICK, function(event) {
    if (!CALENDAR.contains(event.target) && isCalendarActive) {
      CALENDAR.classList.remove('calendar--clicked');
      isCalendarActive = !isCalendarActive;
    }
  });
}

var results = function() {
  var RESULTS = document.querySelector('.js-results');
  var TOOLBAR = document.querySelector('.js-toolbar');
  var SEARCH_FIELD = document.querySelector('.js-search-field');

  var windowResizeTimer;
  var resultsHeight;
  var resultsMaxHeight;

  var setHeight = function(isResize) {
    clearTimeout(windowResizeTimer);
    windowResizeTimer = setTimeout(function() {
      RESULTS.style.height = 'auto';
      RESULTS.style.maxHeight = 'none';

      if (window.innerWidth > 768) {
        resultsMaxHeight = window.innerHeight - (TOOLBAR.offsetHeight * 2);
        resultsHeight = RESULTS.offsetHeight;
      } else {
        resultsMaxHeight = window.innerHeight - TOOLBAR.offsetHeight;
        resultsHeight = resultsMaxHeight;
      }

      RESULTS.style.height = resultsHeight + 'px';
      RESULTS.style.maxHeight = resultsMaxHeight + 'px';
    }, 100);
  }

  setHeight();
  window.addEventListener(EVENTS.RESIZE, setHeight);
}

var notifications = function() {
  var TOOLBAR = document.querySelector('.js-toolbar');
  var WRAPPER = document.querySelector('.js-wrapper');

  var isFullNotification = false;
  var isNotificationReaded = true;
  var windowResizeTimer;

  var NOT = {
    CONT: document.querySelector('.js-notifications'),
    OPEN_BTN: document.querySelector('.js-notifications-button'),
    READ_ALL_BTN: document.querySelector('.js-notifications-read-all'),
    READ_BTNS: document.querySelectorAll('.js-notification-read'),
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

  var setNotHeight = function(height) {
    if (height === 'small') {
      if (window.innerWidth >= 768) {
        var notificationsListHeight = window.innerHeight - TOOLBAR.clientHeight - NOT.PADDING.DEFAULT - parseInt(getComputedStyle(NOT.CONT).paddingBottom) - NOT.ALL_BTN.clientHeight - parseInt(getComputedStyle(NOT.ALL_BTN).marginTop) - 11 - 30; //11px - offset from toolbar, 30px - default margin
        var notificationsHeight = notificationsListHeight + NOT.PADDING.DEFAULT + parseInt(getComputedStyle(NOT.CONT).paddingBottom) + NOT.ALL_BTN.clientHeight + parseInt(getComputedStyle(NOT.ALL_BTN).marginTop);
      } else {
        var notificationsListHeight = window.innerHeight - TOOLBAR.clientHeight - NOT.PADDING.DEFAULT - parseInt(getComputedStyle(NOT.CONT).paddingBottom) - NOT.ALL_BTN.clientHeight - parseInt(getComputedStyle(NOT.ALL_BTN).marginTop);
        var notificationsHeight = window.innerHeight - TOOLBAR.clientHeight;
      }
    } else if (height === 'full') {
      if (window.innerWidth >= 768) {
        var notificationsListHeight = window.innerHeight - TOOLBAR.clientHeight - NOT.PADDING.FULL - parseInt(getComputedStyle(NOT.CONT).paddingBottom) - NOT.ALL_BTN.clientHeight - parseInt(getComputedStyle(NOT.ALL_BTN).marginTop) - 60; // 2 * 30px - default margin
        var notificationsHeight = notificationsListHeight + NOT.PADDING.FULL + parseInt(getComputedStyle(NOT.CONT).paddingBottom) + NOT.ALL_BTN.clientHeight + parseInt(getComputedStyle(NOT.ALL_BTN).marginTop);
      } else {
        var notificationsListHeight = window.innerHeight - TOOLBAR.clientHeight - NOT.PADDING.FULL - parseInt(getComputedStyle(NOT.CONT).paddingBottom) - NOT.ALL_BTN.clientHeight - parseInt(getComputedStyle(NOT.ALL_BTN).marginTop);
        var notificationsHeight = window.innerHeight - TOOLBAR.clientHeight;
      }
    }

    NOT.CONT.style.height = notificationsHeight + 'px';
    NOT.LIST.style.maxHeight = notificationsListHeight + 'px';
  }

  var showAllNot = function() {
    NOT.CONT.classList.add('notifications--animation', 'notifications--transition');
    WRAPPER.classList.add('wrapper--fade');

    setTimeout(function() {
      NOT.CONT.classList.add('notifications--full');

      NOT.READ_ALL_BTN.classList.remove('link', 'link--read', 'link--small')
      NOT.READ_ALL_BTN.classList.add('btn', 'btn--dark', 'btn--color-green', 'btn--notification');

      NOT.ALL_BTN.classList.remove('btn--full')
      NOT.ALL_BTN.classList.add('btn--color-green', 'btn--notification');
      NOT.ALL_BTN.textContent = 'mark all as read';
    }, NOT.DELAY);
    setTimeout(function() {
      setNotHeight('full');
    }, NOT.DELAY + 100);
    setTimeout(function() {
      NOT.CONT.classList.remove('notifications--animation');
    }, NOT.DELAY * 4);
    setTimeout(function() {
      NOT.CONT.classList.remove('notifications--transition');
    }, NOT.DELAY * 5);

    isFullNotification = !isFullNotification;
  }

  var hideNot = function() {
    NOT.CONT.classList.add('notifications--hide');
    TOOLBAR.classList.remove('toolbar--active');
    WRAPPER.classList.remove('wrapper--fade');

    setTimeout(function (){
      NOT.CONT.classList.remove('notifications--full');

      NOT.READ_ALL_BTN.classList.add('link', 'link--read', 'link--small');
      NOT.READ_ALL_BTN.classList.remove('btn', 'btn--dark', 'btn--color-green', 'btn--notification');

      NOT.ALL_BTN.classList.add('btn--full');
      NOT.ALL_BTN.classList.remove('btn--color-green', 'btn--notification');
      NOT.ALL_BTN.textContent = 'See all notifications';

      setNotHeight('small');
    }, NOT.DELAY / 3);

    setTimeout(function (){
      NOT.CONT.classList.remove('notifications--hide');
    }, NOT.DELAY);

    isFullNotification = !isFullNotification;

    scrollControl('remove');
  }

  var markAsRead = function() {
    NOT.CONT.parentNode.classList.remove('notifications-nav--clicked');
    NOT.OPEN_BTN.classList.remove('notifications-nav__button--new');
    hideNot();
    isNotificationReaded = !isNotificationReaded;
  }

  NOT.OPEN_BTN.addEventListener(EVENTS.CLICK, function(e) {
    if (isNotificationReaded === false) return;

    if (!this.parentNode.classList.contains('notifications-nav--clicked')) {
      this.parentNode.classList.add('notifications-nav--clicked');
      TOOLBAR.classList.add('toolbar--active');

      scrollControl('add');
    } else {
      this.parentNode.classList.remove('notifications-nav--clicked');
      TOOLBAR.classList.remove('toolbar--active');

      if (NOT.CONT.classList.contains('notifications--full')) {
        NOT.CONT.parentNode.classList.remove('notifications--full');
        hideNot();
      } else {
        scrollControl('remove');
      }
    }
  });

  NOT.ALL_BTN.addEventListener(DEVICE, function() {
    if (isFullNotification === false) {
      showAllNot();
    } else {
      markAsRead();
    }
  });

  NOT.READ_ALL_BTN.addEventListener(DEVICE, function(e) {
    e.preventDefault();
    markAsRead();
  });

  window.addEventListener('click', function (e) {
    if (!NOT.CONT.contains(e.target) && !NOT.OPEN_BTN.contains(e.target) && NOT.CONT.parentNode.classList.contains('notifications-nav--clicked')) {
      NOT.CONT.parentNode.classList.remove('notifications-nav--clicked');
      TOOLBAR.classList.remove('toolbar--active');

      if (NOT.CONT.classList.contains('notifications--full')) {
        hideNot();
      } else {
        scrollControl('remove');
      }
    }
  });

  for (var i = 0; i < NOT.READ_BTNS.length; i++) {
    var element = NOT.READ_BTNS[i];

    element.addEventListener('click', function(e) {
      e.preventDefault();

      this.parentNode.classList.add('notifications__item--readed');
      this.classList.add('notifications__item__action--readed');
      this.textContent = 'read';
    });
  }

  NOT.LIST.addEventListener(EVENTS.SCROLL, function (e){
    if (NOT.LIST.scrollTop > 0 && NOT.LIST.scrollTop + NOT.LIST.clientHeight !== NOT.LIST.scrollHeight) {
      NOT.LIST.classList.add('notifications__list--scrolled');
      NOT.LIST.classList.remove('notifications__list--scrolled-bottom');
    } else if (NOT.LIST.scrollTop > 0 && NOT.LIST.scrollTop + NOT.LIST.clientHeight === NOT.LIST.scrollHeight) {
      NOT.LIST.classList.add('notifications__list--scrolled-bottom');
    } else {
      NOT.LIST.classList.remove('notifications__list--scrolled');
    }
  });

  if (NOT.LIST.scrollHeight > NOT.LIST.clientHeight) {
    NOT.LIST.classList.add('notifications__list--with-scroll');
  }

  window.addEventListener('resize', function() {
    clearTimeout(windowResizeTimer);
    windowResizeTimer = setTimeout(function() {
      getWindowHeight();

      if (!isFullNotification) {
        setNotHeight('small');
      } else {
        setNotHeight('full');
      }
    }, 100);
  });

  setNotHeight('small');
}

//Run fastclick
// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }

var captureScroll = function(event) {
  var isScrollAllowed = false;
  var target = event.target;

  while (target !== null) {
      if (target.classList && target.classList.contains('js-capture-scroll')) {
          isScrollAllowed = true;
          break;
      }

      target = target.parentNode;
  }

  if (!isScrollAllowed) {
      event.preventDefault();
  }
}

var scrollControl = function(type) {
  var WRAPPER = document.querySelector('.js-wrapper');

  if (type.toLowerCase() === 'add') {
    if (getDeviceType() === DEVICE_TYPE.MOBILE) {
      window.addEventListener(EVENTS.SCROLL, captureScroll);
    }
  } else if (type.toLowerCase() === 'remove') {
    if (getDeviceType() === DEVICE_TYPE.MOBILE) {
      window.removeEventListener(EVENTS.SCROLL, captureScroll);
    }
  }
}

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
