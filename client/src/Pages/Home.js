import '../Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to Workout Tracker</h1>
                <p>Manage your workouts effectively and stay on top of your fitness goals.</p>
                <div className="cta-buttons">
                    <a href="/register" className="cta-button register">Register Now</a>
                    <a href="/login" className="cta-button login">Login</a>
                </div>
            </div>

            <div className="features-section">
                <h2>Features</h2>
                <ul className="features-list">
                    <li>Create and track your daily workouts</li>
                    <li>Update exercises on-the-go</li>
                    <li>Review your progress with a detailed history</li>
                    <li>Delete workouts as needed</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
