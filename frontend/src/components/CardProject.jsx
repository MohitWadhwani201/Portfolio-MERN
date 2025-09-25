import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const CardProject = ({ id, title, description, TechStack = [], link, img, details = [] }) => {
	const [showDetails, setShowDetails] = useState(false);

	const handleLiveDemo = (e) => {
		if (!link) {
			e.preventDefault();
			alert("Live demo link is not available");
		}
	};

	return (
		<div className="group relative w-full">
			<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

				<div className="relative p-5 z-10">
					{img && (
						<div className="relative overflow-hidden rounded-lg">
							<img
								src={img}
								alt={title}
								className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
					)}

					<div className="mt-4 space-y-3">
						<h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
							{title}
						</h3>

						<p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">{description}</p>

						{TechStack.length > 0 && (
							<div className="flex flex-wrap gap-2 mt-3">
								{TechStack.map((tech, idx) => (
									<span
										key={idx}
										className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						)}

						{/* Details Section */}
						{details.length > 0 && showDetails && (
							<ul className="text-gray-300/80 text-sm mt-2 list-disc list-inside space-y-1">
								{details.map((point, idx) => (
									<li key={idx}>{point}</li>
								))}
							</ul>
						)}

						<div className="pt-4 flex items-center justify-between">
							{link ? (
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									onClick={handleLiveDemo}
									className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
								>
									<span className="text-sm font-medium">
										{link.toLowerCase().includes("github")
											? "GitHub"
											: "Live Demo"}
									</span>
									<ExternalLink className="w-4 h-4" />
								</a>
							) : (
								<span className="text-gray-500 text-sm">Demo Not Available</span>
							)}

							{details.length > 0 && (
								<button
									onClick={() => setShowDetails(!showDetails)}
									className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
								>
									<span className="text-sm font-medium">
										{showDetails ? "Hide Details" : "Details"}
									</span>
									<ArrowRight className="w-4 h-4 transform transition-transform duration-200" />
								</button>
							)}
						</div>
					</div>

					<div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
				</div>
			</div>
		</div>
	);
};

export default CardProject;
