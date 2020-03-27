import  * as elements from './app_elements.js';
import  * as event from './dom_manipulation.js';

let current_user = {};
let displayed_online = false;
let user_has_id = false;

let socket = io();

elements.username_form.addEventListener('submit', (e) => {
e.preventDefault();
event.hide_welcome_container();
current_user.name = elements.username_input.value;
socket.emit('new user', current_user);
});

elements.chat_form.addEventListener('submit', (e) => {
e.preventDefault();
let message_sent = elements.message_input.value;
socket.emit('chat message', {current_user, message_sent});
elements.message_input.value = '';
});

socket.on('update user info', (updated_user) => {
    if(user_has_id) return;
    current_user = updated_user;
    user_has_id = true;
});

socket.on('display new user', (active_users) => {
    event.insert_new_online_user(active_users, displayed_online);
    displayed_online = true;
});
        
socket.on('chat message', (user) => { event.send_message(user); });

socket.on("new participant", () => { event.alert_of_new_user(); });

socket.on('remove user', (users) =>
{
    let {disconnected_user_id, user_list} = users;
    let updated_list = event.update_user_list(disconnected_user_id, user_list);
    socket.emit('update user list' ,updated_list);
});

socket.on('user is typing', (user_id) => { event.start_typing_notification(user_id); });
    
socket.on('user stopped typing', (user_id) => { event.stop_typing_notification(user_id); });

elements.message_input.addEventListener('keypress', (e) => { socket.emit('user is typing'); });
    
elements.message_input.addEventListener('keyup', (e) => {
    setTimeout(() => {
        socket.emit('user stopped typing');
    },2000);
});