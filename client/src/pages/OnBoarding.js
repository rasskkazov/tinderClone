import axios from "axios";
import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { navigate, useNavigate } from "react-router-dom";
const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: "",
        gender_identity: "man",
        gender_interest: "woman",
        url: "",
        about: "",
        maches: [],
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("http://localhost:8000/user", {
                formData,
            });
            const success = response.status === 201;
            if (success) navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(formData);
    };
    return (
        <>
            <Nav
                minimal={false}
                authToken={true}
                setShowModal={() => {}}
                showModal={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />
                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />
                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>
                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man_gender_identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man_gender_identity">Man</label>

                            <input
                                id="woman_gender_identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman_gender_identity">Woman</label>

                            <input
                                id="more_gender_identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === "more"}
                            />
                            <label htmlFor="more_gender_identity">More</label>
                        </div>
                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            required={true}
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />
                        <label htmlFor="show-gender">
                            Show gender on my profile
                        </label>
                        <label>Show Me</label>
                        <div className="multiple-input-container">
                            <input
                                id="man_gender_interest"
                                type="radio"
                                name="gender_interest"
                                required={true}
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_interest === "man"}
                            />
                            <label htmlFor="man_gender_interest">Man</label>

                            <input
                                id="woman_gender_interest"
                                type="radio"
                                name="gender_interest"
                                required={true}
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_interest === "woman"}
                            />
                            <label htmlFor="woman_gender_interest">Woman</label>
                            <input
                                id="everyone_gender_interest"
                                type="radio"
                                name="gender_interest"
                                required={true}
                                value="everyone"
                                onChange={handleChange}
                                checked={
                                    formData.gender_interest === "everyone"
                                }
                            />
                            <label htmlFor="everyone_gender_interest">
                                Everyone
                            </label>
                        </div>
                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like long walks..."
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <input type="submit" />
                    </section>
                    <section>
                        <label htmlFor="about">Profile</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && (
                                <img src={formData.url} alt="profile pick" />
                            )}
                        </div>
                    </section>
                </form>
            </div>
        </>
    );
};
export default OnBoarding;
