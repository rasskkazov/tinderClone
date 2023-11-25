import logo from "../images/Tinder-logo-bnw.png";
import colorLogo from "../images/Tinder-logo.png";
const Navbar = ({
    minimal,
    authToken,
    setShowModal,
    showModal,
    setIsSignUp,
}) => {
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    };
    // const authToken = false;
    return (
        <nav>
            <div className="logo-container">
                <img
                    className="logo"
                    src={minimal ? logo : colorLogo}
                    alt="logo"
                />
            </div>

            {!authToken && (
                <button
                    className="nav-button"
                    onClick={handleClick}
                    disabled={showModal}
                >
                    Log in
                </button>
            )}
        </nav>
    );
};
export default Navbar;
