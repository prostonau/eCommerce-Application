abstract class Component {
  protected container: HTMLElement;
  protected innerText: string;

  constructor(tagName: string, className: string, innerText = '') {
    this.container = document.createElement(tagName);
    this.container.className = className;
    this.innerText = innerText;
  }

  render() {
    return this.container;
  }

  showNotification(text: string, top: boolean = false) {
    // Создаем элемент для уведомления
    const notification = document.createElement('div');
    if (top) {
      notification.className = 'notificationTop';
    } else {
      notification.className = 'notification';
    }
    notification.textContent = text;

    // Добавляем уведомление внизу экрана
    document.body.appendChild(notification);

    // Устанавливаем таймер на скрытие уведомления через 5 секунд
    setTimeout(function () {
      notification.style.display = 'none';
    }, 5000);
  }
}

export default Component;
