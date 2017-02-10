/*  global _ Dropzone UPLOAD_DROPZONE detect  */
/*  eslint no-undef: "error"  */
/*  eslint no-use-before-define: ["error", { "functions": false, "classes": false }]  */
/*  eslint no-param-reassign: ["error", { "props": false }] */
/*  eslint-env es6  */

'use strict';

//  BEGIN: Device & Events

//  Enums

const DEVICES = {
  DESKTOP: 'desktop',
  TOUCH: 'touch'
};

const EVENTS = {
  CLICK: () => {
    if (DEVICES.DESKTOP) {
      return 'click';
    }

    return 'touchend';
  },
  SCROLL: () => {
    if (DEVICES.DESKTOP) {
      return 'scroll';
    }

    return 'touchmove';
  },
  SCROLLING: () => {
    if (DEVICES.DESKTOP) {
      return 'mousewheel';
    }

    return 'touchmove';
  },
  RESIZE: () => {
    if (DEVICES.DESKTOP) {
      return 'resize';
    }

    return 'orientationchange';
  },
  FOCUS: 'focus',
  FOCUS_IN: 'focusin',
  FOCUS_OUT: 'focusout'
};

//  Functions

function getDeviceType() {
  const deviceType = detect.parse(navigator.userAgent).device.type;

  if (deviceType === 'Mobile' || deviceType === 'Tablet') {
    return DEVICES.TOUCH;
  }

  return DEVICES.DESKTOP;
}

//  END: Device & Events

//  --------------------------------------------------

//  BEGIN: Get Window Size

