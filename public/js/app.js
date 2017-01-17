'use strict';

//  BEGIN: Device & Events

//  Enums

var DEVICES = {
  DESKTOP: 'desktop',
  TOUCH: 'touch'
};

var EVENTS = {
  CLICK: function CLICK() {
    if (DEVICES.DESKTOP) {
      return 'click';
    }

    return 'touchend';
  },
  SCROLL: function SCROLL() {
    if (DEVICES.DESKTOP) {
      return 'scroll';
    }

    return 'touchmove';
  },
  RESIZE: function RESIZE() {
    if (DEVICES.DESKTOP) {
      return 'resize';
    }

    return 'orientationchange';
  }
};

//  Functions

function getDeviceType() {
  var deviceType = detect.parse(navigator.userAgent).device.type;

  if (deviceType === 'Mobile' || deviceType === 'Tablet') {
    return DEVICES.TOUCH;
  }

  return DEVICES.DESKTOP;
}

//  END: Device & Events

//  --------------------------------------------------

//  BEGIN: Get Window Size

function getWindowSize() {
  var SIZE = {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight
  };

  return SIZE;
}

//  END: Get Widnow Size

// ---------------------------------------------------

//  BEGIN: BROWSER DETECTION

function detectBrowser() {
  //  Enums

  var DOCUMENT = document.querySelector('body');

  //  Functions

  function getBrowserName() {
    var browserName = detect.parse(navigator.userAgent).browser.name.toLowerCase();
    var BROWSERS = {
      CHROME: 'chrome',
      FIREFOX: 'firefox',
      SAFARI: 'safari',
      IE: 'ie',
      EDGE: 'edge'
    };

    var BROWSER = void 0;

    _.each(BROWSERS, function (value) {
      if (browserName.indexOf(value) >= 0) {
        BROWSER = value;
      }
    });

    return BROWSER;
  }

  DOCUMENT.classList.add(getBrowserName());
}

//  END: BROWSER DETECTION

//  ------------------------------------------------

//  BEGIN: SIDEBAR TOGGLER

function Sidebar() {
  //  Enums
  var SIDEBAR = {
    CONT: document.querySelector('.js-sidebar'),
    BTN: {
      CONT: document.querySelector('.js-toggle-sidebar'),
      CLASS: {
        ACTIVE: 'sidebar__btn--active'
      }
    },
    CLASS: {
      COLLAPSED: 'sidebar--collapsed'
    }
  };

  // Listener

  SIDEBAR.BTN.CONT.addEventListener(EVENTS.CLICK(), function () {
    this.classList.toggle(SIDEBAR.BTN.CLASS.ACTIVE);
    SIDEBAR.CONT.classList.toggle(SIDEBAR.CLASS.COLLAPSED);
  });
}

//  END: SIDEBAR TOGGLER

//  ------------------------------------------

//  BEGIN: DROPDOWN HELPER

function Dropdown() {
  //  Enums

  var DROPDOWN = {
    SINGLE: document.querySelector('.js-dropdown'),
    ALL: document.querySelectorAll('.js-dropdown'),
    TRIGGER: {
      SINGLE: document.querySelector('.js-dropdown-trigger'),
      ALL: document.querySelectorAll('.js-dropdown-trigger'),
      THIS: _.noop,
      CLASS: {
        ACTIVE: 'dropdown__trigger--active'
      }
    },
    CONTENT: {
      CONT: document.querySelector('.js-dropdown-content'),
      CLASS: {
        ACTIVE: 'dropdown__content--active'
      }
    },
    CLASS: {
      ACTIVE: 'dropdown--active'
    }
  };

  var isOpened = false;
  var dropdownEq = _.noop;

  //  Functions

  function outsideClick() {}

  function isDropdownOpened(eq) {
    if (eq === dropdownEq) {
      return false;
    }

    if (!!eq) {
      return true;
    }

    return null;
  }

  function toggleDropdown() {
    DROPDOWN.TRIGGER.THIS = this;

    thisEq = DROPDOWN.TRIGGER.THIS.parentNode.getAttribute('data-actions-menu-eq');
    isDropdownOpened(dropdownEq);
    dropdownEq = thisEq;

    DROPDOWN.TRIGGER.THIS.parentNode.classList.toggle(DROPDOWN.CLASS.ACTIVE);
    DROPDOWN.TRIGGER.THIS.classList.toggle(DROPDOWN.TRIGGER.CLASS.ACTIVE);
    DROPDOWN.TRIGGER.THIS.nextElementSibling.classList.toggle(DROPDOWN.CONTENT.CLASS.ACTIVE);
  }

  //  Init

  _.each(DROPDOWN.ALL, function (ELEMENT, KEY) {
    ELEMENT.setAttribute('data-dropdown', KEY);
  });

  _.each(DROPDOWN.TRIGGER.ALL, function (ELEMENT, KEY) {
    ELEMENT.addEventListener(EVENTS.CLICK(), toggleDropdown);
  });
}

//  END: DROPDOWN HELPER


// INIT FUNCTIONS
window.addEventListener('load', function () {
  detectBrowser();
  Sidebar();
  Dropdown();
});