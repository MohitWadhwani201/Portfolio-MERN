import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import TechStackIcon from "../components/TechStackIcon"; // Your TechStackIcon component

// Social Links Data (LinkedIn & GitHub)
const socialLinks = [
	{
		name: "LinkedIn",
		displayName: "Let's Connect",
		subText: "on LinkedIn",
		url: "https://www.linkedin.com/in/mohitwadhwani201",
		color: "#0A66C2",
		gradient: "from-[#0A66C2] to-[#0077B5]",
		icon: ({ className, ...props }) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={socialLinks?.color || "#0A66C2"}
				className={className}
				{...props}
			>
				<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-7.5c0-1.8-.03-4.13-2.52-4.13-2.52 0-2.91 1.97-2.91 4V24h-5V8z" />
			</svg>
		),
	},
	{
		name: "GitHub",
		displayName: "GitHub",
		subText: "@MohitWadhwani",
		url: "https://github.com/MohitWadhwani201",
		color: "#ffffff",
		gradient: "from-[#333] to-[#24292e]",
		icon: ({ className, ...props }) => (
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className} {...props}>
				<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.931 0-1.31.465-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.609-2.805 5.625-5.475 5.921.429.369.81 1.096.81 2.21 0 1.596-.015 2.884-.015 3.276 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
			</svg>
		),
	},
];

// Memoized Header
const Header = memo(() => (
	<div className="text-center lg:mb-8 mb-2 px-[5%]">
		<div className="inline-block relative group">
			<h2
				className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
				data-aos="zoom-in-up"
				data-aos-duration="600"
			>
				About Me
			</h2>
		</div>
		<p
			className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
			data-aos="zoom-in-up"
			data-aos-duration="800"
		>
			<Sparkles className="w-5 h-5 text-purple-400" />
			Motivated full-stack developer creating modern web applications.
			<Sparkles className="w-5 h-5 text-purple-400" />
		</p>
	</div>
));

// Memoized Profile Image
const ProfileImage = memo(() => (
	<div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
		<div className="relative group" data-aos="fade-up" data-aos-duration="1000">
			<div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
				<div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
				<div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
				<div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
			</div>
			<div className="relative">
				<div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
					<div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
					<img
						src="/Profile.png"
						alt="Profile"
						className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</div>
));

// Stat Card
const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
	<div data-aos={animation} data-aos-duration={1300} className="relative group">
		<div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
			<div
				className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
			></div>
			<div className="flex items-center justify-between mb-4">
				<div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
					<Icon className="w-8 h-8 text-white" />
				</div>
				<span className="text-4xl font-bold text-white">{value}</span>
			</div>
			<div>
				<p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{label}</p>
				<div className="flex items-center justify-between">
					<p className="text-xs text-gray-400">{description}</p>
					<ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
				</div>
			</div>
		</div>
	</div>
));

const AboutPage = () => {
	const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
		const startDate = new Date("2022-01-01");
		const today = new Date();
		const experience =
			today.getFullYear() -
			startDate.getFullYear() -
			(today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

		return {
			totalProjects: 10,
			totalCertificates: 11,
			YearExperience: experience,
		};
	}, []);

	useEffect(() => {
		AOS.init({ once: false });
	}, []);

	const statsData = useMemo(
		() => [
			{
				icon: Code,
				color: "from-[#6366f1] to-[#a855f7]",
				value: totalProjects,
				label: "Total Projects",
				description: "Innovative web solutions crafted",
				animation: "fade-right",
			},
			{
				icon: Award,
				color: "from-[#a855f7] to-[#6366f1]",
				value: totalCertificates,
				label: "Certificates",
				description: "Professional skills validated",
				animation: "fade-up",
			},
			{
				icon: Globe,
				color: "from-[#6366f1] to-[#a855f7]",
				value: YearExperience,
				label: "Years of Experience",
				description: "Continuous learning journey",
				animation: "fade-left",
			},
		],
		[totalProjects, totalCertificates, YearExperience]
	);

	const techStack = [
		{
			iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
			language: "JavaScript",
		},
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", language: "React.js" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", language: "HTML5" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", language: "CSS3" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg", language: "Bootstrap" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", language: "Node.js" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", language: "Express.js" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", language: "Java" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", language: "Python" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", language: "C" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", language: "C++" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", language: "MySQL" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", language: "MongoDB" },
		{ iconSrc: "/nvidia.png", language: "CUDA C/C++" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", language: "Git" },
		{ iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", language: "GitHub" },
	];

	return (
		<div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10" id="About">
			<Header />

			<div className="w-full mx-auto pt-8 sm:pt-12 relative">
				<div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
					<div className="space-y-6 text-center lg:text-left">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
								Hello, I'm
							</span>
							<span className="block mt-2 text-gray-200">Mohit Wadhwani</span>
						</h2>

						<p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4">
							Motivated and detail-oriented web developer with strong skills in Java, Python,
							HTML5, CSS3, JavaScript (ES6+), and experience with Data Structures & Algorithms.
							Experienced in building full-stack applications and RESTful APIs using modern
							frameworks.
						</p>

						{/* Social Links */}
						<div className="flex gap-4 mt-6 justify-center lg:justify-start">
							{socialLinks.map((link) => (
								<a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
								>
									<link.icon className="w-5 h-5" />
									<span className="text-gray-300 text-sm">{link.displayName}</span>
								</a>
							))}
						</div>
					</div>

					<ProfileImage />
				</div>

				{/* Stats Cards */}
				<a href="#Portfolio">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
						{statsData.map((stat) => (
							<StatCard key={stat.label} {...stat} />
						))}
					</div>
				</a>

				{/* TechStack */}
				<div className="mt-16">
					<h3 className="text-2xl font-semibold mb-6">Tech Stack</h3>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
						{techStack.map((tech) => (
							<TechStackIcon key={tech.language} {...tech} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(AboutPage);
