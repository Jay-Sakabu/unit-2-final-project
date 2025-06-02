const Home = () => {
    return (
        <div className="home-page">
            <h1>Budget Now!</h1>
            <h2>Hear from our users!</h2>
            <img src="src/assets/mascot-853328_1280.webp" alt="mascot" />
            <div className="home-page-photo-carousel">
                <div className="group">
                    <div className="card">
                        <p>I finally made sense of my spending!</p>
                        <h3>James P.</h3>
                    </div>
                    <div className="card">
                        <p>With this app I paid off two cards in six months.</p>
                        <h3>Malik D.</h3>
                    </div>
                    <div className="card">
                        <img src="../assets/mascot-853328_1280.webp" alt="mascot" />
                        <h3>Gopher</h3>
                    </div>
                </div>
                <div aria-hidden="true" className="group">
                    <div className="card">
                        <p>I finally made sense of my spending!</p>
                        <h3>James P.</h3>
                    </div>
                    <div className="card">
                        <p>With this app I paid off two cards in six months.</p>
                        <h3>Malik D.</h3>
                    </div>
                    <div className="card">
                        <img src="../assets/mascot-853328_1280.webp" alt="mascot" />
                        <h3>Gopher</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;