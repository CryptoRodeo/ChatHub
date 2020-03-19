
let user = {};
let socket = io();

(() => {
    if(document.querySelector("#usernameForm"))
    {
        document.querySelector("#usernameForm").addEventListener('submit', (e) => {
            e.preventDefault();
            let username = document.querySelector('#username');
            user.username = username.value;
            document.querySelector("#welcome-container").style.display = "none";
            document.querySelector("#welcome-container").style.height = 0;
            document.querySelector("#welcome-container").style.width = 0;
            socket.emit('username', `${user.username}`);
            socket.emit('new user', user.username);
            document.querySelector("#online-users").insertAdjacentHTML('beforeend', username.value);
            return false;
        });
    }
})();


(()=> {
    document.querySelector("#chatform").addEventListener('submit', (e) => {
        e.preventDefault();
        let submit_button = document.querySelector("#m");
        socket.emit('chat message', submit_button.value);
        submit_button.value = '';
        return false;
    });

        socket.on('chat message', (user) => {
            console.log(user);
            console.log("message transmitted");
            let message = `<li>${user.name}: ${user.message}</li>`;
            document.querySelector("#messages").insertAdjacentHTML('beforeend', message);
        });

})();


document.querySelector("#m").addEventListener('keypress', (e) => {
    socket.emit('user is typing', user.username);
})

socket.on('user has joined the chat', (user) => {
    let user_online = `<li>${user}</li>`;
    document.querySelector("#online-users").insertAdjacentHTML('beforeend', user_online);
});

window.onbeforeunload = (e) => {
    socket.emit('user has left', user.username);
}