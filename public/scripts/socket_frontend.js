import  { 
    username_form, 
    username_input,
    chat_form,
    message_input
} from './app_elements.js';

import {
    hide_welcome_container,
    insert_new_online_user,
    send_message
} from './dom_manipulation.js';

let user = {};

let socket = io();

username_form.addEventListener('submit', (e) => {
e.preventDefault();
hide_welcome_container();
user.name = username_input.value;
socket.emit('new user',user);
});


chat_form.addEventListener('submit', (e) => {
e.preventDefault();
socket.emit('chat message', message_input.value);
message_input.value = '';
});


socket.on('display new user', (user) => {
    insert_new_online_user(user);
});
        
socket.on('chat message', (user) => {
    send_message(user);
});

socket.on('show all online users', () => {
    alert("welcome!");
})

message_input.addEventListener('keypress', (e) => {
    socket.emit('user is typing', user.username);
});

// socket.on('user has joined the chat', (user) => {
//    insert_new_online_user(user); 
// }); 