function getWindowSize() {
  const SIZE = {
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

  const DOCUMENT = document.querySelector('body');

  //  Functions

  function getBrowserName() {
    const browserName = detect.parse(navigator.userAgent).browser.name.toLowerCase();
    const BROWSERS = {
      CHROME: 'chrome',
      FIREFOX: 'firefox',
      SAFARI: 'safari',
      IE: 'ie',
      EDGE: 'edge'
    };

    let BROWSER;

    _.each(BROWSERS, value => {
      if (_.includes(browserName, value)) {
        BROWSER = value;
      }
    });

    return BROWSER;
  }

  DOCUMENT.classList.add(getBrowserName());
}

//  END: BROWSER DETECTION

//  -------------------------------------------------

//  BEGIN: SIDEBAR TOGGLER

function Sidebar() {
  //  Enums
  const SIDEBAR = {
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

  function initSidebar() {
    this.classList.toggle(SIDEBAR.BTN.CLASS.ACTIVE);
    SIDEBAR.CONT.classList.toggle(SIDEBAR.CLASS.COLLAPSED);
  }

  // Listener

  if (SIDEBAR.BTN.CONT !== null) {
    SIDEBAR.BTN.CONT.addEventListener(EVENTS.CLICK(), initSidebar);
  }
}

//  END: SIDEBAR TOGGLER

//  ------------------------------------------

//  BEGIN: DROPDOWN HELPER

function Dropdown() {
  //  Enums

  const DROPDOWN = {
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
      SINGLE: document.querySelector('.js-dropdown-content'),
      ALL: document.querySelectorAll('.js-dropdown-content'),
      THIS: _.noop,
      CLASS: {
        ACTIVE: 'dropdown__content--active',
        HIDDEN: 'dropdown__content--hidden',
        ON_TOP: 'dropdown__content--on-top'
      }
    },
    CLASS: {
      ACTIVE: 'dropdown--active',
      LAST_ACTIVE: 'dropdown--last-active'
    }
  };

  let isOpened = false;
  let isClosing = false;
  let dropdownEq;
  let listHeight;

  //  Functions

  function outsideClick(event) {
    if (!DROPDOWN.TRIGGER.THIS.parentNode.contains(event.target)) {
      closeSpecificDropdown(dropdownEq);
      isOpened = false;

      window.removeEventListener(EVENTS.CLICK(), outsideClick);
    }
  }

  function shouldCloseDropdown(eq) {
    if (dropdownEq === undefined) {
      return null;
    } else if (dropdownEq === eq) {
      return false;
    }

    return true;
  }

  function closeSpecificDropdown(eq) {
    DROPDOWN.ALL[eq].classList.remove(DROPDOWN.CLASS.ACTIVE);
    DROPDOWN.TRIGGER.ALL[eq].classList.remove(DROPDOWN.TRIGGER.CLASS.ACTIVE);
    DROPDOWN.CONTENT.ALL[eq].classList.remove(DROPDOWN.CONTENT.CLASS.ACTIVE);
    DROPDOWN.CONTENT.ALL[eq].classList.add(DROPDOWN.CONTENT.CLASS.HIDDEN);
  }

  function listClick(event) {
    if (event.target.tagName === 'A' ||
        event.target.tagName === 'BUTTON') {
      closeSpecificDropdown(dropdownEq);
      DROPDOWN.CONTENT.THIS.removeEventListener(EVENTS.CLICK(), listClick);
    }
  }

  function toggleDropdown() {
    if (isClosing) {
      return;
    }

    DROPDOWN.TRIGGER.THIS = this;
    DROPDOWN.CONTENT.THIS = this.nextElementSibling;
    let thisEq = DROPDOWN.TRIGGER.THIS.parentNode.getAttribute('data-dropdown');

    if (thisEq !== dropdownEq && dropdownEq !== undefined) {
      DROPDOWN.ALL[dropdownEq].classList.remove(DROPDOWN.CLASS.LAST_ACTIVE);
      DROPDOWN.TRIGGER.THIS.parentNode.classList.add(DROPDOWN.CLASS.LAST_ACTIVE);
    } else if (dropdownEq === undefined) {
      DROPDOWN.TRIGGER.THIS.parentNode.classList.add(DROPDOWN.CLASS.LAST_ACTIVE);
    }

    if (shouldCloseDropdown(thisEq) && isOpened) {
      closeSpecificDropdown(dropdownEq);
      isOpened = false;
    }

    DROPDOWN.TRIGGER.THIS.parentNode.classList.toggle(DROPDOWN.CLASS.ACTIVE);
    DROPDOWN.TRIGGER.THIS.classList.toggle(DROPDOWN.TRIGGER.CLASS.ACTIVE);
    DROPDOWN.CONTENT.THIS.classList.toggle(DROPDOWN.CONTENT.CLASS.ACTIVE);
    DROPDOWN.CONTENT.THIS.classList.toggle(DROPDOWN.CONTENT.CLASS.HIDDEN);

    isOpened = !isOpened;
    isClosing = !isClosing;
    dropdownEq = thisEq;


    setTimeout(() => {
      isClosing = !isClosing;
    }, 100);

    if (DROPDOWN.TRIGGER.THIS.parentNode.getAttribute('data-dropdown-options') === 'autoclose') {
      DROPDOWN.CONTENT.THIS.addEventListener(EVENTS.CLICK(), listClick);
    }

    if (isOpened) {
      window.addEventListener(EVENTS.CLICK(), outsideClick);
    } else {
      window.removeEventListener(EVENTS.CLICK(), outsideClick);
    }

    if (DROPDOWN.TRIGGER.THIS.parentNode.hasAttribute('data-dropdown-type') &&
        DROPDOWN.TRIGGER.THIS.parentNode.getAttribute('data-dropdown-type') === 'select' &&
        isDropdownInside(DROPDOWN.TRIGGER.THIS.parentNode, 'js-modal')) {
      let onlyNumbers = /\D/g;
      let modalPosition = document.querySelector('.js-modal').getBoundingClientRect();
      let dropdownPosition = DROPDOWN.TRIGGER.THIS.parentNode.getBoundingClientRect();
      if (dropdownPosition.top - modalPosition.top > (modalPosition.height / 2) &&
          isOpened) {
        let calculation = dropdownPosition.top - modalPosition.top - 30;
        listHeight = parseInt(DROPDOWN.CONTENT.THIS.getAttribute('style').replace(onlyNumbers, ''), 10);
        DROPDOWN.CONTENT.THIS.classList.add(DROPDOWN.CONTENT.CLASS.ON_TOP);
        DROPDOWN.CONTENT.THIS.style.maxHeight = calculation + 'px';
      } else {
        setTimeout(() => {
          DROPDOWN.CONTENT.THIS.classList.remove(DROPDOWN.CONTENT.CLASS.ON_TOP);
          DROPDOWN.CONTENT.THIS.style.maxHeight = listHeight + 'px';
        }, 100);
      }
    }
  }

  function isDropdownInside(element, parent) {
    let ELEMENT = element;

    while (ELEMENT) {
      if (ELEMENT.classList && ELEMENT.classList.contains(parent)) {
        return true;
      }

      ELEMENT = ELEMENT.parentNode;
    }

    return false;
  }

  //  Init

  _.each(DROPDOWN.ALL, (ELEMENT, KEY) => {
    ELEMENT.setAttribute('data-dropdown', KEY);
  });

  _.each(DROPDOWN.TRIGGER.ALL, (ELEMENT) => {
    if (ELEMENT.parentNode.hasAttribute('data-dropdown-animation') &&
      ELEMENT.parentNode.getAttribute('data-dropdown-animation') === 'slide') {
      let DROPDOWN_CONTENT = ELEMENT.nextElementSibling;
      DROPDOWN_CONTENT.style.maxHeight = DROPDOWN_CONTENT.clientHeight + 'px';
      DROPDOWN_CONTENT.classList.add(DROPDOWN.CONTENT.CLASS.HIDDEN);
    }

    ELEMENT.addEventListener(EVENTS.CLICK(), toggleDropdown);
  });
}

//  END: DROPDOWN HELPER

//  BEGIN: SEARCH

function Search() {
  //  Enums

  const SEARCH = {
    CONT: document.querySelector('.js-search'),
    FIELD: document.querySelector('.js-search-field'),
    CANCEL: document.querySelector('.js-search-cancel'),
    OPEN: document.querySelector('.js-search-open'),
    RESULTS: document.querySelector('.js-results'),
    CLASS: {
      ACTIVE: 'search--active'
    }
  };

  //  Functions

  function closeSearch() {
    SEARCH.CONT.classList.remove(SEARCH.CLASS.ACTIVE);

    window.removeEventListener(EVENTS.CLICK(), outsideClick);
  }

  function outsideClick(event) {
    if (!SEARCH.CONT.contains(event.target) && !SEARCH.RESULTS.contains(event.target)) {
      closeSearch();

      window.removeEventListener(EVENTS.CLICK(), outsideClick);
    }
  }

  function cleanField() {
    SEARCH.FIELD.value = '';
    closeSearch();

    SEARCH.CANCEL.removeEventListener(EVENTS.CLICK(), cleanField);
  }

  function openSearch() {
    SEARCH.CONT.classList.add(SEARCH.CLASS.ACTIVE);

    window.addEventListener(EVENTS.CLICK(), outsideClick);
    SEARCH.CANCEL.addEventListener(EVENTS.CLICK(), cleanField);
  }

  //  Init

  if (SEARCH.FIELD !== null) {
    SEARCH.FIELD.addEventListener(EVENTS.FOCUS, openSearch);
  }
}

//  END: SEARCH

//  BEGIN: TABS

function Tabs() {
  //  ENUMS

  const TAB = {
    PARENT: {
      THIS: _.noop
    },
    SINGLE: document.querySelector('.js-tabs'),
    ALL: document.querySelectorAll('.js-tabs'),
    NAV: {
      SINGLE: document.querySelector('.js-tabs-nav'),
      ALL: document.querySelectorAll('.js-tabs-nav'),
      ITEM: {
        SINGLE: document.querySelector('.js-tabs-nav-item'),
        ALL: document.querySelectorAll('.js-tabs-nav-item'),
        THIS: _.noop,
        CLASS: {
          ACTIVE: 'tabs__nav__item--active'
        }
      }
    },
    CONTENT: {
      SINGLE: document.querySelector('.js-tabs-content-item'),
      ALL: document.querySelectorAll('.js-tabs-content-item'),
      THIS: _.noop,
      CLASS: {
        ACTIVE: 'tabs__content__item--active',
        HIDE: 'tabs__content__item--hiding'
      }
    }
  };

  const TAB_ANIMATION_DELAY = 300;

  //  Helpers
  let navEq = 0;
  let isLocked = false;

  //  Functions

  function Nav(event) {
    event.preventDefault();

    if (event.target === event.currentTarget ||
      event.target.parentNode.classList.contains(TAB.NAV.ITEM.CLASS.ACTIVE) ||
      isLocked) {
      return null;
    }

    isLocked = true;

    TAB.NAV.ITEM.THIS = this.querySelectorAll('.js-tabs-nav-item');
    TAB.CONTENT.THIS = event.currentTarget.parentNode.nextElementSibling.querySelectorAll('.js-tabs-content-item');

    _.each(TAB.NAV.ITEM.THIS, (ELEMENT, KEY) => {
      if (ELEMENT.parentNode.classList.contains(TAB.NAV.ITEM.CLASS.ACTIVE)) {
        ELEMENT.parentNode.classList.remove(TAB.NAV.ITEM.CLASS.ACTIVE);
        navEq = KEY;

        setTimeout(() => {
          TAB.CONTENT.THIS[KEY].classList.remove(TAB.CONTENT.CLASS.ACTIVE);
          isLocked = false;
        }, TAB_ANIMATION_DELAY);
      }
    });

    event.target.parentNode.classList.add(TAB.NAV.ITEM.CLASS.ACTIVE);

    _.each(TAB.NAV.ITEM.THIS, (ELEMENT, KEY) => {
      if (ELEMENT.parentNode.classList.contains(TAB.NAV.ITEM.CLASS.ACTIVE)) {
        TAB.CONTENT.THIS[KEY].classList.add(TAB.CONTENT.CLASS.ACTIVE);
        TAB.CONTENT.THIS[KEY].parentNode.style.height = TAB.CONTENT.THIS[KEY].offsetHeight + 'px';

        TAB.CONTENT.THIS[navEq].classList.add(TAB.CONTENT.CLASS.HIDE);
        setTimeout(() => {
          TAB.CONTENT.THIS[navEq].classList.remove(TAB.CONTENT.CLASS.HIDE);

          navEq = KEY;
        }, TAB_ANIMATION_DELAY);
      }
    });
  }

  function changeHeight() {
    let resizeTime;
    clearTimeout(resizeTime);
    resizeTime = setTimeout(() => {
      _.each(TAB.CONTENT.ALL, ELEMENT => {
        if (ELEMENT.classList.contains(TAB.CONTENT.CLASS.ACTIVE)) {
          TAB.PARENT.THIS = ELEMENT.parentNode;
          TAB.PARENT.THIS.style.height = ELEMENT.offsetHeight + 'px';
        }
      });
    }, 100);
  }

  //  Init

  _.each(TAB.NAV.ALL, (ELEMENT) => {
    let contentElement = ELEMENT.parentNode.nextElementSibling;
    let contentAllElement = contentElement.querySelectorAll('.js-tabs-content-item');
    ELEMENT.addEventListener(EVENTS.CLICK(), Nav);

    //  Set active first slide
    contentAllElement[0].classList.add(TAB.CONTENT.CLASS.ACTIVE);
    contentElement.style.height = contentAllElement[0].offsetHeight + 'px';
  });

  window.addEventListener(EVENTS.RESIZE(), changeHeight);
}

//  END: TABS

//  -----------------------------------------------

//  BEGIN: FORMS

function Form() {
  //  Enums

  const FORM = {
    FIELD: {
      ALL: document.querySelectorAll('.js-field'),
      SINGLE: document.querySelector('.js-field')
    },
    INPUT: {
      ALL: document.querySelectorAll('.js-field'),
      SINGLE: document.querySelector('.js-field')
    }
  };

  //  Functions

  function focus() {
    this.parentNode.classList.toggle('focus');
  }

  //  Init

  _.each(FORM.INPUT.ALL, (ELEMENT) => {
    ELEMENT.addEventListener(EVENTS.FOCUS_IN, focus);
    ELEMENT.addEventListener(EVENTS.FOCUS_OUT, focus);
  });
}

//  END: FORMS

//  -------------------------------------------------------------

//  BEGIN: RESULTS

function Results() {
  //  Enums

  const RESULTS = document.querySelector('.js-results');
  const TOOLBAR = document.querySelector('.js-toolbar');

  //  Functions

  function setHeight() {
    let resizeTime;
    clearTimeout(resizeTime);
    resizeTime = setTimeout(() => {
      RESULTS.style.height = 'auto';
      RESULTS.style.maxHeight = 'none';
      let resultsHeight;
      let resultsMaxHeight = getWindowSize().HEIGHT;

      if (getWindowSize().WIDTH > 768) {
        resultsMaxHeight -= TOOLBAR.offsetHeight * 2;
        resultsHeight = RESULTS.offsetHeight;
      } else {
        resultsMaxHeight -= TOOLBAR.offsetHeight;
        resultsHeight = resultsMaxHeight;
      }

      RESULTS.style.height = resultsHeight + 'px';
      RESULTS.style.maxHeight = resultsMaxHeight + 'px';
    }, 100);
  }

  //  Init

  if (RESULTS !== null) {
    setHeight();
    window.addEventListener(EVENTS.RESIZE(), setHeight);
  }
}

//  END: RESULTS

//  ----------------------------------------------------------------

// BEGIN: NOTIFICATIONS

function Notifications() {
  // Enums
  const NOTIFICATION = {
    PARENT: {
      CLASS: {
        CLICKED: 'notifications-nav--clicked'
      }
    },
    CONT: {
      ITEM: document.querySelector('.js-notifications'),
      CLASS: {
        ANIMATION: 'notifications--animation',
        TRANSITION: 'notifications--transition',
        FULL: 'notifications--full',
        HIDE: 'notifications--hide'
      }
    },
    BTN: {
      OPEN: document.querySelector('.js-notifications-button'),
      READ_ALL: document.querySelector('.js-notifications-read-all'),
      READ: document.querySelectorAll('.js-notification-read'),
      MORE: document.querySelector('.js-notifications-more'),
      CLOSE: document.querySelector('.js-notifications-close'),
      CLASS: {
        READED: 'notifications__item__action--readed'
      }
    },
    LIST: {
      ALL: document.querySelectorAll('.js-notifications-list'),
      ITEM: document.querySelector('.js-notifications-list'),
      CLASS: {
        SCROLLED: 'notifications__list--scrolled',
        BOTTOM: 'notifications__list--scrolled-bottom',
        SCROLL: 'notifications__list--scrolled'
      }
    },
    ITEM: {
      ITEM: document.querySelectorAll('.js-notification'),
      CLASS: {
        READED: 'notifications__item--readed'
      }
    },
    HEADING: document.querySelectorAll('.js-notification-heading'),
    PADDING: {
      DEFAULT: 33,
      FULL: 86
    },
    SIZE: {
      SMALL: 'small',
      FULL: 'full'
    }
  };

  const TOOLBAR = document.querySelector('.js-toolbar');
  const WRAPPER = document.querySelector('.js-wrapper');

  const NOTIFICATION_DELAY = 300;

  //  Helpers
  let isFullNotification = false;
  let isNotificationReaded = false;

  //  Functions

  function setHeight(size) {
    let resizeTime;
    clearTimeout(resizeTime);
    resizeTime = setTimeout(() => {
      let list;
      let notification;

      if (size === NOTIFICATION.SIZE.SMALL ||
        !isFullNotification) {
        if (getWindowSize().WIDTH >= 768) {
          //  11px - offset from toolbar, 30px - default margin
          list = getWindowSize().HEIGHT - TOOLBAR.clientHeight - NOTIFICATION.PADDING.DEFAULT -
            parseInt(getComputedStyle(NOTIFICATION.CONT.ITEM).paddingBottom, 10) -
            NOTIFICATION.BTN.MORE.clientHeight -
            parseInt(getComputedStyle(NOTIFICATION.BTN.MORE).marginTop, 10) - 11 - 30;
          notification = list + NOTIFICATION.PADDING.DEFAULT +
            parseInt(getComputedStyle(NOTIFICATION.CONT.ITEM).paddingBottom, 10) +
            NOTIFICATION.BTN.MORE.clientHeight +
            parseInt(getComputedStyle(NOTIFICATION.BTN.MORE).marginTop, 10);
        } else {
          list = getWindowSize().HEIGHT - TOOLBAR.clientHeight - NOTIFICATION.PADDING.DEFAULT -
            parseInt(getComputedStyle(NOTIFICATION.CONT.ITEM).paddingBottom, 10) -
            NOTIFICATION.BTN.MORE.clientHeight -
            parseInt(getComputedStyle(NOTIFICATION.BTN.MORE).marginTop, 10);
          notification = getWindowSize().HEIGHT - TOOLBAR.clientHeight;
        }
      } else if (size === NOTIFICATION.SIZE.FULL ||
        isFullNotification) {
        if (getWindowSize().WIDTH >= 768) {
          //  2 * 30px - default margin
          list = getWindowSize().HEIGHT - TOOLBAR.clientHeight - NOTIFICATION.PADDING.FULL -
            parseInt(getComputedStyle(NOTIFICATION.CONT.ITEM).paddingBottom, 10) -
            NOTIFICATION.BTN.MORE.clientHeight -
            parseInt(getComputedStyle(NOTIFICATION.BTN.MORE).marginTop, 10) - 60;
          notification = list + NOTIFICATION.PADDING.FULL +
            parseInt(getComputedStyle(NOTIFICATION.CONT.ITEM).paddingBottom, 10) +
            NOTIFICATION.BTN.MORE.clientHeight +
            parseInt(getComputedStyle(NOTIFICATION.BTN.MORE).marginTop, 10);
        } else {
          list = getWindowSize().HEIGHT - TOOLBAR.clientHeight - NOTIFICATION.PADDING.FULL -
            parseInt(getComputedStyle(NOTIFICATION.CONT.ITEM).paddingBottom, 10) -
            NOTIFICATION.BTN.MORE.clientHeight -
            parseInt(getComputedStyle(NOTIFICATION.BTN.MORE).marginTop, 10);
          notification = getWindowSize().HEIGHT - TOOLBAR.clientHeight;
        }
      }

      NOTIFICATION.CONT.ITEM.style.height = notification + 'px';
      NOTIFICATION.LIST.ITEM.style.maxHeight = list + 'px';
    }, 100);
  }

  function outsideClick(event) {
    if (!NOTIFICATION.CONT.ITEM.contains(event.target) &&
      !NOTIFICATION.CONT.ITEM.parentNode.contains(event.target)) {
      hideNotification();

      window.removeEventListener(EVENTS.CLICK(), outsideClick);
    }
  }

  function showNotification() {
    isFullNotification = true;
    NOTIFICATION.BTN.MORE.removeEventListener(EVENTS.RESIZE(), showNotification);

    NOTIFICATION.CONT.ITEM.classList.add(NOTIFICATION.CONT.CLASS.ANIMATION,
                                         NOTIFICATION.CONT.CLASS.TRANSITION);
    WRAPPER.classList.add('wrapper--fade'); // TODO: Add enum for that

    setTimeout(() => {
      NOTIFICATION.CONT.ITEM.classList.add(NOTIFICATION.CONT.CLASS.FULL);

      NOTIFICATION.BTN.READ_ALL.classList.remove('link', 'link--read', 'link--small');
      NOTIFICATION.BTN.READ_ALL.classList.add('btn', 'btn--dark', 'btn--color-green', 'btn--notification');

      NOTIFICATION.BTN.MORE.classList.remove('btn--full');
      NOTIFICATION.BTN.MORE.classList.add('btn--color-green', 'btn--notification');
      NOTIFICATION.BTN.MORE.textContent = 'mark all as read';
    }, NOTIFICATION_DELAY);
    setTimeout(() => {
      setHeight(NOTIFICATION.SIZE.FULL);
    }, NOTIFICATION_DELAY + 100);
    setTimeout(() => {
      NOTIFICATION.CONT.ITEM.classList.remove(NOTIFICATION.CONT.CLASS.ANIMATION);
    }, NOTIFICATION_DELAY * 4);
    setTimeout(() => {
      NOTIFICATION.CONT.ITEM.classList.remove(NOTIFICATION.CONT.CLASS.TRANSITION);
    }, NOTIFICATION_DELAY * 5);

    NOTIFICATION.BTN.MORE.addEventListener(EVENTS.CLICK(), markAsReaded);
  }

  function hideNotification() {
    NOTIFICATION.CONT.ITEM.parentNode.classList.remove(NOTIFICATION.PARENT.CLASS.CLICKED);
    WRAPPER.classList.remove('wrapper--fade');

    NOTIFICATION.CONT.ITEM.classList.add(NOTIFICATION.CONT.CLASS.HIDE);
    TOOLBAR.classList.remove('toolbar--active'); // TODO: Add enum for that
    WRAPPER.classList.remove('wrapper--fade'); // TODO: Add enum for that

    setTimeout(() => {
      NOTIFICATION.CONT.ITEM.classList.remove(NOTIFICATION.CONT.CLASS.FULL);

      NOTIFICATION.BTN.READ_ALL.classList.add('link', 'link--read', 'link--small');
      NOTIFICATION.BTN.READ_ALL.classList.remove('btn', 'btn--dark', 'btn--color-green', 'btn--notification');

      NOTIFICATION.BTN.MORE.classList.add('btn--full');
      NOTIFICATION.BTN.MORE.classList.remove('btn--color-green', 'btn--notification');
      NOTIFICATION.BTN.MORE.textContent = 'See all notifications';

      setHeight(NOTIFICATION.SIZE.SMALL);
    }, NOTIFICATION_DELAY / 3);
    setTimeout(() => {
      NOTIFICATION.CONT.ITEM.classList.remove(NOTIFICATION.CONT.CLASS.HIDE);
      isFullNotification = false;
    }, NOTIFICATION_DELAY);

    NOTIFICATION.BTN.MORE.removeEventListener(EVENTS.CLICK(), markAsReaded);
    NOTIFICATION.BTN.READ_ALL.removeEventListener(EVENTS.CLICK(), markAsReaded);
    NOTIFICATION.LIST.ITEM.removeEventListener(EVENTS.SCROLL(), checkScrollPosition);
    WRAPPER.removeEventListener(EVENTS.SCROLLING(), lockScroll);

    if (getDeviceType() === DEVICES.TOUCH) {
      NOTIFICATION.BTN.CLOSE.removeEventListener(EVENTS.CLICK(), hideNotification);
    }
  }

  function markAsReaded() {
    isNotificationReaded = !isNotificationReaded;

    NOTIFICATION.CONT.ITEM.parentNode.classList.remove(NOTIFICATION.PARENT.CLASS.CLICKED);
    NOTIFICATION.BTN.OPEN.classList.remove('notifications-nav__button--new');

    hideNotification();
  }

  function readNotification(event) {
    event.preventDefault();

    this.parentNode.classList.add(NOTIFICATION.ITEM.CLASS.READED);
    this.classList.add(NOTIFICATION.BTN.CLASS.READED);
    this.textContent = 'read';
  }

  function isListHasScroll() {
    let SCROLL = {
      CURRENT: NOTIFICATION.LIST.ITEM.scrollTop,
      WINDOW_HEIGHT: NOTIFICATION.LIST.ITEM.clientHeight,
      DOCUMENT_HEIGHT: NOTIFICATION.LIST.ITEM.scrollHeight
    };

    if (SCROLL.DOCUMENT_HEIGHT > SCROLL.WINDOW_HEIGHT) {
      NOTIFICATION.LIST.ITEM.classList.add(NOTIFICATION.LIST.CLASS.SCROLL);
    }
  }

  function checkScrollPosition() {
    let SCROLL = {
      CURRENT: NOTIFICATION.LIST.ITEM.scrollTop,
      WINDOW_HEIGHT: NOTIFICATION.LIST.ITEM.clientHeight,
      DOCUMENT_HEIGHT: NOTIFICATION.LIST.ITEM.scrollHeight
    };

    if (SCROLL.CURRENT > 0 &&
      SCROLL.CURRENT + SCROLL.WINDOW_HEIGHT !== SCROLL.DOCUMENT_HEIGHT) {
      NOTIFICATION.LIST.ITEM.classList.add(NOTIFICATION.LIST.CLASS.SCROLLED);
      NOTIFICATION.LIST.ITEM.classList.remove(NOTIFICATION.LIST.CLASS.BOTTOM);
    } else if (SCROLL.CURRENT > 0 &&
      SCROLL.CURRENT + SCROLL.WINDOW_HEIGHT === SCROLL.DOCUMENT_HEIGHT) {
      NOTIFICATION.LIST.ITEM.classList.add(NOTIFICATION.LIST.CLASS.BOTTOM);
    } else {
      NOTIFICATION.LIST.ITEM.classList.remove(NOTIFICATION.LIST.CLASS.SCROLLED);
    }
  }

  function initNotification() {
    if (isNotificationReaded) {
      return;
    }

    if (isFullNotification) {
      WRAPPER.classList.toggle('wrapper--fade');
    }

    this.parentNode.classList.toggle(NOTIFICATION.PARENT.CLASS.CLICKED);
    TOOLBAR.classList.toggle('toolbar--active');

    isListHasScroll();

    _.each(NOTIFICATION.BTN.READ, (ELEMENT) => {
      ELEMENT.addEventListener(EVENTS.CLICK(), readNotification);
    });

    NOTIFICATION.BTN.MORE.addEventListener(EVENTS.CLICK(), showNotification);
    NOTIFICATION.BTN.READ_ALL.addEventListener(EVENTS.CLICK(), markAsReaded);
    NOTIFICATION.LIST.ITEM.addEventListener(EVENTS.SCROLL(), checkScrollPosition);
    window.addEventListener(EVENTS.CLICK(), outsideClick);
    WRAPPER.addEventListener(EVENTS.SCROLLING(), lockScroll);

    if (getDeviceType() === DEVICES.TOUCH) {
      NOTIFICATION.BTN.CLOSE.addEventListener(EVENTS.CLICK(), hideNotification);
    }
  }

  //  Init
  if (NOTIFICATION.BTN.OPEN !== null) {
    NOTIFICATION.BTN.OPEN.addEventListener(EVENTS.CLICK(), initNotification);
    window.addEventListener(EVENTS.RESIZE(), setHeight);
    setHeight(NOTIFICATION.SIZE.SMALL);
  }
}

// END: NOTIFICATIONS

//  -----------------------------------------------

//  BEGIN: LOCK SCROLL

function lockScroll(event) {
  event.preventDefault();
}

//  END: LOCK SCROLL

//  ----------------------------------------------------

//  BEGIN: TABLE

function Table() {
  //  Enums

  const TABLE = {
    PARENT: document.querySelector('.js-table'),
    CONT: document.querySelector('.js-table-container'),
    LIST: document.querySelector('.js-table-list'),
    ROW: {
      ALL: document.querySelectorAll('.js-table-row'),
      ITEM: document.querySelector('.js-table-row')
    },
    CHECKBOX: document.querySelectorAll('.js-table-row .invisible-helper'),
    BTN: {
      SELECT_ALL: document.querySelector('.js-table-select-all')
    },
    CLASS: {
      WITHOUT_NOTIFICATION: 'table--without-notification',
      IN_CORNER: 'table__container--in-corner'
    }
  };

  //  Helpers

  let isCheckedAll = false;
  let isPositionChanged = false;

  //  Functions

  function checkAll() {
    if (!isCheckedAll) {
      _.each(TABLE.CHECKBOX, ELEMENT => {
        ELEMENT.checked = true;
        TABLE.BTN.SELECT_ALL.textContent = 'Unselect All';
      });
    } else {
      _.each(TABLE.CHECKBOX, ELEMENT => {
        ELEMENT.checked = false;
        TABLE.BTN.SELECT_ALL.textContent = 'Select All';
      });
    }

    isCheckedAll = !isCheckedAll;
  }

  function scrollWatch() {
    let SCROLL = {
      CURRENT: TABLE.CONT.scrollLeft,
      WINDOW_WIDTH: getWindowSize().WIDTH,
      TABLE_WIDTH: TABLE.LIST.offsetWidth - 25
    };

    if (!isPositionChanged && SCROLL.CURRENT > 0) {
      isPositionChanged = true;
      TABLE.PARENT.classList.add(TABLE.CLASS.WITHOUT_NOTIFICATION);
    }

    if (SCROLL.CURRENT + SCROLL.WINDOW_WIDTH >= SCROLL.TABLE_WIDTH) {
      TABLE.CONT.classList.add(TABLE.CLASS.IN_CORNER);
    } else {
      TABLE.CONT.classList.remove(TABLE.CLASS.IN_CORNER);
    }
  }

  //  Inits

  if (TABLE.BTN.SELECT_ALL !== null) {
    TABLE.BTN.SELECT_ALL.addEventListener(EVENTS.CLICK(), checkAll);
  }

  if (getDeviceType() === DEVICES.TOUCH &&
    TABLE.CONT !== null) {
    TABLE.CONT.addEventListener(EVENTS.SCROLL(), scrollWatch);
  }
}

//  END: TABLE

//  -------------------------------------------

//  BEGIN: OPTIONS MENU

function optionsMenu() {
  //  Enums

  const OPTIONS = {
    CONT: {
      SINGLE: document.querySelector('.js-options'),
      CLASS: {
        ACTIVE: 'options--active'
      }
    },
    TRIGGER: {
      ALL: document.querySelectorAll('.js-options-trigger'),
      SINGLE: document.querySelector('.js-options-trigger'),
      THIS: _.noop,
      CLASS: {
        ACTIVE: 'options-trigger--active'
      }
    },
    CONTENT: {
      ALL: document.querySelectorAll('.js-options-content'),
      SINGLE: document.querySelector('.js-options-content'),
      THIS: _.noop,
      CLASS: {
        HIDDEN: 'options-content--hidden'
      }
    }
  };

  //  Functions

  function toggleOptions() {
    OPTIONS.TRIGGER.THIS = this;

    OPTIONS.TRIGGER.THIS.parentNode.classList.toggle(OPTIONS.CONT.CLASS.ACTIVE);
    OPTIONS.TRIGGER.THIS.classList.toggle(OPTIONS.TRIGGER.CLASS.ACTIVE);
    OPTIONS.TRIGGER.THIS.nextElementSibling.classList.toggle(OPTIONS.CONTENT.CLASS.HIDDEN);
  }

  function setHeight(element) {
    OPTIONS.CONTENT.THIS = element;

    OPTIONS.CONTENT.THIS.style.maxHeight = OPTIONS.CONTENT.THIS.clientHeight + 'px';
    OPTIONS.CONTENT.THIS.classList.add(OPTIONS.CONTENT.CLASS.HIDDEN);
  }

  //  Inits

  _.each(OPTIONS.TRIGGER.ALL, ELEMENT => {
    ELEMENT.addEventListener(EVENTS.CLICK(), toggleOptions);
  });

  _.each(OPTIONS.CONTENT.ALL, ELEMENT => {
    setHeight(ELEMENT);
  });
}

//  OPTIONS MENU

//  -----------------------------------

//  BEGIN UPLOAD

function Upload() {
  //  Enums
  const UPLOAD = {
    DROP: {
      ITEM: document.querySelector('.js-upload-drop'),
      CLASS: {
        DRAGGING: 'upload__tile--dragging',
        DURING: 'upload__tile--during',
        UPLOADED: 'upload__tile--uploaded',
        ACTIVE: 'upload__tile--active'
      }
    },
    CIRCLE: document.querySelector('.js-upload-circle'),
    PROGRESS: document.querySelector('.js-upload-progress'),
    REMOVE: {
      CLASS: {
        ACTIVE: 'upload__tile__remove--active'
      },
      ITEM: document.querySelector('.js-upload-remove')
    }
  };

  //  Init
  if (document.querySelectorAll('.js-upload-drop').length > 0) {
    const UPLOAD_DROPZONE = new Dropzone('.js-upload-drop', {
      url: '/file/post',
      previewTemplate: document.querySelector('.js-upload-content').innerHTML,
      acceptedFiles: 'image/*',
      init: handleUploadEvents
    });
  }

  //  Functions
  function countProgress(r, progress) {
    let c = Math.PI * (r * 2);
    let pct = ((100 - progress) / 100) * c;

    UPLOAD.CIRCLE.style.strokeDashoffset = pct;
    UPLOAD.PROGRESS.setAttribute('data-progress', progress);
  }

  function handleUploadEvents() {
    this.on('uploadprogress', progress => {
      countProgress(28, progress);
    });
    this.on('processing', () => {
      UPLOAD.DROP.ITEM.classList.add(UPLOAD.DROP.CLASS.DURING);
    });
    this.on('complete', () => {
      UPLOAD.DROP.ITEM.classList.remove(UPLOAD.DROP.CLASS.DURING);
      UPLOAD.DROP.ITEM.classList.add(UPLOAD.DROP.CLASS.UPLOADED);
      UPLOAD.REMOVE.ITEM.classList.add(UPLOAD.REMOVE.CLASS.ACTIVE);
    });
    this.on('drop', () => {
      UPLOAD_DROPZONE.removeAllFiles();
    });
    this.on('removedfile', () => {
      UPLOAD.DROP.ITEM.classList.remove(UPLOAD.DROP.CLASS.UPLOADED);
    });

    UPLOAD.REMOVE.ITEM.addEventListener(EVENTS.CLICK(), () => {
      UPLOAD_DROPZONE.removeAllFiles();
      UPLOAD.DROP.ITEM.classList.remove(UPLOAD.DROP.CLASS.UPLOADED);
      UPLOAD.REMOVE.ITEM.classList.remove(UPLOAD.REMOVE.CLASS.ACTIVE);
    });
  }
}

//  END UPLOAD

//  -------------------------------------------

//  BEGIN MODAL

function Modal() {
  //  ENUMS
  const MODAL = {
    ALL: document.querySelectorAll('.js-modal'),
    ITEM: document.querySelector('.js-modal'),
    CLASS: {
      INIT_ACTIVE: 'modal--init-active',
      ACTIVE: 'modal--active',
      HIDDEN: 'modal--hidden'
    },
    CLOSE: document.querySelectorAll('.js-modal-close'),
    INIT: document.querySelectorAll('.js-modal-init')
  };

  //  Helpers
  let modalName;
  let modalKey;

  //  Functions
  function closeModal() {
    MODAL.ALL[modalKey].classList.remove(MODAL.CLASS.ACTIVE);
    setTimeout(() => {
      MODAL.ALL[modalKey].classList.remove(MODAL.CLASS.INIT_ACTIVE);
    }, 310);
    document.body.classList.remove('overlay');

    MODAL.CLOSE[modalKey].removeEventListener(EVENTS.CLICK(), closeModal);
  }

  function outsideClick(event) {
    let modalElement = document.querySelector('.js-modal-init[data-modal-name="' + modalName + '"]');
    _.each(MODAL.ALL, (ELEMENT, KEY) => {
      if (ELEMENT.getAttribute('data-modal-name') === modalName) {
        if (!ELEMENT.contains(event.target) &&
            !modalElement.contains(event.target)) {
          if (document.querySelectorAll('.dz-hidden-input').length > 0 &&
              document.querySelector('.dz-hidden-input').contains(event.target)) {
            return;
          }
          modalKey = KEY;
          closeModal();
          window.removeEventListener(EVENTS.CLICK(), outsideClick);
        }
      }
    });
  }

  function openModal() {
    modalName = this.getAttribute('data-modal-name');
    _.each(MODAL.ALL, (ELEMENT, KEY) => {
      if (ELEMENT.getAttribute('data-modal-name') === modalName) {
        modalKey = KEY;
        ELEMENT.classList.add(MODAL.CLASS.INIT_ACTIVE);
        setTimeout(() => {
          ELEMENT.classList.add(MODAL.CLASS.ACTIVE);
        }, 10);
        MODAL.CLOSE[KEY].addEventListener(EVENTS.CLICK(), closeModal);
      }
    });
    document.body.classList.add('overlay');
    window.addEventListener(EVENTS.CLICK(), outsideClick);
  }

  //  Init
  _.each(MODAL.INIT, ELEMENT => {
    ELEMENT.addEventListener(EVENTS.CLICK(), openModal);
  });
}

//  END MODAL

//  ------------------------------------------

// INIT FUNCTIONS
window.addEventListener('load', () => {
  detectBrowser();
  Sidebar();
  Dropdown();
  Search();
  Tabs();
  Form();
  Results();
  Notifications();
  Table();
  optionsMenu();
  Upload();
  Modal();
});

