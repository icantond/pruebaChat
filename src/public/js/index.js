const socket = io();
let user;
let chatBox = document.getElementById('chatBox');


Swal.fire(
    {
        title:"Identifícate",
        input: "text",
        text: "Ingresa un nombre de usuario para identificarte en el chat",
        inputValidator: (value) => {
            return !value && "Necesitas ingresar un nombre de usuario para poder continuar"
        },
        allowOutsideClick: false

    }
) .then(result =>{
    user = result.value;

    socket.emit('authenticate');

    socket.on('messageLogs', data =>{
        let log = document.getElementById("messageLogs");
        let messages = "";
        data.forEach(message => {
            messages = messages + `-${message.user} dice: ${message.message}</br>`
    
        });
        log.innerHTML = messages;
    })
});

chatBox.addEventListener('keyup', evt =>{
    if(evt.key==="Enter") {
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
});

socket.on('messageLogs', data =>{
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach(message => {
        messages = messages + `-${message.user} dice: ${message.message}</br>`

    });
    log.innerHTML = messages;
});

socket.on('userConnected', data =>{
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast: true,
        position: "top-right"
    })
});