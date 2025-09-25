// FullWidthTabs.jsx
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";

// ToggleButton component
const ToggleButton = ({ onClick, isShowingMore }) => (
	<button
		onClick={onClick}
		className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
	>
		<span className="relative z-10 flex items-center gap-2">
			{isShowingMore ? "See Less" : "See More"}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`transition-transform duration-300 ${
					isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
				}`}
			>
				<polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
			</svg>
		</span>
		<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
	</button>
);

ToggleButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	isShowingMore: PropTypes.bool.isRequired,
};

// TabPanel component
function TabPanel({ children, value, index, ...other }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: { xs: 1, sm: 3 } }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

// Accessibility props for tabs
function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

// Tech stack icons with online URLs
const techStacks = [
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

export default function FullWidthTabs() {
	const theme = useTheme();
	const [value, setValue] = useState(0);
	const [projects, setProjects] = useState([
		{
			id: 1,
			title: "Real-Time Chat Application",
			description:
				"Engineered a scalable full-stack chat application using MERN stack and WebSockets for real-time messaging.",
			TechStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io"],
			link: "https://chat-app-1-qzi6.onrender.com/chat",
			img: "/projects/Chat-App.png",
			details: [
				"Engineered a scalable full-stack chat application using MERN stack and WebSockets for real-time messaging.",
				"Implemented responsive front-end interface and RESTful APIs for efficient message handling.",
			],
		},
		{
			id: 2,
			title: "Chef Point – AI Recipe Recommender",
			description:
				"Built an intelligent recipe suggestion app based on user-provided ingredients using React.js and external APIs.",
			TechStack: ["React.js", "JavaScript", "Rapid API"],
			link: "https://chef-point-frontend.onrender.com",
			img: "/projects/Chef-point.png",
			details: [
				"Built an intelligent recipe suggestion app based on user-provided ingredients.",
				"Used external food APIs to fetch real-time data and deliver dynamic content.",
			],
		},
		{
			id: 3,
			title: "RE.NET – Research Networking Portal",
			description:
				"Developed a research collaboration platform using Java, JSP, MySQL, Bootstrap following MVC architecture.",
			TechStack: ["Java", "JSP", "MySQL", "Bootstrap", "MVC"],
			link: "https://github.com/MohitWadhwani201/RE.NET",
			img: "/projects/RENET.png",
			details: [
				"Developed a research collaboration platform enabling users to post publications and blogs.",
				"Structured backend with Java Servlets and JSP following MVC architecture for modularity.",
			],
		},
		{
			id: 4,
			title: "AccessEdu – Online Education Platform",
			description:
				"A full-featured online education platform enabling course creation, video uploads, enrollment, and Mux-powered captioning, built with MERN stack.",
			TechStack: ["React", "Node", "Express", "MongoDB", "MUI", "Cloudinary"],
			link: "https://github.com/piyushh2304/accessEdu",
			img: "/projects/accessedu.png",
			details: [
				"Implemented user authentication and profile management with JWT and bcrypt.",
				"Developed course management system with create, update, delete, and enrollment features.",
				"Integrated video upload and streaming using AWS S3 and Mux Player API.",
				"Added automatic caption generation for videos using Mux API with polling for readiness.",
				"Built responsive frontend using React.js and MUI, supporting a smooth UX for students and instructors.",
				"Cloudinary integration for managing course images and assets efficiently.",
			],
		},
		{
			id: 5,
			title: "Social Media Behavior Analysis",
			description: "Analyzed social media datasets using Python, Pandas, and Seaborn to uncover engagement trends.",
			TechStack: ["Python", "Pandas", "Seaborn"],
			link: "https://github.com/MohitWadhwani201/Social-Media-Analysis",
			img: "/projects/SocialMediaAnalysis.png",
			details: ["Analyzed Kaggle social media datasets to uncover trends in post engagement and user behavior."],
		},
		{
			id: 6,
			title: "WPM Calculator – Typing Speed Tester",
			description:
				"A simple web application to measure typing speed in words per minute (WPM), built using HTML, CSS, and JavaScript.",
			TechStack: ["HTML", "CSS", "JavaScript"],
			link: "https://wpm-tester-2urq.vercel.app/",
			img: "/projects/wpm-calculator.png",
			details: [
				"Created a lightweight typing speed tester using vanilla JavaScript.",
				"Displays real-time typing speed in words per minute with a countdown timer.",
				"Responsive design ensuring usability on desktop and mobile devices.",
				"Implemented user-friendly interface with instant feedback on typing accuracy.",
			],
		},
	]);

	const [certificates, setCertificates] = useState([
		{
			title: "Java (Core + Advanced)",
			issuer: "Programming World",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_java-certification-continuouslearning-activity-7245750337398067200-N_qs",
			ImgSertif: "/certificate/ProgrammingWorldJava.jpeg",
		},
		{
			title: "MERN Full-Stack Web Development",
			issuer: "30 Days of Coding",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_mern-webdevelopment-reactjs-activity-7336453507543175168-P9Ws",
			ImgSertif: "/certificate/MERN-30DaysCoding.jpeg",
		},
		{
			title: "SQL and Relational Databases",
			issuer: "Cognitive Class",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_sql-databasemanagement-continuouslearning-activity-7254365575735365633-5fTE",
			ImgSertif: "/certificate/CognitiveClassSql.jpeg",
		},
		{
			title: "NPTEL Java Programming",
			issuer: "NPTEL",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_java-nptel-learningjourney-activity-7217152963625009152-A9nz",
			ImgSertif: "/certificate/NPTEL-JAVAProgramming.jpeg",
		},
		{
			title: "Accelerated Computing CUDA",
			issuer: "NVIDIA",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_cuda-gpucomputing-programming-activity-7291016700005683200-lvgz",
			ImgSertif: "/certificate/Accelerated-computing-cuda.jpeg",
		},
		{
			title: "NVIDIA Data Science",
			issuer: "NVIDIA",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_im-happy-to-share-that-ive-obtained-a-new-activity-7335395305107914755-BIgv",
			ImgSertif: "/certificate/NVIDIA-Data-Science.jpg",
		},
		{
			title: "Cisco Networking Basics",
			issuer: "CISCO",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_networking-techskills-learning-activity-7298191239114305537--MuK",
			ImgSertif: "/certificate/CISCO-Networking-Basics.jpeg",
		},
		{
			title: "Cisco IoT",
			issuer: "Cisco",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_iot-digitaltransformation-learning-activity-7276156675688923136-7MFr",
			ImgSertif: "/certificate/Cisco-IOT.jpeg",
		},
		{
			title: "IBM HTML-CSS-JS",
			issuer: "IBM Cognitive Class",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_excited-to-share-that-i-have-completed-activity-7251296483189161985-bZV9",
			ImgSertif: "/certificate/IBM-HTML-CSS-JS.jpeg",
		},
		{
			title: "C/C++ Programming",
			issuer: "Programming World",
			link: "https://www.linkedin.com/posts/mohitwadhwani201_learning-programming-c-activity-7210881709121142784-OaVd",
			ImgSertif: "/certificate/ProgrammingWorlf-C-C++.jpeg",
		},
		{
			title: "Accenture Developer Job Simulation",
			issuer: "Accenture",
			link: "#",
			ImgSertif: "/certificate/Accenture-DeveloperJobSimulation.jpg",
		},
	]);

	const [showAllProjects, setShowAllProjects] = useState(false);
	const [showAllCertificates, setShowAllCertificates] = useState(false);

	const initialItems = window.innerWidth < 768 ? 4 : 6;

	useEffect(() => {
		AOS.init({ once: false });
	}, []);

	const handleChange = (event, newValue) => setValue(newValue);
	const toggleShowMore = useCallback((type) => {
		if (type === "projects") setShowAllProjects((prev) => !prev);
		else setShowAllCertificates((prev) => !prev);
	}, []);

	const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
	const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

	const handlers = useSwipeable({
		onSwipedLeft: () => setValue((prev) => Math.min(prev + 1, 2)),
		onSwipedRight: () => setValue((prev) => Math.max(prev - 0, 0)),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	return (
		<div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
			<div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
				<h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
					Portfolio Showcase
				</h2>
				<p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
					Explore my projects, certifications, and technical expertise as a Full Stack Developer in MERN and
					Java.
				</p>
			</div>

			<Box sx={{ width: "100%" }}>
				<AppBar
					position="static"
					elevation={0}
					sx={{
						bgcolor: "transparent",
						border: "1px solid rgba(255,255,255,0.1)",
						borderRadius: "20px",
						position: "relative",
						overflow: "hidden",
					}}
					className="md:px-4"
				>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="secondary"
						indicatorColor="secondary"
						variant="fullWidth"
						sx={{
							minHeight: "70px",
							"& .MuiTab-root": {
								fontSize: { xs: "0.9rem", md: "1rem" },
								fontWeight: "600",
								color: "#94a3b8",
								textTransform: "none",
								transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
								padding: "20px 0",
								zIndex: 1,
								margin: "8px",
								borderRadius: "12px",
							},
							"& .MuiTabs-indicator": { height: 0 },
							"& .MuiTabs-flexContainer": { gap: "8px" },
						}}
					>
						<Tab icon={<Code className="mb-2 w-5 h-5" />} label="Main Projects" {...a11yProps(0)} />
						<Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
						<Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
					</Tabs>
				</AppBar>

				<div {...handlers}>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<div className="container mx-auto flex justify-center items-center overflow-hidden">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
								{displayedProjects.map((project) => (
									<CardProject key={project.id} {...project} />
								))}
							</div>
						</div>
						{projects.length > initialItems && (
							<div className="mt-6 w-full flex justify-start">
								<ToggleButton
									onClick={() => toggleShowMore("projects")}
									isShowingMore={showAllProjects}
								/>
							</div>
						)}
					</TabPanel>

					<TabPanel value={value} index={1} dir={theme.direction}>
						<div className="container mx-auto flex justify-center items-center overflow-hidden">
							<div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
								{displayedCertificates.map((certificate, index) => (
									<Certificate key={index} {...certificate} />
								))}
							</div>
						</div>
						{certificates.length > initialItems && (
							<div className="mt-6 w-full flex justify-start">
								<ToggleButton
									onClick={() => toggleShowMore("certificates")}
									isShowingMore={showAllCertificates}
								/>
							</div>
						)}
					</TabPanel>

					<TabPanel value={value} index={2} dir={theme.direction}>
						<div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
								{techStacks.map((stack, index) => (
									<TechStackIcon key={index} {...stack} />
								))}
							</div>
						</div>
					</TabPanel>
				</div>
			</Box>
		</div>
	);
}
