const users = []

export const addUser = (id, nickname) => {
    const user = { id, nickname }
    users.push(user)
}

export const removeUser = (id) => {
    const index = users.findIndex((user)=>user.id === id)
    
    if (index !== -1) {
        users.splice(index, 1)
    }
}

export const getOnlineUsers = ()=>{
    return users
}
