(()=> {
    let socket = io();
    document.querySelector("form").addEventListener('submit', (e) => {
        e.preventDefault();
        let submit_button = document.querySelector("#m");
        socket.emit('chat message', submit_button.value);
        submit_button.value = '';
        return false;
    });
        socket.on('chat message', (msg) => {
            let message = `<li>${msg}</li>`; 
            document.querySelector("#messages").insertAdjacentHTML('beforeend', message)
        });
        document.addEventListener('visibilitychange', (e) => {
            console.log("user has disconnected");
        })
})();