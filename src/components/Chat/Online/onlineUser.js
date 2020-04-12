import React from 'react'
import ReactTooltip from 'react-tooltip'

const OnlineUser = ({ user, currUser, handleChannelOpen }) => {
    return (
        <ReactTooltip place="left" effect="solid">
            {currUser.username}
        </ReactTooltip>
    )
}

export default OnlineUser
