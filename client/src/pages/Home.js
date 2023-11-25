import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
const Home = () => {
    const authToken = false;
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(true);
    };
    return (
        <div className="overlay">
            <Nav
                minimal={true}
                authToken={authToken}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">Swipe Right ©</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? "Logout" : "Create Account"}
                </button>

                {showModal && (
                    <AuthModal
                        setShowModal={setShowModal}
                        isSignUp={isSignUp}
                    />
                )}
            </div>
        </div>
    );
};
export default Home;
