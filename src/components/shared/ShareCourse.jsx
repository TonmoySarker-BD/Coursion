import React, { useState } from 'react';
import { FaShare, FaCopy, FaCheck, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaLink, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ShareCourse = ({ courseId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareUrl = `${window.location.origin}/courses/${courseId}`;
    const encodedUrl = encodeURIComponent(shareUrl);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            color: 'bg-blue-600 hover:bg-blue-700',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            color: 'bg-sky-500 hover:bg-sky-600',
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}`
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            color: 'bg-blue-700 hover:bg-blue-800',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            color: 'bg-green-500 hover:bg-green-600',
            url: `https://wa.me/?text=${encodedUrl}`
        }
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCopied(false);
    };

    return (
        <>
            {/* Share Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-outline btn-success "
            >
                <span className="">Share</span>
                <FaShare className="w-4 h-4" />
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-base-300/10 backdrop-blur-sm"
                            onClick={closeModal}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative bg-base-100 rounded-2xl shadow-xl w-full max-w-md mx-4"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-base-300">
                                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                                    <FaShare className="w-5 h-5 text-primary" />
                                    Share this course
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="btn btn-ghost btn-circle btn-sm"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {/* Social Share Buttons */}
                                <div className="mb-6">
                                    <p className="text-sm text-base-content/70 mb-4">
                                        Share via social media
                                    </p>
                                    <div className="grid grid-cols-4 gap-3">
                                        {shareLinks.map((platform) => {
                                            const Icon = platform.icon;
                                            return (
                                                <button
                                                        key={platform.name}
                                                    onClick={() => window.open(platform.url, '_blank', 'noopener,noreferrer')}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-xl text-white transition-all hover:scale-105 ${platform.color}`}
                                                    title={`Share on ${platform.name}`}
                                                >
                                                    <Icon className="w-5 h-5 mb-1" />
                                                    <span className="text-xs font-medium">{platform.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Copy Link Section */}
                                <div>
                                    <p className="text-sm text-base-content/70 mb-3">
                                        Or copy direct link
                                    </p>
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={shareUrl}
                                                readOnly
                                                className="input input-bordered w-full pr-20 text-sm"
                                                onClick={(e) => e.target.select()}
                                            />
                                            {copied && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                                >
                                                    <span className="text-success text-sm font-medium flex items-center gap-1">
                                                        <FaCheck className="w-3 h-3" />
                                                        Copied!
                                                    </span>
                                                </motion.div>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleCopyLink}
                                            className={`btn btn-primary gap-2 transition-all ${copied ? 'btn-success' : ''
                                                }`}
                                            disabled={copied}
                                        >
                                            {copied ? <FaCheck /> : <FaCopy />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                {/* Referral Bonus Info */}
                                {/* <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                                    <p className="text-xs text-primary flex items-center gap-2">
                                        <FaLink className="w-3 h-3" />
                                        Share your referral link to earn rewards when friends enroll!
                                    </p>
                                </div> */}
                            </div>

                            {/* Footer */}
                            {/* <div className="flex justify-end p-4 border-t border-base-300">
                                <button
                                    onClick={closeModal}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Close
                                </button>
                            </div> */}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShareCourse;