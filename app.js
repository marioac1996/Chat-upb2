const express = require('express')
const app = express()


// Establecemos una plantalla del framework EJS(EMBEDDED JAVASCRIPT TEMPLATES)
//esta funcion nos permitira procesar la pagina
app.set('view engine', 'ejs')

//middlewares hare un pequeño bloque de los request que hara el usuario
app.use(express.static('public'))


//obtendremos las rutas
app.get('/', (req, res) => {
	res.render('index')
})
app.get('/chat', (req, res) => {
    res.render('chat')
})
    
//Utilizaremos el listen para llamar al puerto 3000, para poner iniciar nuestro proyecto
server = app.listen(3000)



//En este apartado del codigo instanciamos los socket.io, ya que los requerimos en el tiempo real
const io = require("socket.io")(server)


//Aqui haremos un llamado a la conexión para verificar que todo funcione bien
io.on('connection', (socket) => {
	console.log('Nuevo usuario conectado')

	//Aqui pondremos un nombre prederminado, por si algun usuario, se le olvida poner
	socket.username = "upb-user"

    //En este apartado de sockets se escuchara el llamado, del cambio de nombre de usuarios
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //Llamara el un nuevo mensaje
    socket.on('new_message', (data) => {
        //transmitira el nuevo mensaje
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //Se escribira el nuevo mensaje
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
