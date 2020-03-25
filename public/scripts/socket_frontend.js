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
    alert_of_new_user,
    detect_user_leaving
} from './dom_manipulation.js';

let current_user = {};

let displayed_online = false;

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

socket.on('display new user', (active_users) => {
    insert_new_online_user(active_users, displayed_online);
    displayed_online = true;
});
        
socket.on('chat message', (user) => {
    send_message(user);
});

socket.on("new participant", () => {
    alert_of_new_user();
});

message_input.addEventListener('keypress', (e) => {
    socket.emit('user is typing', current_user.username);
});