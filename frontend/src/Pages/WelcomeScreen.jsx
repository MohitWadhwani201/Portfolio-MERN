import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text, speed = 100, onComplete }) => {
	const [displayText, setDisplayText] = useState("");

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			if (index <= text.length) {
				setDisplayText(text.slice(0, index));
				index++;
			} else {
				clearInterval(timer);
				onComplete?.();
			}
		}, speed);

		return () => clearInterval(timer);
	}, [text, speed, onComplete]);

	return (
		<span className="inline-block">
			{displayText}
			<span className="animate-pulse">|</span>
		</span>
	);
};

const BackgroundEffect = () => (
	<div className="absolute inset-0 overflow-hidden">
		<div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
		<div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
	</div>
);

const IconButton = ({ Icon, href }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">
		<div className="relative group hover:scale-110 transition-transform duration-300">
			<div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
			<div className="relative p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
				<Icon className="w-6 h-6 text-white" />
			</div>
		</div>
	</a>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleTypewriterComplete = () => {
		setTimeout(() => {
			setIsLoading(false);
			onLoadingComplete?.();
		}, 800); // small delay after typewriter
	};

	useEffect(() => {
		AOS.init({ duration: 1000, once: false, mirror: false });
	}, []);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					className="fixed inset-0 bg-[#030014] z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
				>
					<BackgroundEffect />
					<div className="relative min-h-screen flex flex-col items-center justify-center px-4">
						{/* Icons */}
						<div className="flex justify-center gap-6 mb-8">
							<IconButton Icon={Github} href="https://github.com/mohitwadhwani201" />
							<IconButton Icon={Linkedin} href="https://www.linkedin.com/in/mohitwadhwani201/" />
							<a
								href="https://mail.google.com/mail/?view=cm&fs=1&to=mohit.wadhwani2.01@gmail.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconButton Icon={Mail} />
							</a>
						</div>

						{/* Welcome Text */}
						<h1 className="text-center text-3xl sm:text-5xl md:text-6xl font-bold space-y-2 sm:space-y-4">
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">
								Welcome
							</span>
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
								To My Portfolio
							</span>
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 text-xl sm:text-3xl">
								<TypewriterEffect
									text="MERN Full-Stack Developer | Java Enthusiast"
									speed={80}
									onComplete={handleTypewriterComplete}
								/>
							</span>
						</h1>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default WelcomeScreen;
