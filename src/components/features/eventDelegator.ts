export class EventDelegator {
  private static globalListenerAdded = false;
  static delegatedListeners: {
    event: string;
    selector: HTMLElement;
    callback: (event?: Event) => void;
    include: boolean;
  }[] = [];

  static addDelegatedListener(
    event: string,
    selector: HTMLElement,
    callback: (event?: Event) => void,
    include = false
  ) {
    const existingListener = this.delegatedListeners.find(
      (listener) => listener.event === event && listener.selector === selector && listener.callback === callback
    );

    if (!existingListener) {
      const delegatedListener = {
        event,
        selector,
        callback,
        include,
      };
      this.delegatedListeners.push(delegatedListener);
      this.setupGlobalClickListener();
    }
  }

  static setupGlobalClickListener() {
    if (this.globalListenerAdded) {
      document.removeEventListener('click', this.handleGlobalClick);
      document.removeEventListener('change', this.handleGlobalChange);
      document.removeEventListener('input', this.handleGlobalInput);
    }

    document.addEventListener('click', this.handleGlobalClick);
    document.addEventListener('change', this.handleGlobalChange);
    document.addEventListener('input', this.handleGlobalInput);
    this.globalListenerAdded = true;
  }

  static handleGlobalClick = (event: Event) => {
    EventDelegator.delegatedListeners.forEach((listener) => {
      if (listener.event === 'click') {
        if (!listener.include) {
          if (event.target instanceof HTMLElement && event.target === listener.selector) {
            listener.callback(event);
          }
        } else {
          if (event.target instanceof HTMLElement && listener.selector.contains(event.target)) {
            console.log('yes');
            listener.callback(event);
          }
        }
      }
    });
  };

  static handleGlobalChange = (event: Event) => {
    EventDelegator.delegatedListeners.forEach((listener) => {
      if (listener.event === 'change') {
        if (event.target instanceof HTMLElement && event.target === listener.selector) {
          listener.callback(event);
        }
      }
    });
  };

  static handleGlobalInput = (event: Event) => {
    EventDelegator.delegatedListeners.forEach((listener) => {
      if (listener.event === 'input') {
        if (event.target instanceof HTMLElement && event.target === listener.selector) {
          listener.callback(event);
        }
      }
    });
  };
}
