import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { searchusers, searchUsers } from '../../../services/userService'

const OnlineUsers = ({ user, socket, handleChannelOpen }) => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    const source = Axios.CancelToken.source()

    useEffect(() => {
        async function getUsers() {
            try {
                const { data: users } = search
                ? await searchUsers(
                    {
                        username: { $regex: `${search}.*`, $options: "i"}
                    },
                    {
                        CancelToken: source.token
                    }
                )
                : await getOnlineUsers()
            setUsers(users)
            } catch (error) {
                if (Axios.isCancel(error)) console.log('Caught a Cancel')
                else throw error
            }
        }

        if (user) getUsers()

        return () => {
            console.log('Cleaning...')
            source.cancel()
            socket.off('user-connected')
        };
    }, [user, search])

    async function getOnlineUsers() {
        return await searchUsers(
            { status: { $ne: "" } },
            {
                CancelToken: source.token
            }
        )
    }

    socket.on('user-connected', async _user => {
        if (users.find(u => u.username === _user.username) !== undefined) return 

        setUsers([...users, _user])
    })

    socket.on('user-disconnected', async _user => {
        if (users.find(u => u.username === _user.username) === undefined) return

        let onlineUsers = [...users]
        onlineUsers = onlineUsers.filter(u => u.username != _user.username)

        setUsers(onlineUsers)
    })

    
}