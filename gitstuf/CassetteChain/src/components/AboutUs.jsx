import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import bgImage from '../assets/Screenshot 2025-03-28 041639.png';
import ritigya from '../assets/WhatsApp Image 2025-04-05 at 9.19.42 PM.jpeg';
import kriti from '../assets/WhatsApp Image 2025-04-05 at 9.10.34 PM.jpeg';
import manasvi from '../assets/WhatsApp Image 2025-04-05 at 9.50.08 PM.jpeg'
import heeral from '../assets/WhatsApp Image 2025-04-05 at 7.47.19 PM.jpeg'
import { Link } from "react-router-dom";
function AboutUs() {
  const members = [
    {
      name: "Heeral Mandolia",
      image: heeral,
      instagram: "https://instagram.com/heeral_mandolia",
      linkedin: "https://www.linkedin.com/in/heeral-mandolia-1a68b1209?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Ritigya Gupta",
      image: ritigya,
      instagram: "https://www.instagram.com/ritigya_g/?hl=en",
      linkedin: "https://linkedin.com/in/ritigya-gupta",
    },
    {
      name: "Manasvi Methi",
      image: manasvi,
      instagram: "https://www.instagram.com/___manasvi/profilecard/?igsh=bTR6eWtmeWZua3dz",
      linkedin: "https://www.linkedin.com/in/manasvi-methi-48b57327a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Kriti Bhambhani",
      image: kriti,
      instagram: "https://www.instagram.com/kritiiiii2310/",
      linkedin: "https://www.linkedin.com/in/kriti-bhambhani-36a940287/",
    },
  ];

  return (
    <div
      className="flex items-center justify-center min-h-screen relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen w-full">
        <h1 className="text-8xl font-bold text-center mt-[100px] mb-10">Meet Our Team</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[300px] ml-[420px] mt-[100px] max-w-6xl mx-auto">
          {members.map((member, index) => (
            <div
              key={index}
              className="border-2 border-pink-300 rounded-2xl shadow-md p-10 text-center w-[330px] h-[500px] mx-auto"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-[300px] h-[300px] mx-auto rounded-full mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <div className="flex justify-center gap-4 mt-2">
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <BsInstagram className="text-pink-600 text-2xl hover:text-pink-800" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="text-blue-600 text-2xl hover:text-blue-800" />
                </a>
              </div>
             
            </div>
          ))}
        </div>
        
        <div><Link to="/playlists"><button className="px-8 py-5 mt-20 ml-[1070px] text-white press-start bg-plum hover:bg-opacity-80 rounded-lg font-semibold">Back</button></Link></div>
      </div>
 
    </div>
  );
}

export default AboutUs;
