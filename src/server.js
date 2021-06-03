//import express from "express"
//import { createServer } from "http"
//import { Server } from "socket.io"
//import cors from "cors"
//import { ok } from "assert"
const express = require("express")
const http = require ("http")
const app = express()
const server = http.createServer(app)
const socket = require("socket.io")
const io = socket(server)




let user =[]
const messages = {
    general: [],
    random: [],
    jokes: [],
    javascript: []
}

io.on("connection", socket =>{
    socket.on("join server", (username)=>{
        console.log(socket.id)
        const user = {
            username,
            id: socket.id,
        }
        users.push(user);
        io.emit("noew user", users)
    })
    socket.on("join room", (roomName, cb)=>{
        socket.join(roomName);
        cb(messages[roomName])
      //  socket.emit("joined", messages[roomName])
    })
    socket.on("send message", ({content, to, sender, chatName, isChannel })=>{
        if (isChannel){
            const payload = {
                content,
                chatName,
                sender,
            }
            socket.to(to).emit("new message", payload)
        }
        else{
            const payload = {
                content,
                chatName: username,
                sender,
            }
            socket.to(to).emit("new message", payload)
        }
        if(messages[chatName]) {
            messages[chatName].push({
                sender,
                content,
            })
        }
    })
    socket.on("disconnect", ()=>{
        user =user.filter(u => u.id!== socket.id)
        io.emit("new user", user)
    })
    
})




 const PORT = process.env.PORT


server.listen(PORT, ()=> console.log("server is runing on", PORT))