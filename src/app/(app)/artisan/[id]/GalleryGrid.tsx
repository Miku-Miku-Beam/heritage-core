"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryGridProps {
	images: string[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const openAt = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};

	const close = () => setIsOpen(false);

	const showPrev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);
	const showNext = () => setSelectedIndex((i) => (i + 1) % images.length);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (!isOpen) return;
			if (e.key === "Escape") close();
			if (e.key === "ArrowLeft") showPrev();
			if (e.key === "ArrowRight") showNext();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [isOpen, images.length]);

	if (!images || images.length === 0) return null;

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{images.slice(0, 9).map((url, i) => (
					<button
						key={i}
						type="button"
						onClick={() => openAt(i)}
						className="group block rounded-xl overflow-hidden border border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
					>
						<Image
							src={url}
							alt={`Gallery ${i + 1}`}
							width={400}
							height={300}
							className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</button>
				))}
			</div>

			{isOpen && (
				<div
					role="dialog"
					aria-modal="true"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
					onClick={close}
				>
					<div className="relative max-w-5xl w-full px-4" onClick={(e) => e.stopPropagation()}>
						<button
							type="button"
							aria-label="Close"
							onClick={close}
							className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl"
						>
							×
						</button>
						<div className="relative w-full flex items-center justify-center">
							<Image
								src={images[selectedIndex]}
								alt={`Gallery ${selectedIndex + 1}`}
								width={1600}
								height={1000}
								className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
							/>
							<button
								type="button"
								aria-label="Previous image"
								onClick={showPrev}
								className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl px-3"
							>
								‹
							</button>
							<button
								type="button"
								aria-label="Next image"
								onClick={showNext}
								className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl px-3"
							>
								›
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}



