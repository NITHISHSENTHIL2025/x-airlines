import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./about.css"
function About() {
    return (
        <div className="about">
            <div className="about-head">
            <h1 className="about-title">About X Airlines</h1>
            </div>
            <div className="about-content">
            <p>
                X Airlines is a leading airline company committed to providing exceptional travel experiences to our customers. With a fleet of modern aircraft and a dedicated team of professionals, we strive to make every journey comfortable, safe, and enjoyable.    Our mission is to connect people and cultures around the world while delivering outstanding service and value. We offer a wide range of destinations, competitive fares, and a seamless booking process to ensure that our passengers have a memorable travel experience. Whether you're traveling for business or leisure, X Airlines is your trusted partner in the skies.
            </p>
            </div>
        </div>
    );
}
export default About;