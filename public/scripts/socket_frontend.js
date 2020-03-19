let socket = io();

(() => {
    if(document.querySelector("#usernameForm"))
    {
        document.querySelector("#usernameForm").addEventListener('submit', (e) => {
            e.preventDefault();
            let username = document.querySelector('#username');
            console.log(username.value);
            document.querySelector("#welcome-container").style.display = "none";
            document.querySelector("#welcome-container").style.height = 0;
            document.querySelector("#welcome-container").style.width = 0;
            socket.emit('username', `${username.value}`);
            socket.emit('new user', username.value);
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

socket.on('user has joined the chat', (user) => {
    let user_online = `<li>${user}</li>`;
    document.querySelector("#online-users").insertAdjacentHTML('beforeend', user_online);
});