$(function(){
   	//hace la conexión de los sockets con localhost y el puerto 3000
	var socket = io.connect('http://localhost:3000')

	//botones y entradas
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emitir mensaje
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Escuchara un nuevo mensaje
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emitir a un usuario
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emitir escribiendo
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Escuchar escribiendo
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " esta escribiendo un mensaje..." + "</i></p>")
	})
});


