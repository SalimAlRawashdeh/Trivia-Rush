const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let playersData = {};
let socketIds = {}
let gems = null
let state = null

io.on('connection', function(socket){

    console.log('A user connected ' + socket.id);

    let deletePlayer = (playerId) => {
        delete playersData[playerId]
    }

    let positionPlayers = () => {
        let playerIds = Object.keys(playersData)
        for(let index = 0; index < playerIds.length; ++index) {
            playersData[playerIds[index]].x = 75 * (index + 1);
            playersData[playerIds[index]].y = 75 * (index + 1);
        }
    }

    socket.on('register', (data) => {
        playersData[data.id] = data;
        socketIds[socket.id] = data.id;
        io.to(socket.id).emit('registered', data.id);
        io.emit('update-player', playersData);

        if(2 <= Object.keys(playersData).length) {
            setTimeout(function(){
                positionPlayers();
                io.emit('update-player', playersData);
                state = 'in-game'
                io.emit('update-state', state);
            }, 2000)
        }

    })

    socket.on('update-player', (data) => {
        playersData[data.id] = data;
        io.emit('update-player', playersData);
    })

    socket.on('update-gems', (data) => {
        gems = data;
        io.emit('update-gems', gems);
    })

    socket.on('update-state', (data) => {
        state = data;
        io.emit('update-state', state);
    })

    socket.on('disconnect', function(){
        console.log("disconnecting " + socket.id);
        let dataId = socketIds[socket.id]
        deletePlayer(dataId)
        if(Object.keys(playersData).length == 0) {
            // restart the state
            playersData = {};
            socketIds = {}
            gems = null
            state = null
        } else {
            io.emit('update-player', playersData);
        }

    });

});

server.listen(3000, function () {
    console.log('Server Started!');
});