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
    update_user_list
} from './dom_manipulation.js';

let current_user = {};

let displayed_online = false;
let has_id = false;

let socket = io();

username_form.addEventListener('submit', (e) => {
e.preventDefault();
hide_welcome_container();
current_user.username = username_input.value;
console.log(current_user.username);
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
})

  window.addEventListener('beforeunload',(e) => {
      if(current_user.id)
      {
        socket.emit('user has left', current_user);
      }
  });


message_input.addEventListener('keypress', (e) => {
    socket.emit('user is typing', current_user.username);
});