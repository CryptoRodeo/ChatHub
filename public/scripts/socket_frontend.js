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
    update_user_list,
    stop_typing_notification,
    start_typing_notification
} from './dom_manipulation.js';

let current_user = {};

let displayed_online = false;
let has_id = false;

let socket = io();

username_form.addEventListener('submit', (e) => {
e.preventDefault();
hide_welcome_container();
current_user.name = username_input.value;
socket.emit('new user', current_user);
});

chat_form.addEventListener('submit', (e) => {
e.preventDefault();
let message = message_input.value;
socket.emit('chat message', {current_user, message});
message_input.value = '';
});


socket.on('update user info', (user_info) => {
    if(has_id) return;
    current_user = user_info;
    has_id = true;
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

socket.on('remove user', (users) =>
{
    let {disconnected_user_id, active_users} = users;
    let updated_list = update_user_list(disconnected_user_id, active_users);
    socket.emit('update user list' ,updated_list);
});

socket.on('user is typing', (user_id) => {
    start_typing_notification(user_id);
});

socket.on('user stopped typing', (user_id) => {
   stop_typing_notification(user_id);
});

  window.addEventListener('beforeunload',(e) => {
        socket.emit('user has left');
  });

message_input.addEventListener('keypress', (e) => {
    socket.emit('user is typing');
});

message_input.addEventListener('keyup', (e) => {
    socket.emit('user stopped typing');
})