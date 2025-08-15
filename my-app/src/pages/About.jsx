import React from "react";
import './About.css';


function About() {
    return(
        <div className="container">
        <header className="About-header">
            <h1>GREVIA GOLD BUILDERS</h1>
        </header>

        <section className="testimonial">
            <div className="image"></div>
            <div className="text">
                <div className="name">AG Shaun</div>
                <p>To connect people and businesses with sustainable construction solutions through a trusted online marketplace—empowering communities to build safer, greener, and more resilient spaces while fostering innovation and reducing environmental harm.</p>
            </div>
        </section>

        <section className="testimonial">
            <div className="text">
                <div className="name">AG Shaun</div>
                <p>To connect people and businesses with sustainable construction solutions through a trusted online marketplace—empowering communities to build safer, greener, and more resilient spaces while fostering innovation and reducing environmental harm.</p>
            </div>
            <div className="image"></div>
        </section>


        <section className="about">
            <h2>ABOUT US</h2>
            <p>We are a dedicated platform committed to transforming the way construction materials are sourced and supplied. By connecting verified eco-friendly suppliers with builders, companies, and individuals, we make sustainable choices more accessible and practical. Our goal is to support the creation of safe, resilient, and environmentally conscious spaces—empowering communities to grow responsibly while preserving resources for the future.</p>
        </section>

        <section className="mission-vision">
            <div className="box">
                <h2>MISSION</h2>
                <p>Thriving cities and communities where every building project uses eco-conscious materials, suppliers flourish in a fair and connected market, and development supports both people and the planet for generations to come.</p>
            </div>
            <div className="box">
                <h2>VISION</h2>
                <p>To connect people and businesses with sustainable construction solutions through a trusted online marketplace—empowering communities to build safer, greener, and more resilient spaces while fostering innovation and reducing environmental harm.</p>
            </div>
        </section>

        <section className="team">
            <h2>MEET THE TEAM</h2>
            <div className="team-members">
                <div className="member">
                    <div className="photo"></div>
                    <p>AG Shaun</p>
                </div>
                <div className="member">
                    <div className="photo"></div>
                    <p>Kenneth</p>
                </div>
                <div className="member">
                    <div className="photo"></div>
                    <p>Patrick</p>
                </div>
                <div className="member">
                    <div className="photo"></div>
                    <p>Czarina Lily</p>
                </div>
            </div>
        </section>
    </div>
    )
}

export default About;