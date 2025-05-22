import React from "react";

const Home = () => {
    return (
        <div className="home-page">
            <h1>Budgeting app (Change this name) </h1>
            <h2>Read our user's stories!</h2>
            <div className="home-page-photo-carousel">
                <div className="group">
                    <div className="card">
                        <p>I used to be a loser, until I wasn't!</p>
                        <h3>-That guy</h3>
                    </div>
                    <div className="card">
                        <p>That guy really was a loser lol</p>
                        <h3>-Hater</h3>
                    </div>
                    <div className="card"><img src="https://static.wikia.nocookie.net/characterprofile/images/4/4e/RaidenMKXrender.png" alt="raiden"></img>Pikachue kamehameha</div>
                </div>
                <div aria-hidden="true" className="group">
                    <div className="card">
                        <p>I used to be a loser, until I wasn't!</p>
                        <h3>-That guy</h3>
                    </div>
                    <div className="card">
                        <p>That guy really was a loser lol</p>
                        <h3>-Hater</h3>
                    </div>
                    <div className="card"><img src="https://static.wikia.nocookie.net/characterprofile/images/4/4e/RaidenMKXrender.png" alt="raiden"></img>Pikachue kamehameha</div>
                </div>
            </div>
        </div>
    )
}

export default Home;