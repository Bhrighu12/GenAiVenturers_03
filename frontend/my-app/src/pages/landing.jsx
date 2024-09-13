import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import "../App.css"
const LandingPage = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: ['Sign Language', 'Speech to Text', 'WebRTC'],
            typeSpeed: 50,
        };

        // Initialize Typed.js on the ref element
        const typed = new Typed(elementRef.current, options);

        // Cleanup function to destroy Typed.js instance
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div>
            <header>
                <nav>
                    <div className="left">GenAi Venturers</div>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#video">Video Call</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="/auth">Login</a></li>
                        <li><a href="#signup">SignUp</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="home" className="firstSection">
                    <div className="leftSection">
                        <h1>Empowering Accessibility With <span>GenAi Venturers</span></h1>
                        <p>Revolutionizing Communication and Expression.</p>
                        {/* Ref for the Typed.js effect */}
                        <div ref={elementRef}></div>
                    </div>
                    <div className="rightSection">
                        <img src="../../public/png1.jpg" alt="AI Communication" />
                    </div>
                </section>

                {/* Video call section */}
                <section id="video" className="video-container">
                    <video id="localVideo" autoPlay muted></video>
                    <video id="remoteVideo" autoPlay></video>
                </section>


                <section id="contact" className="seventhSection">
                    <h1>Contact Us</h1>
                    <form action="#" method="post" className="contact-form">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </section>
            </main>

            <footer>
                <p>GenAi Venturers © 2024 | <a href="#home">Home</a> | <a href="#contact">Contact</a></p>
            </footer>
        </div>
    );
};

export default LandingPage;
