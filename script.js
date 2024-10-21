const chatMessagesElement = document.getElementById('chatMessages');

const TWITCH_CHANNEL = 'ripper_cmertanoc';
const OAUTH_TOKEN = 'wtqar5p5yx9uwavudwm75n8w9negpy';

const chatSocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

chatSocket.addEventListener('open', () => {
    chatSocket.send(`CAP REQ :twitch.tv/membership`);
    chatSocket.send(`PASS ${OAUTH_TOKEN}`);
    chatSocket.send(`NICK justinfan12345`);
    chatSocket.send(`JOIN #${TWITCH_CHANNEL}`);
});

chatSocket.addEventListener('message', (event) => {
    const message = event.data;

    if (message.includes('PRIVMSG')) {
        const parts = message.split(':');
        const chatMessage = parts[parts.length - 1].trim();
        const username = parts[1].split('!')[0];

        displayMessage(username, chatMessage);
    }
});

function displayMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="username">${username}:</span> ${message}`;
    chatMessagesElement.appendChild(messageElement);
    chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight; // Прокрутка вниз
}

chatSocket.addEventListener('error', (error) => {
    console.error('Ошибка WebSocket:', error);
});

chatSocket.addEventListener('close', () => {
    console.log('Отключено от чата Twitch');
});
