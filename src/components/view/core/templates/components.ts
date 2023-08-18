abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  render() {
    return this.container;
  }

  showNotification(text: string) {
    // Создаем элемент для уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
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
