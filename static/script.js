document.addEventListener('DOMContentLoaded', function() {
    // Обработчик отправки формы
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Останавливаем отправку формы и перезагрузку страницы

        // Получаем данные формы
        let formData = new FormData(this);

        // Отправка данных на сервер
        fetch('/submit-email', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            let messageBox = document.getElementById('thank-you-message');
            let messageText = document.getElementById('thank-you-text');

            // Проверка статуса ответа
            if (data.status === 'success') {
                // Динамически изменяем текст сообщения
                messageText.textContent = 'Спасибо за отправку! Мы свяжемся с тобой по почте ${id}';
            } else {
                messageText.textContent = 'Ошибка при отправке данных';
            }

            // Показываем сообщение
            messageBox.style.display = 'block'; // Показываем сообщение

            // Убираем сообщение через 10 секунд
            setTimeout(() => {
                messageBox.style.display = 'none'; // Скрываем сообщение
            }, 10000); // Через 10 секунд скрыть сообщение
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
