import  elements  from './app_elements.js';

const {
        username_form, 
        username_input,
        welcome_container,
        users_online,
        chat_form,
        message_input,
        message_box
    } = elements;
let socket = io();


(() => {
    if(document.querySelector("#usernameForm"))
    {
            username_form.addEventListener('submit', (e) => {
            e.preventDefault();
            let username = username_input.value;
            console.log(username_input.value);
            welcome_container.style.display = "none";
            welcome_container.style.height = 0;
            welcome_container.style.width = 0;
            socket.emit('username', `${username_input.value}`);
            socket.emit('new user', username_input.value);
            users_online.insertAdjacentHTML('beforeend', username_input.value);
            return false;
        });
    }
})();


(()=> {
        chat_form.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('chat message', message_input.value);
        message_input.value = '';
        return false;
    });

        socket.on('chat message', (user) => {
            let message = `<li>${user.name}: ${user.message}</li>`;
            message_box.insertAdjacentHTML('beforeend', message);
        });

})();


document.querySelector("#m").addEventListener('keypress', (e) => {
    socket.emit('user is typing', user.username);
})

socket.on('user has joined the chat', (user) => {
    let user_online = `<li>${user}</li>`;
    online_users.insertAdjacentHTML('beforeend', user_online);
});
