import React from "react";
import './About.css';


function About() {
    return(
        <div className="container">
        <header className="About-header">
            <h1>GREVIA GOLD BUILDERS</h1>
        </header>

        <section className="testimonial">
            <div className="image"><img src="./src/assets/image1.png"/></div>
            <div className="text">
                <div className="name">AG Shaun</div>
                <p>A passionate advocate for sustainable housing, recently utilized the centralized platform to source eco-friendly materials for her new residence in Cebu City. By connecting with a curated network of suppliers, she not only found the perfect materials to match her vision but also secured them at a competitive price. Now, with her home complete, Shaun's successful experience stands as a testament to how Grevia simplifies the path to building a beautiful and environmentally conscious home.</p>
            </div>
        </section>

        <section className="testimonial">
            <div className="text">
                <div className="name">Patrick Molina</div>
                <p>In a significant step for eco-conscious development, engineer and long-time sustainability advocate Patrick Molina is leveraging the Grevia platform for his new Real Estate business venture. Known for his commitment to environmentally responsible practices, Molina discovered Grevia's centralized platform and quickly partnered with us to source all the sustainable materials needed for his upcoming project. With a targeted completion date within 5 years, this collaboration highlights how Grevia is streamlining the process for professionals to build greener, more resilient commercial spaces efficiently.</p>
            </div>
            <div className="image"><img src="./src/assets/image2.jpg"/></div>
        </section>


        <section className="about">
            <h1>ABOUT US</h1>
            <p>We are a dedicated platform committed to transforming the way construction materials are sourced and supplied. By connecting verified eco-friendly suppliers with builders, companies, and individuals, we make sustainable choices more accessible and practical. Our goal is to support the creation of safe, resilient, and environmentally conscious spaces—empowering communities to grow responsibly while preserving resources for the future.</p>
        </section>

        <section className="mission-vision">
            <div className="box">
                <h1>MISSION</h1>
                <p>Thriving cities and communities where every building project uses eco-conscious materials, suppliers flourish in a fair and connected market, and development supports both people and the planet for generations to come.</p>
            </div>
            <div className="box">
                <h1>VISION</h1>
                <p>To connect people and businesses with sustainable construction solutions through a trusted online marketplace—empowering communities to build safer, greener, and more resilient spaces while fostering innovation and reducing environmental harm.</p>
            </div>
        </section>

        <section className="team">
            <h1>MEET THE TEAM</h1>
            <div className="team-members">
                <div className="member">
                    <div className="photo"><img src="../src/assets/AG.jpg"/></div>
                    <p>AG Shaun</p>
                </div>
                <div className="member">
                    <div className="photo"><img src="../src/assets/Kenneth.jpg"/></div>
                    <p>Kenneth</p>
                </div>
                <div className="member">
                    <div className="photo"><img src="../src/assets/Patrick.jpg"/></div>
                    <p>Patrick</p>
                </div>
                <div className="member">
                    <div className="photo"><img src="../src/assets/Lily.jpg"/></div>
                    <p>Czarina Lily</p>
                </div>
            </div>
        </section>
    </div>
    )
}

export default About;