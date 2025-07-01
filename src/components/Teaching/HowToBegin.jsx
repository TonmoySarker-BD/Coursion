import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import planIMG from "../../assets/plan.png";
import recordIMG from "../../assets/record.jpg";
import launchIMG from "../../assets/launch.jpg";

const steps = [
    {
        title: "Plan your curriculum",
        image: planIMG,
        content: (
            <>
                <p className="mb-4">
                    You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.
                </p>
                <p className="mb-4">
                    The way that you teach — what you bring to it — is up to you.
                </p>
                <h4 className="font-semibold mb-2">How we help you</h4>
                <p>
                    We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
                </p>
            </>
        ),
    },
    {
        title: "Record your video",
        image: recordIMG,
        content: (
            <>
                <p className="mb-4">
                    Use your phone or a professional setup — just make sure your audio is clear and your camera is steady.
                </p>
                <p className="mb-4">
                    We’ll guide you on how to deliver engaging lectures and tutorials.
                </p>
                <h4 className="font-semibold mb-2">How we help you</h4>
                <p>
                    Get tips from successful instructors and access free resources for video production.
                </p>
            </>
        ),
    },
    {
        title: "Launch your course",
        image: launchIMG,
        content: (
            <>
                <p className="mb-4">
                    Submit your course for review, publish it, and start reaching learners worldwide.
                </p>
                <p className="mb-4">
                    Keep updating your course and engaging with students to build success.
                </p>
                <h4 className="font-semibold mb-2">How we help you</h4>
                <p>
                    We promote your course, provide feedback, and support you as you grow.
                </p>
            </>
        ),
    },
];

const HowToBegin = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto text-black rounded-3xl bg-green-200/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl text-black font-bold text-center mb-10">
                    How to begin
                </h2>

                <div className="flex flex-col md:flex-row gap-10 items-center">
                    {/* Left: Text and Tabs */}
                    <div className="md:w-1/2">
                        <div className="flex space-x-6 justify-center md:justify-start mb-6">
                            {steps.map((step, index) => (
                                <button
                                    key={index}
                                    className={`pb-2 font-semibold transition-all ${index === activeStep
                                            ? "text-green-700 border-b-2 border-green-700"
                                            : "hover:text-green-700 hover:border-b-2 border-transparent"
                                        }`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    {step.title}
                                </button>
                            ))}
                        </div>

                        <div className="text-lg">
                            {steps[activeStep].content}
                        </div>
                    </div>

                    {/* Right: Image with animation */}
                    <div className="md:w-1/2 flex justify-center">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={steps[activeStep].image}
                                src={steps[activeStep].image}
                                alt={steps[activeStep].title}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-md w-full rounded-xl shadow-lg"
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToBegin;
