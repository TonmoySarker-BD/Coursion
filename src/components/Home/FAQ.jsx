import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "How do I find the right course for me?",
            answer: "We recommend using our 'Course Catalog' page. You can filter by category, skill level (Beginner, Intermediate, Advanced), or duration. Each course page has a detailed description, a curriculum outline, and information about the instructor to help you make an informed decision."
        },
        {
            question: "Are there any prerequisites for the courses?",
            answer: "Prerequisites vary by course. Most beginner-level courses have no prerequisites. For intermediate and advanced courses, any required prior knowledge is clearly listed in the course description and requirements section."
        },
        {
            question: "What is the course format?",
            answer: "Our courses include video lectures, reading materials, practical exercises, quizzes, and in some cases, final projects. You'll have access to a dedicated learning dashboard where you can track your progress."
        },
        {
            question: "How long do I have access to a course?",
            answer: "You get lifetime access to all enrolled courses. This includes all future updates and additional content added to the course."
        },
        {
            question: "Can I get a certificate after completion?",
            answer: "Yes! Upon successfully completing all course requirements, you'll receive a certificate of completion that you can download and share on your LinkedIn profile or resume."
        },
        {
            question: "What if I need help during the course?",
            answer: "You can ask questions in the course discussion forum where the instructor and other students can help. Some courses also offer direct Q&A sessions with instructors."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Find quick answers to the most common questions about our courses and the enrollment process.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-300/50 transition-colors duration-200 rounded-lg"
                            >
                                <span className="text-lg font-semibold text-base-content pr-4">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <FaArrowUp className="w-5 h-5 text-success flex-shrink-0" />
                                ) : (
                                    <FaArrowDown className="w-5 h-5 text-success flex-shrink-0" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-4">
                                            <p className="text-base-content/80 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 p-8 bg-gradient-to-r from-success to-secondary rounded-2xl text-success-content"
                >
                    <h3 className="text-2xl font-bold mb-4">
                        Still have questions?
                    </h3>
                    <p className="mb-6 opacity-90">
                        Our support team is here to help you get started on your learning journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-accent btn-lg">
                            Contact Support
                        </button>
                        <button className="btn btn-outline btn-lg text-success-content border-success-content hover:bg-success-content hover:text-success">
                            Browse All Courses
                        </button>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

export default FAQ;