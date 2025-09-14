console.log('Форма обратной связи загружена');
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal(); // модальный режим + затемнение

    dlg.querySelector('input,select,textarea,button')?.focus();
});

closeBtn.addEventListener('click', () => dlg.close('cancel'));
dlg.addEventListener('close', () => {
    lastActive?.focus();
});
// Esc по умолчанию вызывает событие 'cancel' и закрывает <dialog>

form?.addEventListener('submit', (e) => {
        // 1) Сброс кастомных сообщений
        [...form.elements].forEach(
            el => el.setCustomValidity?.('')
        );
        // 2) Проверка встроенных ограничений
        if (!form.checkValidity()) {
            e.preventDefault();
            // Пример: таргетированное сообщение
            const email = form.elements.email;
            if (
                email?.validity.typeMismatch
            ) {
                email.setCustomValidity('Введите корректный e-mail, напримерname@example.com');
            }
            form.reportValidity(); // показать браузерные подсказки
            // A11y: подсветка проблемных полей
            [...form.elements].forEach(el => {
                if (el.willValidate) 
                    el.toggleAttribute('aria-invalid', !el.checkValidity());
                }
            );
            return;
        }
        // 3) Успешная «отправка» (без сервера)
        e.preventDefault();
        // Если форма внутри <dialog>, закрываем окно:
        document
                .getElementById('contactDialog')?.close('success');
        form.reset();
    });
const KEY = 'theme';
const btn = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Автовыбор: системная тема или сохранённый выбор пользователя
if (localStorage.getItem(KEY) === 'dark' || (!localStorage.getItem(KEY) && prefersDark)) {
    document.body.classList.add('theme-dark');
    btn?.setAttribute('aria-pressed', 'true');
}

// Переключение по кнопке с сохранением в localStorage
btn?.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('theme-dark');
        btn.setAttribute('aria-pressed', String(isDark));
        localStorage.setItem(KEY,isDark ? 'dark' : 'light');
    });