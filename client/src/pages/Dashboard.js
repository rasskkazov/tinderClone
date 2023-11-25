import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const userId = cookies.UserId;
    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user", {
                params: { userId },
            });

            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/gendered-users",
                {
                    params: { gender: user?.gender_interest },
                }
            );
            setGenderedUsers(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getUser();
        getGenderedUsers();
    }, []);
    console.log(user);
    console.log(genderedUsers);

    const characters = [
        {
            name: "Richard Hendricks",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
        },
        {
            name: "Erlich Bachman",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
        },
        {
            name: "Monica Hall",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
        },
        {
            name: "Jared Dunn",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
        },
        {
            name: "Dinesh Chugtai",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
        },
    ];
    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <>
            {user && (
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {characters.map((character) => (
                                <TinderCard
                                    className="swipe"
                                    key={character.name}
                                    onSwipe={(dir) =>
                                        swiped(dir, character.name)
                                    }
                                    onCardLeftScreen={() =>
                                        outOfFrame(character.name)
                                    }
                                >
                                    <div
                                        style={{
                                            backgroundImage:
                                                "url(" + character.url + ")",
                                        }}
                                        className="card"
                                    >
                                        <h3>{character.name}</h3>
                                    </div>
                                </TinderCard>
                            ))}
                            <div className="swipe-info">
                                {lastDirection ? (
                                    <p>You swiped {lastDirection}</p>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Dashboard;
