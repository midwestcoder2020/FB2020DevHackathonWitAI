import React from 'react'

function Chat({msg}) {
    return (
        <div className="chat">
            <div className="userPhoto">
            </div>
            <p className="chat-message">{msg}</p>
        </div>
    )
}

export default Chat
