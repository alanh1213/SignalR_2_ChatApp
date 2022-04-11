"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Desactiva el boton enviar hasta que la conexion este establecida
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    //Carga los mensajes recibidos de este cliente

    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} dice: ${message}`;
});

//Si la conexion esta establecida, habilita el boton enviar
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});


//Si el usuario aprieta enviar, carga los datos de los formularios y se los pasa al metodo SendMessage()
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    if ((user == "") || (message == "") ) {
        return;
    } else {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    }
    
});