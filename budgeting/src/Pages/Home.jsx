import React from "react";

const Home = () => {
    return (
        <div className="home-page">
            <h1>Budgeting app (Change this name) </h1>
            <h2>An introduction</h2>
            <div className="home-page-photo-carousel">
                <div className="group">
                    <div className="card">A</div>
                    <div className="card">B</div>
                    <div className="card">C</div>
                </div>
                <div aria-hidden="true" className="group">  {/*TODO: aria-hidden not functioning properly */}
                    <div className="card">A</div>
                    <div className="card">B</div>
                    <div className="card">C</div>
                </div>
            </div>
        </div>
    )
}

export default Home;