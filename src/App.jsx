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
  const skillsRef = useRef(null);
  const [skillsInView, setSkillsInView] = useState(false);

  const texts = [
    "Software Developer",
    "Java Developer",
    "Full Stack Developer",
    "React Developer",
    "Spring Boot Developer",
    "Backend Developer",
    "Frontend Developer",
    "Tech Enthusiast",
    "REST API Developer"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentText.substring(0, typedText.length + 1));
        if (typedText === currentText) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setTypedText(currentText.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedStats) {
            setHasAnimatedStats(true);
            animateValue('projects', 0, 3, 2000);
            animateValue('problems', 0, 260, 2000);
            animateValue('rank', 0, 16, 2000);
            animateValue('efficiency', 0, 20, 2000);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimatedStats]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setSkillsInView(true); obs.disconnect(); }
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
      if (progress < 1) requestAnimationFrame(animate);
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
      title: "Online Grocery Store",
      description: "Developed a full-stack e-commerce grocery platform with secure authentication, product management, cart functionality, and order tracking. Implemented category-wise product search, QR payments, inventory updates, toast notifications, and admin dashboard.",
      tech: ["React", "Spring Boot", "MySQL", "REST APIs", "JavaScript", "Tailwind CSS"],
      gradient: "from-pink-500 to-rose-500",
      link: "#",
      period: "Feb 2025 - Aug 2025",
      category: "Full-Stack"
    }
  ];

  const filteredProjects = projectFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === projectFilter);

  const skills = [
    {
      name: "Frontend",
      items: [
        { name: "React", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "HTML/CSS", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 }
      ],
      icon: <Palette />
    },
    {
      name: "Backend",
      items: [
        { name: "Spring Boot", level: 82 },
        { name: "ASP.NET", level: 72 },
        { name: "REST APIs", level: 85 },
        { name: "Node.js", level: 65 },
        { name: "MVC", level: 75 }
      ],
      icon: <Code />
    },
    {
      name: "Programming",
      items: [
        { name: "Java", level: 88 },
        { name: "C++", level: 78 }
      ],
      icon: <Code />
    },
    {
      name: "Database",
      items: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 70 },
        { name: "RDBMS", level: 78 }
      ],
      icon: <Code />
    },
    {
      name: "Tools",
      items: [
        { name: "Git/GitHub", level: 82 },
        { name: "VS Code", level: 88 },
        { name: "Visual Studio", level: 78 },
        { name: "STS", level: 75 }
      ],
      icon: <Zap />
    }
  ];

  const achievements = [
    {
      title: "CDAC Certified",
      description: "Successfully completed Diploma in Advanced Computing",
      year: "2025",
      icon: <Award className="text-pink-400" size={24} />
    },
    {
      title: "Advanced Python Training",
      description: "Industrial Training Program by Fantacy Technologies",
      year: "2024",
      icon: <Code className="text-purple-400" size={24} />
    },
    {
      title: "TCS iON Communication Skills",
      description: "Certified Communication Skills Program",
      year: "2024",
      icon: <GraduationCap className="text-rose-400" size={24} />
    }
  ];

  const education = [
    {
      degree: "CDAC in Advanced Computing",
      institution: "Sunbeam Institute Of Information Technology, Pune",
      period: "Feb 2025 - Aug 2025",
      score: ""
    },
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Terna College of Engineering, Osmanabad",
      period: "Jun 2021 - May 2024",
      score: "80.00%"
    },
    {
      degree: "HSC",
      institution: "Dr. Chandrabhanu Sonvane Jr. College, Ukkadgaon",
      period: "Jun 2018 - May 2019",
      score: "64.38%"
    },
    {
      degree: "SSC",
      institution: "Janata Vidyalay, Yedshi",
      period: "Jun 2016 - May 2017",
      score: "71.80%"
    }
  ];

  const timeline = [
    { year: "2025", title: "CDAC in Advanced Computing", description: "Sunbeam Institute Of Information Technology, Pune", type: "education" },
    { year: "2025", title: "Online Grocery Store Project", description: "Developed full-stack grocery e-commerce application", type: "project" },
    { year: "2024", title: "B.Tech Completed", description: "Computer Science Engineering - 80%", type: "education" },
    { year: "2024", title: "Advanced Python Training", description: "Industrial Training Program - Fantacy Technologies", type: "achievement" },
    { year: "2024", title: "TCS iON Communication Skills", description: "Professional communication certification", type: "achievement" }
  ];

  const dark = isDarkMode;

  return (
    <div className={`min-h-screen font-sans overflow-hidden transition-colors duration-700 ${dark ? 'bg-[#0f0a14] text-white' : 'bg-[#fdf6f9] text-[#2a1a22]'}`}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, .serif { font-family: 'Cormorant Garamond', serif; }

        /* Petal cursor trail */
        @keyframes petalFall {
          0% { opacity: 0.7; transform: scale(1) rotate(0deg) translateY(0); }
          100% { opacity: 0; transform: scale(0.3) rotate(180deg) translateY(40px); }
        }

        /* Floating petals */
        @keyframes floatPetal {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.12; }
          33% { transform: translateY(-28px) rotate(120deg) scale(1.1); opacity: 0.2; }
          66% { transform: translateY(-14px) rotate(240deg) scale(0.9); opacity: 0.15; }
        }

        /* Silk shimmer on cards */
        @keyframes silkShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Blossom card hover */
        .blossom-card {
          position: relative;
          transition: transform 0.45s cubic-bezier(.2,.9,.2,1), box-shadow 0.45s ease, border-color 0.45s ease;
          overflow: hidden;
        }
        .blossom-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,182,193,0.08) 0%, rgba(218,165,232,0.06) 50%, rgba(255,160,180,0.04) 100%);
          opacity: 0;
          transition: opacity 0.45s ease;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
        }
        .blossom-card::after {
          content: '✿';
          position: absolute;
          bottom: -24px;
          right: -12px;
          font-size: 72px;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.2,.9,.2,1), bottom 0.5s ease;
          pointer-events: none;
          background: linear-gradient(135deg, #f9a8d4, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          z-index: 0;
        }
        .blossom-card:hover {
          transform: translateY(-8px) scale(1.025);
          box-shadow: 0 24px 56px rgba(232, 121, 249, 0.18), 0 4px 20px rgba(249, 168, 212, 0.14);
        }
        .blossom-card:hover::before { opacity: 1; }
        .blossom-card:hover::after { opacity: 0.2; bottom: -6px; transform: rotate(-12deg); }

        /* Petal tag hover */
        .petal-tag {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .petal-tag::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(249,168,212,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .petal-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(232,121,249,0.2); }
        .petal-tag:hover::after { transform: translateX(100%); }

        /* Nav link */
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 50%;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #f9a8d4, #e879f9);
          transition: all 0.35s ease;
          transform: translateX(-50%);
          border-radius: 99px;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link:hover, .nav-link.active { color: #f9a8d4; }

        /* Skill bars */
        .skill-row { --w: 50%; }
        .skill-bar-inner {
          width: 0;
          background: linear-gradient(90deg, #f9a8d4 0%, #e879f9 60%, #c084fc 100%);
          box-shadow: 0 2px 12px rgba(232,121,249,0.2);
          transition: width 800ms cubic-bezier(.2,.9,.2,1), box-shadow 400ms ease;
          max-width: 100%; height: 100%;
        }
        .skills-in-view .skill-bar-inner { width: var(--w); }
        .blossom-card:hover .skill-bar-inner,
        .skill-row:hover .skill-bar-inner {
          width: min(100%, calc(var(--w) + 8%));
          box-shadow: 0 4px 18px rgba(232,121,249,0.3);
        }

        /* Button bloom */
        .bloom-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .bloom-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .bloom-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(232,121,249,0.35); }
        .bloom-btn:hover::after { opacity: 1; }

        /* Timeline dot pulse */
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,168,212,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(249,168,212,0); }
        }
        .timeline-dot { animation: dotPulse 2.5s ease-in-out infinite; }

        /* Stat card shimmer on hover */
        .stat-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(249,168,212,0.12), transparent);
          transform: skewX(-20deg);
          opacity: 0;
          transition: none;
        }
        .stat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(232,121,249,0.2); }
        .stat-card:hover::after {
          opacity: 1;
          animation: shimmerSweep 0.7s ease forwards;
        }
        @keyframes shimmerSweep {
          0% { left: -60%; }
          100% { left: 130%; }
        }

        /* Input focus bloom */
        .petal-input {
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;
        }
        .petal-input:focus {
          outline: none;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(249,168,212,0.2);
        }

        /* Achievement badge hover */
        .badge-card {
          transition: transform 0.4s cubic-bezier(.2,.9,.2,1), box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .badge-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #f9a8d4, #e879f9, #c084fc);
          transform: scaleX(0);
          transition: transform 0.45s ease;
          transform-origin: left;
        }
        .badge-card:hover { transform: translateY(-10px) rotate(-0.5deg); box-shadow: 0 28px 60px rgba(232,121,249,0.22); }
        .badge-card:hover::before { transform: scaleX(1); }

        /* Education border highlight */
        .edu-item {
          transition: all 0.35s ease;
          border-left: 2px solid rgba(249,168,212,0.3);
          padding-left: 1rem;
        }
        .edu-item:hover {
          border-left-color: #f9a8d4;
          transform: translateX(4px);
        }

        /* Section heading underline */
        .section-heading {
          position: relative;
          display: inline-block;
        }
        .section-heading::after {
          content: '';
          position: absolute;
          bottom: -8px; left: 50%;
          transform: translateX(-50%);
          width: 60px; height: 2px;
          background: linear-gradient(90deg, #f9a8d4, #e879f9);
          border-radius: 99px;
        }

        /* Project card overlay */
        .project-reveal {
          position: relative;
          overflow: hidden;
        }
        .project-reveal .reveal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249,168,212,0.06), rgba(232,121,249,0.10));
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: inherit;
        }
        .project-reveal:hover .reveal-overlay { opacity: 1; }

        /* Floating orbs */
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 30px) scale(0.95); }
          75% { transform: translate(20px, 10px) scale(1.02); }
        }
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.12]"
          style={{
            background: dark
              ? 'radial-gradient(circle, #e879f9 0%, #f9a8d4 60%, transparent 100%)'
              : 'radial-gradient(circle, #f9a8d4 0%, #fce7f3 60%, transparent 100%)',
            left: `${mousePosition.x / 25}px`,
            top: `${mousePosition.y / 25}px`,
            transition: 'all 0.6s ease-out',
            animation: 'orbDrift 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.1]"
          style={{
            background: dark
              ? 'radial-gradient(circle, #c084fc 0%, #e879f9 100%)'
              : 'radial-gradient(circle, #e9d5ff 0%, #fce7f3 100%)',
            animation: 'orbDrift 22s ease-in-out infinite reverse',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-[0.08]"
          style={{
            background: dark
              ? 'radial-gradient(circle, #fb7185 0%, #f9a8d4 100%)'
              : 'radial-gradient(circle, #fecdd3 0%, #fce7f3 100%)',
            animation: 'orbDrift 26s ease-in-out infinite',
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        {/* Floating petals */}
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
              fontSize: `${10 + (i % 4) * 6}px`,
              animation: `floatPetal ${8 + i * 1.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
              color: ['#f9a8d4', '#e879f9', '#c084fc', '#fb7185'][i % 4],
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {['✿', '❀', '✾', '❁'][i % 4]}
          </div>
        ))}
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-500 ${dark ? 'bg-[#0f0a14]/70 border-pink-900/20' : 'bg-white/60 border-pink-200/60'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="serif text-2xl font-light tracking-widest" style={{
            background: 'linear-gradient(90deg, #f9a8d4, #e879f9)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Soniya Swami
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'About', 'Projects', 'Skills', 'Timeline', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`nav-link text-sm tracking-wide ${activeSection === item.toLowerCase() ? 'active' : ''} ${dark ? 'text-pink-100/80' : 'text-rose-900/70'}`}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all hover:scale-110 ${dark ? 'hover:bg-pink-900/30' : 'hover:bg-pink-100'}`}
            >
              {isDarkMode ? <Sun size={18} className="text-pink-300" /> : <Moon size={18} className="text-pink-600" />}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-pink-400" /> : <Menu className="text-pink-400" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-xl ${dark ? 'bg-[#0f0a14]/95' : 'bg-white/95'}`}>
            {['Home', 'About', 'Projects', 'Skills', 'Timeline', 'Achievements', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className={`block px-6 py-3 text-sm tracking-wide transition-colors ${dark ? 'hover:bg-pink-900/20 hover:text-pink-300' : 'hover:bg-pink-50 hover:text-pink-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >{item}</a>
            ))}
            <button onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-full px-6 py-3 text-left text-sm flex items-center gap-2 ${dark ? 'hover:bg-pink-900/20' : 'hover:bg-pink-50'}`}
            >
              {isDarkMode ? <><Sun size={16} className="text-pink-300" /> Light Mode</> : <><Moon size={16} className="text-pink-600" /> Dark Mode</>}
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 z-10">
        <div className="max-w-4xl text-center space-y-10" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
          {/* Decorative ring */}
          <div className="relative inline-block mx-auto mb-2">
            <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-5xl"
              style={{
                background: dark
                  ? 'linear-gradient(135deg, rgba(249,168,212,0.15), rgba(232,121,249,0.1))'
                  : 'linear-gradient(135deg, rgba(249,168,212,0.3), rgba(232,121,249,0.2))',
                border: '1px solid rgba(249,168,212,0.3)',
                boxShadow: '0 8px 32px rgba(232,121,249,0.15)',
              }}>
              ❀
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="serif text-6xl md:text-8xl font-light tracking-wide leading-none"
              style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #e879f9 50%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Soniya Swami
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #f9a8d4)' }} />
              <span className="text-pink-400 text-xs tracking-[0.4em] uppercase">Portfolio</span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #f9a8d4, transparent)' }} />
            </div>

            <p className={`text-xl md:text-2xl h-10 font-light tracking-wider ${dark ? 'text-pink-200/80' : 'text-rose-700/80'}`}>
              {typedText}<span className="animate-pulse text-pink-400">|</span>
            </p>

            <p className={`text-base leading-relaxed max-w-xl mx-auto font-light ${dark ? 'text-pink-100/50' : 'text-rose-800/60'}`}>
              Passionate about building scalable applications with modern technologies.
              Specialized in Java, Spring Boot, React, and cloud-native solutions.
            </p>

            <div className={`flex gap-4 justify-center text-sm flex-wrap ${dark ? 'text-pink-200/60' : 'text-rose-700/60'}`}>
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-pink-400" /> soniyaswami9689@gmail.com
              </span>
              <span className="text-pink-400/40">·</span>
              <span>📞 9689309057</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a href="#contact" className="bloom-btn px-8 py-3 rounded-full text-sm font-medium tracking-wide text-white"
              style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)' }}>
              Get In Touch
            </a>
            <a href="#projects"
              className={`bloom-btn px-8 py-3 rounded-full text-sm font-medium tracking-wide border transition-colors ${dark ? 'border-pink-400/40 text-pink-300 hover:bg-pink-900/20' : 'border-pink-400 text-pink-700 hover:bg-pink-50'}`}>
              View Projects
            </a>
            <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer"
              className={`bloom-btn px-8 py-3 rounded-full text-sm font-medium tracking-wide border inline-flex items-center gap-2 transition-colors ${dark ? 'border-rose-400/40 text-rose-300 hover:bg-rose-900/20' : 'border-rose-400 text-rose-700 hover:bg-rose-50'}`}>
              <Download size={15} /> Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-6 justify-center pt-2">
            {[
              { icon: <Github size={22} />, href: "https://github.com/Shadow2002-hub" },
              { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/shubh-vaish-945b4a214/" },
              { icon: <Mail size={22} />, href: "mailto:soniyaswami9689@gmail.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`p-2.5 rounded-full border transition-all hover:scale-110 hover:-translate-y-1 ${dark ? 'border-pink-400/20 text-pink-300/60 hover:text-pink-300 hover:border-pink-400/50 hover:bg-pink-900/20' : 'border-pink-300 text-pink-500 hover:bg-pink-50'}`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Target size={20} />, value: stats.projects, label: "Major Projects", suffix: "+" },
              { icon: <Code size={20} />, value: stats.problems, label: "DSA Problems", suffix: "+" },
              { icon: <Award size={20} />, value: stats.rank, label: "AIR PreCAT", suffix: "" },
              { icon: <TrendingUp size={20} />, value: stats.efficiency, label: "Efficiency Boost", suffix: "%" },
            ].map((stat, idx) => (
              <div key={idx} className={`stat-card rounded-2xl p-8 border text-center cursor-default ${dark ? 'bg-white/[0.04] border-pink-900/30' : 'bg-white/70 border-pink-200/60'}`}
                style={{ backdropFilter: 'blur(20px)' }}>
                <div className="text-pink-400 flex justify-center mb-4 opacity-70">{stat.icon}</div>
                <div className="serif text-5xl font-light mb-2"
                  style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-xs tracking-widest uppercase ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="serif section-heading text-5xl font-light" style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              About Me
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Career Objective */}
            <div className={`blossom-card rounded-3xl p-8 border ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
              style={{ backdropFilter: 'blur(20px)' }}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(249,168,212,0.2), rgba(232,121,249,0.15))' }}>
                    <Briefcase size={18} className="text-pink-400" />
                  </div>
                  <h3 className="serif text-2xl font-light">Career Objective</h3>
                </div>
                <p className={`leading-relaxed text-sm font-light ${dark ? 'text-pink-100/50' : 'text-rose-900/60'}`}>
                  Seeking to leverage my experience as a Java Developer at Bajaj to build scalable,
                  high-performance applications and contribute to impactful business solutions. Passionate about backend
                  development, problem-solving, and continuous learning, I aim to grow professionally while working with
                  modern technologies and collaborative teams in challenging environments.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className={`blossom-card rounded-3xl p-8 border ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
              style={{ backdropFilter: 'blur(20px)' }}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(249,168,212,0.2), rgba(232,121,249,0.15))' }}>
                    <GraduationCap size={18} className="text-pink-400" />
                  </div>
                  <h3 className="serif text-2xl font-light">Education</h3>
                </div>
                <div className="space-y-5 relative z-10">
                  {education.map((edu, idx) => (
                    <div key={idx} className="edu-item">
                      <h4 className={`font-medium text-sm ${dark ? 'text-pink-100' : 'text-rose-900'}`}>{edu.degree}</h4>
                      <p className={`text-xs mt-0.5 ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>{edu.institution}</p>
                      <p className="text-xs text-pink-400 mt-0.5">{edu.period}{edu.score && ` · ${edu.score}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="serif section-heading text-5xl font-light" style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              My Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(249,168,212,0.4) 10%, rgba(249,168,212,0.4) 90%, transparent)' }} />

            {timeline.map((item, idx) => (
              <div key={idx} className={`relative mb-12 flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-full md:w-[46%] ${idx % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                  <div className={`blossom-card rounded-2xl p-6 border cursor-default ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
                    style={{ backdropFilter: 'blur(20px)' }}>
                    <div className="relative z-10">
                      <div className="text-pink-400 text-xs tracking-widest uppercase mb-2">{item.year}</div>
                      <h3 className={`serif text-xl font-light mb-2 ${dark ? 'text-pink-100' : 'text-rose-900'}`}>{item.title}</h3>
                      <p className={`text-xs leading-relaxed ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>{item.description}</p>
                      <div className="mt-4">
                        <span className={`px-3 py-1 rounded-full text-xs tracking-wide ${
                          item.type === 'career' ? 'bg-pink-500/15 text-pink-400 border border-pink-500/20'
                            : item.type === 'achievement' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                              : item.type === 'education' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                                : item.type === 'project' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2"
                  style={{
                    top: '24px',
                    background: item.type === 'achievement' ? '#fbbf24'
                      : item.type === 'education' ? '#60a5fa'
                        : item.type === 'project' ? '#34d399'
                          : '#f9a8d4',
                    borderColor: dark ? '#0f0a14' : '#fdf6f9',
                  }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef} className={`relative py-20 px-6 z-10 ${skillsInView ? 'skills-in-view' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="serif section-heading text-5xl font-light" style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Skills & Expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, idx) => (
              <div key={idx} className={`blossom-card rounded-3xl p-7 border ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
                style={{ backdropFilter: 'blur(20px)' }}>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-pink-400 opacity-60">{category.icon}</div>
                    <h3 className={`serif text-xl font-light ${dark ? 'text-pink-100' : 'text-rose-900'}`}>{category.name}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <div key={i} className="skill-row" style={{ '--w': `${item.level}%` }} tabIndex={0}>
                        <div className="flex justify-between mb-2">
                          <span className={`text-xs tracking-wide ${dark ? 'text-pink-200/50' : 'text-rose-700/60'}`}>{item.name}</span>
                          <span className="text-xs text-pink-400/50">{item.level}%</span>
                        </div>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${dark ? 'bg-pink-950/60' : 'bg-pink-100'}`}>
                          <div className="skill-bar-inner h-full rounded-full" aria-hidden="true" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Competencies */}
          <div className={`mt-10 rounded-3xl p-8 border ${dark ? 'bg-white/[0.03] border-pink-900/20' : 'bg-white/60 border-pink-200/40'}`}
            style={{ backdropFilter: 'blur(20px)' }}>
            <h3 className={`serif text-xl font-light text-center mb-6 ${dark ? 'text-pink-100' : 'text-rose-900'}`}>Core Competencies</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Data Structures & Algorithms", "Object-Oriented Programming", "SDLC", "Agile/Scrum", "REST APIs", "Microservices", "Problem Solving"].map((skill, idx) => (
                <span key={idx} className={`petal-tag px-4 py-2 rounded-full text-xs tracking-wide border cursor-default ${dark ? 'border-pink-500/20 text-pink-200/60 bg-pink-900/10' : 'border-pink-300/60 text-rose-700/70 bg-pink-50'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="serif section-heading text-5xl font-light" style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Featured Projects
            </h2>
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {['All', 'Full-Stack', 'Backend', 'IoT'].map((filter) => (
              <button key={filter} onClick={() => setProjectFilter(filter)}
                className={`bloom-btn px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all border ${
                  projectFilter === filter
                    ? 'text-white border-transparent'
                    : dark ? 'border-pink-900/30 text-pink-300/60 hover:border-pink-400/40' : 'border-pink-200 text-rose-700/60 hover:border-pink-400'
                }`}
                style={projectFilter === filter ? { background: 'linear-gradient(135deg, #f9a8d4, #e879f9)' } : {}}>
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div key={idx} className={`project-reveal blossom-card rounded-3xl p-7 border ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
                style={{ backdropFilter: 'blur(20px)' }}>
                <div className="reveal-overlay" />
                <div className="relative z-10">
                  <div className="text-pink-400/50 text-xs tracking-widest mb-3">{project.period}</div>
                  <h3 className={`serif text-2xl font-light mb-3 ${dark ? 'text-pink-100' : 'text-rose-900'}`}>{project.title}</h3>
                  <p className={`text-xs leading-relaxed mb-5 ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className={`petal-tag px-3 py-1 rounded-full text-xs border ${dark ? 'border-pink-500/20 text-pink-300/60 bg-pink-900/10' : 'border-pink-300/50 text-rose-700/60 bg-pink-50'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-pink-400 hover:text-pink-300 transition-colors tracking-wide">
                    View Project <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="serif section-heading text-5xl font-light" style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Awards & Achievements
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div key={idx} className={`badge-card rounded-3xl p-8 border text-center cursor-default ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
                style={{ backdropFilter: 'blur(20px)' }}>
                <div className="flex justify-center mb-4 opacity-80">{achievement.icon}</div>
                <div className="text-pink-400/60 text-xs tracking-widest uppercase mb-3">{achievement.year}</div>
                <h3 className={`serif text-xl font-light mb-3 ${dark ? 'text-pink-100' : 'text-rose-900'}`}>{achievement.title}</h3>
                <p className={`text-xs leading-relaxed ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>{achievement.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className={`inline-block rounded-2xl p-8 border ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
              style={{ backdropFilter: 'blur(20px)' }}>
              <h3 className={`serif text-xl font-light mb-5 ${dark ? 'text-pink-100' : 'text-rose-900'}`}>Coding Profiles</h3>
              <div className="flex gap-8 justify-center">
                {[
                  { label: "LeetCode", href: "https://leetcode.com/Shubh_Vaish" },
                  { label: "Striver A2Z DSA", href: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2" },
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors tracking-wide hover:underline underline-offset-4">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-20 px-6 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="serif section-heading text-5xl font-light mb-6" style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Let's Work Together
            </h2>
            <p className={`text-sm font-light tracking-wide ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          <div className={`rounded-3xl p-10 border ${dark ? 'bg-white/[0.04] border-pink-900/20' : 'bg-white/70 border-pink-200/50'}`}
            style={{ backdropFilter: 'blur(20px)' }}>
            <div className="space-y-5">
              {[
                { type: 'text', name: 'name', placeholder: 'Your Name', value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }) },
                { type: 'email', name: 'email', placeholder: 'Your Email', value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }) },
              ].map((field, i) => (
                <input key={i} type={field.type} placeholder={field.placeholder} value={field.value} onChange={field.onChange}
                  className={`petal-input w-full px-6 py-4 rounded-2xl text-sm border focus:border-pink-400/60 ${dark ? 'bg-pink-950/20 border-pink-900/30 text-pink-100 placeholder-pink-200/20' : 'bg-pink-50/80 border-pink-200/60 text-rose-900 placeholder-rose-300'}`} />
              ))}
              <textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`petal-input w-full px-6 py-4 rounded-2xl text-sm border resize-none focus:border-pink-400/60 ${dark ? 'bg-pink-950/20 border-pink-900/30 text-pink-100 placeholder-pink-200/20' : 'bg-pink-50/80 border-pink-200/60 text-rose-900 placeholder-rose-300'}`} />
              <button onClick={handleSubmit}
                className="bloom-btn w-full py-4 rounded-2xl text-sm font-medium tracking-widest uppercase text-white"
                style={{ background: 'linear-gradient(135deg, #f9a8d4, #e879f9, #c084fc)' }}>
                Send Message ✿
              </button>
            </div>
          </div>

          <div className={`mt-10 flex gap-8 justify-center flex-wrap text-xs tracking-wide ${dark ? 'text-pink-200/40' : 'text-rose-700/50'}`}>
            <a href="mailto:soniyaswami9689@gmail.com" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
              <Mail size={14} className="text-pink-400" /> soniyaswami9689@gmail.com
            </a>
            <span className="text-pink-400/30">·</span>
            <span className="flex items-center gap-1">📞 9689309057</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`relative py-10 px-6 border-t z-10 ${dark ? 'border-pink-900/20' : 'border-pink-200/40'}`}>
        <div className={`max-w-6xl mx-auto text-center ${dark ? 'text-pink-200/30' : 'text-rose-700/40'}`}>
          <div className="text-2xl mb-3 opacity-40">❀</div>
          <p className="serif text-sm font-light tracking-wider">© 2026 Soniya Swami. Built with React & Tailwind CSS</p>
          <p className="text-xs mt-1 tracking-widest uppercase">Computer Science Engineer · Full Stack Developer</p>
        </div>
      </footer>
    </div>
  );
}