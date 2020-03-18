(()=> {
    const queryString = window.location.href;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    let socket = io();
    document.querySelector("#chatform").addEventListener('submit', (e) => {
        e.preventDefault();
        let submit_button = document.querySelector("#m");
        socket.emit('chat message', submit_button.value);
        submit_button.value = '';
        return false;
    });
        socket.on('chat message', (msg) => {
            let message = `<li>${username}:     ${msg}</li>`; 
            document.querySelector("#messages").insertAdjacentHTML('beforeend', message)
        });
        document.addEventListener('visibilitychange', (e) => {
            console.log("user has disconnected");
        })
})();