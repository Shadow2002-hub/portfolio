import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Menu, X, Award, Briefcase, GraduationCap, Download, Sun, Moon, TrendingUp, Target } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projectFilter, setProjectFilter] = useState('All');
  const [stats, setStats] = useState({ projects: 0, problems: 0, rank: 0, efficiency: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const statsRef = useRef(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // New: skills intersection animation
  const skillsRef = useRef(null);
  const [skillsInView, setSkillsInView] = useState(false);

  const fullText = "Full Stack Developer & Software Engineer";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedStats) {
            setHasAnimatedStats(true);
            animateValue('projects', 0, 3, 2000);
            animateValue('problems', 0, 200, 2000);
            animateValue('rank', 0, 16, 2000);
            animateValue('efficiency', 0, 20, 2000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimatedStats]);

  // New: observe skills section and animate bars once
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const animateValue = (key, start, end, duration) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      setStats(prev => ({ ...prev, [key]: value }));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! Thank you for reaching out.');
    setFormData({ name: '', email: '', message: '' });
  };

  const allProjects = [
    {
      title: "ZoneOut - Turf Booking Platform",
      Description:"A scalable full-stack turf booking system with real-time slot verification, Razorpay payment integration, and role-based access control for customers, providers, and admins. The system enables seamless turf discovery, slot booking, and secure online payments with instant confirmation. It features provider dashboards for turf and slot management, customer review and rating modules, and an admin panel for monitoring users, bookings, and payments. Built with Spring Boot, React, and RESTful APIs, the application ensures high performance, scalability, and data consistency across services.",
      tech: ["React", "Spring Boot","MVC", "Lombok", "JWT-based authentication and authorization","Spring Security", "MySQL", "ASP.NET", "Razorpay", "Tailwind CSS"],
      gradient: "from-purple-500 to-pink-500",
      link: "https://github.com/D1-zoneout",
      period: "July 2025 - Aug 2025",
      category: "Full-Stack"
    },
    {
      title: "Vehicle Theft Detection System",
      Description: "IoT-based theft detection system with SMS alerts and remote ignition control using GSM module and microcontroller with embedded logic in MATLAB.",
      tech: ["GSM", "Microcontroller", "MATLAB", "Embedded Systems"],
      gradient: "from-blue-500 to-cyan-500",
      link: "#",
      period: "Oct 2023 - Apr 2024",
      category: "IoT"
    },
    {
      title: "Metrology Tool Automation GUI",
      description: "Automated data entry system for semiconductor metrology tools at SCL Mohali, improving efficiency by 20% using PyQt5 and QT Designer.",
      tech: ["Python", "PyQt5", "QT Designer", "GUI Development"],
      gradient: "from-orange-500 to-red-500",
      link: "#",
      period: "May 2023 - June 2023",
      category: "Backend"
    }
  ];

  const filteredProjects = projectFilter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === projectFilter);

  const skills = [
    { 
      name: "Frontend", 
      items: [
        { name: "React", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 75 }
      ], 
      icon: <Palette /> 
    },
    { 
      name: "Backend", 
      items: [
        { name: "Spring Boot", level: 85 },
        { name: "ASP.NET", level: 80 },
        { name: "REST APIs", level: 85 },
        { name: "Node.js", level: 70 },
        { name: "MVC", level: 80 }
      ], 
      icon: <Code /> 
    },
    { 
      name: "Languages", 
      items: [
        { name: "Java", level: 90 },
        { name: "C++", level: 85 },
        { name: "C", level: 70 },
        { name: "C#", level: 80 },
        { name: "Python", level: 60 }
      ], 
      icon: <Code /> 
    },
    { 
      name: "Databases", 
      items: [
        { name: "MySQL", level: 95 },
        { name: "MongoDB", level: 70 },
        { name: "RDBMS", level: 80 }
      ], 
      icon: <Code /> 
    },
    { 
      name: "DevOps & Cloud", 
      items: [
        { name: "Docker", level: 50 },
        { name: "Kubernetes", level: 50 },
        { name: "AWS (EC2, S3)", level: 50 },
        { name: "Linux", level: 50 }
      ], 
      icon: <Zap /> 
    },
    { 
      name: "Tools", 
      items: [
        { name: "Git/GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Visual Studio", level: 85 },
        { name: "STS", level: 85 }
      ], 
      icon: <Zap /> 
    }
  ];

  const achievements = [
    {
      title: "AIR 16 in PreCAT Examination",
      description: "Secured All India Rank 16 among thousands of candidates",
      year: "2025",
      icon: <Award className="text-yellow-400" size={24} />
    },
    {
      title: "Top 25% Academic Excellence",
      description: "Ranked 56th out of 240 students in cohort at CDAC",
      year: "2025",
      icon: <GraduationCap className="text-blue-400" size={24} />
    },
    {
      title: "94.6% in 12th CBSE Board",
      description: "Outstanding academic performance in senior secondary",
      year: "2020",
      icon: <Award className="text-green-400" size={24} />
    }
  ];

  const education = [
    {
      degree: "Diploma in Advanced Computing (DAC)",
      institution: "Sunbeam Institute of Information Technology, Pune",
      period: "Feb 2025 - Aug 2025",
      score: "70.94%"
    },
    {
      degree: "B.Tech in Electronics & Communication Engineering",
      institution: "Bundelkhand Institute of Engineering & Technology, Jhansi",
      period: "Completed July 2024",
      score: "CGPA: 7.43"
    }
  ];

  const timeline = [  
    {
      year: "July 2025",
      title: "ZoneOut Project",
      description: "Full-stack turf booking platform with payment integration",
      type: "project"
    },  
    {
      year: "Feb 2025 - Aug 2025",
      title: "Diploma in Advanced Computing",
      description: "Sunbeam Institute, Pune - 70.94%",
      type: "education"
    },
    {
      year: "feb 2025",
      title: "AIR 16 in PreCAT",
      description: "Secured All India Rank 16 among thousands of candidates",
      type: "achievement"
    },    
    {
      year: "July 2024",
      title: "B.Tech Completed",
      description: "Electronics & Communication Engineering - CGPA 7.43",
      type: "education"
    },
    {
      year: "Oct 2023 - Apr 2024",
      title: "Vehicle Theft Detection System",
      description: "IoT-based project with SMS alerts",
      type: "project"
    },
    {
      year: "May 2023",
      title: "SCL Mohali Internship",
      description: "GUI automation - 20% efficiency improvement",
      type: "internship"
    }
  ];

  const bgClass = isDarkMode 
    ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
    : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900";

  const cardClass = isDarkMode
    ? "bg-slate-900/50 border-white/10"
    : "bg-white/80 border-purple-200";

  const textClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`min-h-screen ${bgClass} overflow-hidden transition-colors duration-500`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'} rounded-full opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute w-96 h-96 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transition: 'all 0.5s ease-out',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div 
          className={`absolute top-1/4 right-1/4 w-96 h-96 ${isDarkMode ? 'bg-pink-600' : 'bg-pink-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          /* SKILL BAR: base and entrance/hover/focus animations */
          .skill-row { --w: 50%; } /* fallback */

          /* default state: collapsed bars for entrance animation */
          .skill-bar-inner {
            width: 0;
            background: linear-gradient(90deg, rgba(139,92,246,1) 0%, rgba(236,72,153,1) 100%);
            box-shadow: 0 0 0 rgba(0,0,0,0);
            filter: none;
            transform-origin: left center;
            transition: width 700ms cubic-bezier(.2,.9,.2,1), box-shadow 400ms ease, filter 400ms ease, transform 200ms ease;
            max-width: 100%;
            height: 100%;
          }

          /* When the skills section is observed, set width to var(--w) (entrance animation) */
          .skills-in-view .skill-bar-inner {
            width: var(--w);
          }

          /* Hover / focus grow and glow (clamped to 100%) */
          .skill-card:hover .skill-bar-inner,
          .skill-row:hover .skill-bar-inner,
          .skill-row:focus .skill-bar-inner,
          .skills-in-view .skill-row:focus .skill-bar-inner {
            width: min(100%, calc(var(--w) + 10%));
            box-shadow: 0 6px 22px rgba(139,92,246,0.18), 0 0 30px rgba(236,72,153,0.12);
            filter: drop-shadow(0 6px 18px rgba(139,92,246,0.12));
            transform: scaleY(1.05);
          }

          /* Slightly smaller increase on small screens */
          @media (max-width: 640px) {
            .skill-card:hover .skill-bar-inner,
            .skill-row:hover .skill-bar-inner {
              width: min(100%, calc(var(--w) + 6%));
            }
          }

          /* keyboard focus outline for accessibility */
          .skill-row:focus {
            outline: 2px solid rgba(139,92,246,0.12);
            outline-offset: 4px;
            border-radius: 8px;
          }
        `}
      </style>

      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md ${isDarkMode ? 'bg-slate-950/30' : 'bg-white/30'} border-b ${isDarkMode ? 'border-white/10' : 'border-purple-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SV Portfolio
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'About', 'Projects', 'Skills', 'Timeline', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`hover:text-purple-400 transition-colors cursor-pointer ${
                  activeSection === item.toLowerCase() ? 'text-purple-400' : ''
                }`}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg`}>
            {['Home', 'About', 'Projects', 'Skills', 'Timeline', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-6 py-3 hover:bg-purple-500/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full px-6 py-3 text-left hover:bg-purple-500/20 transition-colors flex items-center gap-2"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center space-y-8" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Shubh Vaish
            </h1>
            <p className="text-2xl md:text-3xl h-12">
              {typedText}<span className="animate-pulse">|</span>
            </p>
            <p className={`text-lg ${textClass} max-w-2xl mx-auto`}>
              Passionate about building scalable applications with modern technologies. 
              Specialized in Java, Spring Boot, React, and cloud-native solutions.
            </p>
            <div className={`flex gap-4 justify-center text-sm ${textClass} flex-wrap`}>
              <span className="flex items-center gap-2">
                <Mail size={16} /> shubhvaish2002@gmail.com
              </span>
              <span>|</span>
              <span>📞 7599926158</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-8">
            <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/50 text-white">
              Get In Touch
            </a>
            <a href="#projects" className="px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/20 transition-colors">
              View Projects
            </a>
            <a href="#" className="px-8 py-3 border-2 border-pink-500 rounded-full font-semibold hover:bg-pink-500/20 transition-colors inline-flex items-center gap-2">
              <Download size={18} /> Resume
            </a>
          </div>

          <div className="flex gap-6 justify-center pt-8">
            <a href="https://github.com/Shadow2002-hub" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors hover:scale-110 transform">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/shubh-vaish-945b4a214/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors hover:scale-110 transform">
              <Linkedin size={28} />
            </a>
            <a href="mailto:shubhvaish2002@gmail.com" className="hover:text-purple-400 transition-colors hover:scale-110 transform">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Target />, value: stats.projects, label: "Major Projects", suffix: "+" },
              { icon: <Code />, value: stats.problems, label: "DSA Problems", suffix: "+" },
              { icon: <Award />, value: stats.rank, label: "AIR PreCAT", suffix: "" },
              { icon: <TrendingUp />, value: stats.efficiency, label: "Efficiency Boost", suffix: "%" }
            ].map((stat, idx) => (
              <div key={idx} className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border transition-all hover:scale-105 text-center`}>
                <div className="text-purple-400 flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-sm ${textClass}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border`}>
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-purple-400" size={28} />
                <h3 className="text-2xl font-bold">Career Objective</h3>
              </div>
              <p className={`${textClass} leading-relaxed`}>
                Seeking to join an organization where I can apply my technical knowledge, problem-solving skills, 
                and passion for learning to contribute to organizational goals. I embrace new technologies and seek 
                continuous professional growth in challenging roles.
              </p>
            </div>

            <div className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border`}>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-pink-400" size={28} />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-purple-500 pl-4">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className={`text-sm ${textClass}`}>{edu.institution}</p>
                    <p className="text-sm text-purple-400">{edu.period} • {edu.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Journey
          </h2>

          <div className="relative">
            <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${isDarkMode ? 'bg-purple-500/30' : 'bg-purple-300'}`}></div>
            
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative mb-12 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:ml-auto md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                  <div className={`${cardClass} backdrop-blur-sm rounded-2xl p-6 border transition-all hover:scale-105 hover:border-purple-500/50`}>
                    <div className="text-purple-400 text-sm mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className={`text-sm ${textClass}`}>{item.description}</p>
                    <div className="mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        item.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-400' :
                        item.type === 'education' ? 'bg-blue-500/20 text-blue-400' :
                        item.type === 'project' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                  item.type === 'achievement' ? 'bg-yellow-400' :
                  item.type === 'education' ? 'bg-blue-400' :
                  item.type === 'project' ? 'bg-green-400' :
                  'bg-purple-400'
                } border-4 ${isDarkMode ? 'border-slate-950' : 'border-gray-50'}`}
                style={{ top: '24px' }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION: updated with animated glowing bars */}
      <section id="skills" ref={skillsRef} className={`relative py-20 px-6 ${skillsInView ? 'skills-in-view' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, idx) => (
              <div
                key={idx}
                className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border hover:border-purple-500/50 transition-all hover:scale-105 skill-card`}
              >
                <div className="text-purple-400 mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-6">{category.name}</h3>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <div
                      key={i}
                      className="skill-row"
                      style={{ ['--w']: `${item.level}%` }} // sets CSS variable for bar width
                      tabIndex={0} // keyboard-focusable
                    >
                      <div className="flex justify-between mb-2 items-center">
                        <span className={`text-sm ${textClass}`}>{item.name}</span>
                        {/* label area left empty (you asked no percentage shown) */}
                        <span className="text-sm text-purple-400 opacity-80">{/* optional label*/}</span>
                      </div>

                      <div className={`w-full h-2 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                        <div
                          className="skill-bar-inner h-full rounded-full"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 ${cardClass} backdrop-blur-sm rounded-2xl p-8 border`}>
            <h3 className="text-2xl font-bold mb-4 text-center">Core Competencies</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Data Structures & Algorithms", "Object-Oriented Programming", "SDLC", "Agile/Scrum", "REST APIs", "Microservices", "Problem Solving"].map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full text-sm border border-purple-500/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['All', 'Full-Stack', 'Backend', 'IoT'].map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  projectFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : `${cardClass} border hover:border-purple-500/50`
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className={`group relative ${cardClass} backdrop-blur-sm rounded-2xl p-6 border hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-xs text-purple-400 mb-2">{project.period}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className={`${textClass} mb-4 text-sm`}>{project.description || project.Description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-xs border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors">
                    View Project <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Awards & Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border hover:border-purple-500/50 transition-all hover:scale-105 text-center`}
              >
                <div className="flex justify-center mb-4">{achievement.icon}</div>
                <div className="text-purple-400 text-sm mb-2">{achievement.year}</div>
                <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                <p className={`${textClass} text-sm`}>{achievement.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border inline-block`}>
              <h3 className="text-xl font-bold mb-4">Coding Profiles</h3>
              <div className="flex gap-6 justify-center">
                <a href="https://leetcode.com/Shubh_Vaish" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition-colors">
                  LeetCode
                </a>
                <span className={textClass}>|</span>
                <a href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition-colors">
                  Striver A2Z DSA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className={`text-xl ${textClass} mb-12`}>
            Have a project in mind? Let's create something amazing together!
          </p>

          <div className={`${cardClass} backdrop-blur-sm rounded-2xl p-8 border`}>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-6 py-4 ${isDarkMode ? 'bg-slate-800/50 text-white' : 'bg-gray-100 text-gray-900'} border ${isDarkMode ? 'border-white/10' : 'border-purple-200'} rounded-xl focus:border-purple-500 focus:outline-none transition-colors`}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-6 py-4 ${isDarkMode ? 'bg-slate-800/50 text-white' : 'bg-gray-100 text-gray-900'} border ${isDarkMode ? 'border-white/10' : 'border-purple-200'} rounded-xl focus:border-purple-500 focus:outline-none transition-colors`}
              />
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`w-full px-6 py-4 ${isDarkMode ? 'bg-slate-800/50 text-white' : 'bg-gray-100 text-gray-900'} border ${isDarkMode ? 'border-white/10' : 'border-purple-200'} rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none`}
              />
              <button
                onClick={handleSubmit}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/50 text-white"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className={`mt-12 flex gap-8 justify-center ${textClass} flex-wrap`}>
            <a href="mailto:shubhvaish2002@gmail.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Mail size={20} />
              shubhvaish2002@gmail.com
            </a>
            <span>|</span>
            <span className="flex items-center gap-2">
              📞 759*****58 
            </span>
          </div>
        </div>
      </section>

      <footer className={`relative py-8 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-purple-200'}`}>
        <div className={`max-w-6xl mx-auto text-center ${textClass}`}>
          <p>© 2025 Shubh Vaish. Built with React & Tailwind CSS</p>
          <p className="text-sm mt-2">Electronics & Communication Engineer | Full Stack Developer</p>
        </div>
      </footer>
    </div>
  );
}
