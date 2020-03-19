let socket = io();

(() => {
    if(document.querySelector("#usernameForm"))
    {
        document.querySelector("#usernameForm").addEventListener('submit', (e) => {
            e.preventDefault();
            let username = document.querySelector('#username');
            socket.emit('username', `${username.value}`);
            console.log(username.value);
            document.querySelector("#welcome-container").style.display = "none";
            document.querySelector("#welcome-container").style.height = 0;
            document.querySelector("#welcome-container").style.width = 0;
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