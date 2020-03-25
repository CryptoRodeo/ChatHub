import  {
    welcome_container,
    users_online,
    message_box
} from './app_elements.js';

export const hide_welcome_container = () => {
    set_style(welcome_container, {
        'display': 'none',
        'height': '0px',
        'width': '0px'
    });
}

export const alert_of_new_user = () => {
    let alert = '<span class="participant_alert">A new participant has joined the chat!<span>';
    message_box.insertAdjacentHTML('beforeend', alert); 
}

export const insert_new_online_user = (active_users, displayed_online) => {
    if(displayed_online)
    {
        let newest_user = retrieve_newest_user(active_users);
        let markup = `<p class="user_online" id=${newest_user.id}>${newest_user.username}</p>`;
        users_online.insertAdjacentHTML('beforeend',markup);
    }
    else
    {
        render_full_user_list(active_users);
    }
}

export const send_message = (user) => {

    let message = `
        <div class="messenger__chat-container__chat-box__message">
            <div class="messenger__chat-container__chat-box__message-info">
                <span class="messenger__chat-container__chat-box__message-username">${user.username}:<span><p class="messenger__chat-container__chat-box__message-data" >${user.message}</p>
            </div>
        </div>`;

    message_box.insertAdjacentHTML('beforeend', message);
    message_box.scrollTop += 100;
}

export const detect_user_leaving = () => {
    window.addEventListener('beforeunload', (e) => {
        console.log("A user has left the chat!");
    });
}

const set_style = (dom_element, style_property_obj) => {
    for(let property in style_property_obj)
    {
        dom_element.style[property] = style_property_obj[property]
    }
}

export const update_user_list = (removed_user_id, active_users) => {
    active_users = active_users.filter(user => user.id != removed_user_id);
    users_online.removeChild(document.getElementById(removed_user_id));
    return active_users;
}

let render_full_user_list = (active_users) => {
    active_users.forEach((user) => {
    let markup = `<p class="user_online" id=${user.id}>${user.username}</p>`;
    users_online.insertAdjacentHTML('beforeend', markup);
    });
}

let retrieve_newest_user = (array) => { return array[array.length - 1];}