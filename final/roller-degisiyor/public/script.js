document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageForm = document.getElementById('message-form');
    const loginSection = document.getElementById('login-section');
    const messageSection = document.getElementById('message-section');
    const messagesList = document.getElementById('messages-list');
    const loginError = document.getElementById('login-error');
    const loginBtn = document.getElementById('login-btn');
    const messageBtn = document.getElementById('message-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Sayfa gösterme fonksiyonu
    function showSection(section) {
        loginSection.style.display = section === 'login' ? 'block' : 'none';
        messageSection.style.display = section === 'messages' ? 'block' : 'none';
    }

    // Login işlemi
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password }),
        });

        const result = await response.json();
        if (result.ok) {
            loginBtn.style.display = 'none';
            messageBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            showSection('messages');
            fetchMessages();
        } else {
            loginError.textContent = result.error;
        }
    });

    // Mesaj gönderme işlemi
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageText = document.getElementById('message-text').value;

        const response = await fetch('/message', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: { text: messageText } }),
        });

        const result = await response.json();
        if (result.ok) {
            fetchMessages();
            document.getElementById('message-text').value = '';
        } else {
            showSection('login'); // Yetkisiz erişim durumunda giriş sayfasına yönlendir.
        }
    });

    // Mesajları getir ve listele
    async function fetchMessages() {
        const response = await fetch('/');
        if (response.status === 403) {
            showSection('login'); // Yetkisiz erişim durumunda giriş sayfasına yönlendir.
            return;
        }

        const messages = await response.json();
        messagesList.innerHTML = '';
        messages.forEach((msg) => {
            const li = document.createElement('li');
            li.textContent = `${msg.userName}: ${msg.text}`;
            messagesList.appendChild(li);
        });
    }

    // Logout işlemi
    logoutBtn.addEventListener('click', async () => {
        await fetch('/logout', { method: 'POST' });
        loginBtn.style.display = 'inline-block';
        messageBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        showSection('login');
    });

    // Sayfa geçişleri
    loginBtn.addEventListener('click', () => showSection('login'));
    messageBtn.addEventListener('click', () => showSection('messages'));
});