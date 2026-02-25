"use client";
import React from 'react';
import { Linkedin, Github, Mail, Globe } from 'lucide-react';

const TeamPage = () => {
  const leadership = [
    {
      name: "Rohil M Roshan",
      role: "Founder & CEO",
      bio: "Rohil leads the strategic vision at Arkynix. With over 1 years in systems architecture, he focuses on building scalable digital infrastructure for global enterprises.",
      image: "/images/rohil.png",
    },
    {
      name: "Adarsh Tiwari",
      role: "Co-Founder & CTO",
      bio: "Adarsh oversees daily operations and growth. He specialized in scaling technical teams and streamlining internal workflows to ensure peak efficiency.",
      image: "/images/best-profile.jpg",
      linkedin:"https://www.linkedin.com/in/adarshtiwaridev",
      email: "adarshtiwaridev01@gmail.com",
    },
    {
      name: "Prashant Shukla",
      role: "Software developer",
      bio: "Aris directs our research and development. He is a specialist in cloud security and distributed databases, ensuring our stack remains world-class.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop"
    }
  ];

  const staff = [
    { name: "Julian Rossi", role: "Principal Engineer", dept: "Engineering" },
    { name: "Sarah Jenkins", role: "Frontend Architect", dept: "Product" },
    { name: "Kevin Zhang", role: "DevOps Lead", dept: "Infrastructure" },
    { name: "Amara Okafor", role: "Security Engineer", dept: "Security" },
    { name: "Leo Dubois", role: "Product Designer", dept: "Design" },
    { name: "Maya Patel", role: "QA Engineer", dept: "Engineering" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      
      {/* SECTION: HEADER */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-16 border-b border-border">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Team</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">
          Meet the experts behind Arkynix. We are a specialized team of engineers and designers 
          dedicated to building reliable digital solutions.
        </p>
      </header>

      {/* SECTION: LEADERSHIP */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">Leadership</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {leadership.map((member) => (
              <div key={member.name} className="flex flex-col">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-square object-cover rounded-lg mb-6 bg-card border border-border" 
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                <div className="flex gap-4 mt-auto">
                  <a href={member.linkedin} className="text-foreground/40 hover:text-accent transition-colors"><Linkedin size={18} /></a>
                  <a href={`mailto:${member.email}`} className="text-foreground/40 hover:text-accent transition-colors"><Mail size={18} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-20 border-border" />

    
      </main>

      
    </div>
  );
};

export default TeamPage;