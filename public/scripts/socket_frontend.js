import  { 
    username_form, 
    username_input,
    chat_form,
    message_input,
} from './app_elements.js';

import {
    hide_welcome_container,
    insert_new_online_user,
    send_message
} from './event_handlers.js';

let user = {};

let socket = io();

username_form.addEventListener('submit', (e) => {
e.preventDefault();
hide_welcome_container();
socket.emit('username', `${username_input.value}`);
socket.emit('new user', username_input.value);
});

chat_form.addEventListener('submit', (e) => {
e.preventDefault();
socket.emit('chat message', message_input.value);
message_input.value = '';
});
        
socket.on('chat message', (user) => {
    send_message(user);
});

message_input.addEventListener('keypress', (e) => {
    socket.emit('user is typing', user.username);
});

socket.on('user has joined the chat', (user) => {
    insert_new_online_user(user); 
});
