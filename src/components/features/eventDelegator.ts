export class EventDelegator {
  private static globalClickListenerAdded = false;
  static delegatedListeners: { event: string; selector: HTMLElement; callback: (event?: Event) => void }[] = [];

  static addDelegatedListener(event: string, selector: HTMLElement, callback: (event?: Event) => void) {
    const delegatedListener = {
      event,
      selector,
      callback,
    };
    this.delegatedListeners.push(delegatedListener);
    this.setupGlobalClickListener();
  }

  static setupGlobalClickListener() {
    if (this.globalClickListenerAdded) {
      document.removeEventListener('click', this.handleGlobalClick);
    }

    document.addEventListener('click', this.handleGlobalClick);
    this.globalClickListenerAdded = true;
  }

  static handleGlobalClick = (event: Event) => {
    EventDelegator.delegatedListeners.forEach((listener) => {
      if (listener.event === 'click') {
        if (event.target instanceof HTMLElement && event.target.contains(listener.selector)) {
          listener.callback(event);
        }
      }
    });
  };
}
