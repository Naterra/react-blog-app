import React from 'react';

class UserAvatarBlock extends React.Component {
    render(){
        const {user} =this.props;

if(!user) return false;

        return(<div className="user-avatar-block">
            <div className="user-avatar-wrapper" >
                <div className="user-avatar-img" >
                    <img className="responsive-img circle " src="../static/images/user_avatar_default.png"/>
                </div>
                <div className="user-name">{user.name || "User"}</div>
            </div>
        </div>);
    }
}
export default UserAvatarBlock;