import React, { useState } from "react";
import { Modal, IconButton, Box, Backdrop, Typography, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Certificate = ({ ImgSertif, title, issuer, link }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<Box
				sx={{
					position: "relative",
					overflow: "hidden",
					borderRadius: 2,
					boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
						"& .overlay": { opacity: 1 },
						"& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
						"& .certificate-image": {
							filter: "contrast(1.05) brightness(1) saturate(1.1)",
						},
					},
				}}
			>
				{/* Certificate Image */}
				<Box sx={{ position: "relative" }} onClick={handleOpen}>
					<img
						className="certificate-image"
						src={ImgSertif}
						alt={title}
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							objectFit: "cover",
							filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
							transition: "filter 0.3s ease",
							cursor: "pointer",
						}}
					/>
				</Box>

				{/* Hover Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0,
						transition: "all 0.3s ease",
						cursor: "pointer",
						zIndex: 2,
					}}
					onClick={handleOpen}
				>
					<Box
						className="hover-content"
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -60%)",
							opacity: 0,
							transition: "all 0.4s ease",
							textAlign: "center",
							width: "100%",
							color: "white",
						}}
					>
						<FullscreenIcon
							sx={{ fontSize: 40, mb: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
						/>
						<Typography variant="h6" sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
							View Certificate
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* Title & Issuer */}
			{link ? (
				<Link href={link} target="_blank" rel="noopener" underline="none">
					<Box sx={{ textAlign: "center", mt: 2, cursor: "pointer" }}>
						<Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600 }}>
							{title}
						</Typography>
						<Typography variant="body2" sx={{ color: "gray" }}>
							{issuer}
						</Typography>
					</Box>
				</Link>
			) : (
				<Box sx={{ textAlign: "center", mt: 2 }}>
					<Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600 }}>
						{title}
					</Typography>
					<Typography variant="body2" sx={{ color: "gray" }}>
						{issuer}
					</Typography>
				</Box>
			)}

			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(5px)" },
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
				}}
			>
				<Box
					sx={{
						position: "relative",
						width: "70vw",
						maxHeight: "90vh",
						m: 0,
						p: 0,
						outline: "none",
					}}
				>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "white",
							bgcolor: "rgba(0,0,0,0.6)",
							zIndex: 1,
							padding: 1,
							"&:hover": { bgcolor: "rgba(0,0,0,0.8)", transform: "scale(1.1)" },
						}}
						size="large"
					>
						<CloseIcon sx={{ fontSize: 24 }} />
					</IconButton>

					{/* Link Button - Only shown if link exists */}
					{link && (
						<IconButton
							component="a"
							href={link}
							target="_blank"
							rel="noopener"
							sx={{
								position: "absolute",
								right: 72,
								top: 16,
								color: "white",
								bgcolor: "rgba(0,0,0,0.6)",
								zIndex: 1,
								padding: 1,
								"&:hover": { bgcolor: "rgba(0,0,0,0.8)", transform: "scale(1.1)" },
							}}
							size="large"
						>
							<OpenInNewIcon sx={{ fontSize: 24 }} />
						</IconButton>
					)}

					{/* Modal Image */}
					<img
						src={ImgSertif}
						alt={title}
						style={{
							display: "block",
							width: "100%",
							maxHeight: "90vh",
							margin: "0 auto",
							objectFit: "contain",
						}}
					/>
				</Box>
			</Modal>
		</Box>
	);
};

export default Certificate;
