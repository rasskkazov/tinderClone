import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const ChatHeader = ({ user }) => {
    let navigate = useNavigate();
    console.log(user);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const logout = () => {
        removeCookie("AuthToken", cookies.AuthToken);
        removeCookie("UserId", cookies.UserId);
        // window.location.reload();
        navigate("/");
    };
    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo os user"} />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>
                ←
            </i>
        </div>
    );
};
export default ChatHeader;
