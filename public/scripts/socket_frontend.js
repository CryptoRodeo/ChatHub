import  { 
    username_form, 
    username_input,
    chat_form,
    message_input
} from './app_elements.js';

import {
    hide_welcome_container,
    insert_new_online_user,
    send_message,
    alert_of_new_user
} from './dom_manipulation.js';

let current_user = {};

let socket = io();

username_form.addEventListener('submit', (e) => {
e.preventDefault();
hide_welcome_container();
let username = username_input.value;
socket.emit('new user', username);
});


chat_form.addEventListener('submit', (e) => {
e.preventDefault();
let message = message_input.value;
socket.emit('chat message', {current_user, message});
message_input.value = '';
});


socket.on('display new user', (username) => {
    insert_new_online_user(username);
});
        
socket.on('chat message', (user) => {
    send_message(user);
});


socket.on("new participant", () => {
    alert_of_new_user();
});

socket.on('show all online users', () => {
    alert("welcome!");
})

message_input.addEventListener('keypress', (e) => {
    socket.emit('user is typing', current_user.username);
});

// socket.on('user has joined the chat', (user) => {
//    insert_new_online_user(user); 
// }); 
