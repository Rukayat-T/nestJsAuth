import React from 'react'

function UserComponent({ user }) {

    return (
        <div>user {user.id} is {user.name} and they are {user.age} years old</div>
    )
}

export default UserComponent