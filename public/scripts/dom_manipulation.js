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


let active_users = [];
export const alert_of_new_user = () => {
    let alert = '<span class="participant_alert">A new participant has joined the chat!<span>';
    message_box.insertAdjacentHTML('beforeend', alert); 
}

export const insert_new_online_user = (active_users, displayed_online) => {
    if(displayed_online)
    {
        let newest_user = retrieve_newest_user(active_users);
        let markup = `<p>${newest_user}</p>`;
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

let render_full_user_list = (active_users) => {
    active_users.forEach((user) => {
    let markup = `<p>${user}</p>`;
    users_online.insertAdjacentHTML('beforeend', markup);
    });
}

let retrieve_newest_user = (array) => { return array[array.length - 1];}