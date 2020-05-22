/* eslint-disable */
import Vue from 'vue';

Vue.directive('enter', {
  bind(el, binding, vnode) {
    const pass = (item, direction) => {
      const distance = item.binding.value.enterHeight || Number(item.binding.arg) || 0;
      const rect = item.el.getBoundingClientRect();

      if (direction === -1) {
        return rect.top < (window.innerHeight - ((window.innerHeight / 100) * distance)) && rect.top > 0;
      }
      return (rect.top + rect.height) > ((window.innerHeight / 100) * distance) && (rect.top + rect.height) < window.innerHeight;
    };

    const listener = (item, index) => {
      let direction = (item.scroll - window.pageYOffset) / Math.abs(item.scroll - window.pageYOffset);
      direction = Number.isNaN(direction) ? -1 : direction;
      item.scroll = window.pageYOffset;

      // Did not enter yet
      if (!pass(item, direction)) return;

      // Remove listener
      if (item.binding.modifiers.once) {
        Vue.prototype.$enterItems.splice(index, 1);
      }

      // Callback
      if (typeof item.binding.value === 'object') {
        item.binding.value.callback(item.el);
        return;
      }
      item.binding.value(item.el);
    };

    // Init event listeners if not set yet
    if (!Vue.prototype.$enterItems) {
      Vue.prototype.$enterItems = [];

      document.addEventListener('scroll', () => {
        Vue.prototype.$enterItems.forEach((item, index) => {
          listener(item, index);
        });
      }, { passive: true });

      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          Vue.prototype.$enterItems.forEach((item, index) => {
            listener(item, index);
          });
        }
      }, { passive: true });
    }

    // Register element
    Vue.prototype.$enterItems.push({
      el,
      binding,
      scroll: window.pageYOffset,
    });
  },
});

Vue.directive('leave', {
  bind(el, binding) {
    const pass = (item, direction) => {
      const distance = item.binding.arg || 0;
      const rect = item.el.getBoundingClientRect();

      if (direction === -1) {
        return (rect.top + rect.height) < ((window.innerHeight / 100) * distance);
      }
      return rect.top > (window.innerHeight - ((window.innerHeight / 100) * distance));
    };

    const listener = (item, index) => {
      let direction = (item.scroll - window.pageYOffset) / Math.abs(item.scroll - window.pageYOffset);
      direction = Number.isNaN(direction) ? -1 : direction;
      item.scroll = window.pageYOffset;

      // Did not enter yet
      if (!pass(item, direction)) {
        return;
      }

      // Remove listener
      if (item.binding.modifiers.once) {
        Vue.prototype.$leaveItems.splice(index, 1);
      }

      // Callback
      item.binding.value(item.el);
    };

    // Init event listeners if not set yet
    if (!Vue.prototype.$leaveItems) {
      Vue.prototype.$leaveItems = [];

      document.addEventListener('scroll', () => {
        Vue.prototype.$leaveItems.forEach((item, index) => {
          listener(item, index);
        });
      }, { passive: true });

      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          Vue.prototype.$leaveItems.forEach((item, index) => {
            listener(item, index);
          });
        }
      }, { passive: true });
    }

    // Register element
    Vue.prototype.$leaveItems.push({
      el,
      binding,
      scroll: window.pageYOffset,
    });
  },
});
