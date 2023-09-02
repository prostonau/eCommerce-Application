export class EventDelegator {
  private static globalListenerAdded = false;
  static delegatedListeners: { event: string; selector: HTMLElement; callback: (event?: Event) => void }[] = [];

  static addDelegatedListener(event: string, selector: HTMLElement, callback: (event?: Event) => void) {
    const existingListener = this.delegatedListeners.find(
      (listener) => listener.event === event && listener.selector === selector && listener.callback === callback
    );

    if (!existingListener) {
      const delegatedListener = {
        event,
        selector,
        callback,
      };
      this.delegatedListeners.push(delegatedListener);
      this.setupGlobalClickListener();
    }
  }

  static setupGlobalClickListener() {
    if (this.globalListenerAdded) {
      document.removeEventListener('click', this.handleGlobalClick);
      document.removeEventListener('change', this.handleGlobalChange);
    }

    document.addEventListener('click', this.handleGlobalClick);
    document.addEventListener('change', this.handleGlobalChange);
    this.globalListenerAdded = true;
  }

  static handleGlobalClick = (event: Event) => {
    EventDelegator.delegatedListeners.forEach((listener) => {
      if (listener.event === 'click') {
        if (event.target instanceof HTMLElement && event.target === listener.selector) {
          listener.callback(event);
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
}
