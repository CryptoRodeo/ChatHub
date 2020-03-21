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

export const insert_new_online_user = (username) => {
    let markup = `<li>${username}</li>`;
        users_online.insertAdjacentHTML('beforeend', markup);
}

export const send_message = (user) => {
    let message = `<li>${user.name}: ${user.message}</li>`;
    message_box.insertAdjacentHTML('beforeend', message);
}

const set_style = (dom_element, style_property_obj) => {
    for(let property in style_property_obj)
    {
        dom_element.style[property] = style_property_obj[property]
    }
}