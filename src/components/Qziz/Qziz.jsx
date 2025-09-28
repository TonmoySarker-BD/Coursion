import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaArrowRight, FaRedo, FaTrophy, FaClock, FaListUl } from 'react-icons/fa';

const Quiz = () => {
    const [quizData, setQuizData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        // Fetch quiz data from public folder
        fetch('/quiz-data.json')
            .then(response => response.json())
            .then(data => setQuizData(data.quizzes[0]))
            .catch(error => console.error('Error loading quiz data:', error));
    }, []);

    useEffect(() => {
        if (!quizStarted || showScore) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizStarted, showScore]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (option) => {
        if (answered) return;

        setSelectedOption(option);
        setAnswered(true);

        if (option === quizData.questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
            setAnswered(false);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        setShowScore(true);
        setQuizStarted(false);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setAnswered(false);
        setTimeLeft(600);
        setQuizStarted(false);
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    if (!quizData) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-success mb-4"></div>
                    <p className="text-base-content">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (!quizStarted && !showScore) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card bg-base-100 shadow-2xl max-w-md w-full"
                >
                    <div className="card-body text-center">
                        <div className="w-20 h-20 bg-success text-success-content rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaListUl className="text-2xl" />
                        </div>
                        <h2 className="card-title justify-center text-2xl mb-2">{quizData.title}</h2>
                        <p className="text-base-content/70 mb-6">{quizData.description}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-base-content/70">Questions:</span>
                                <span className="font-semibold">{quizData.questions.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base-content/70">Time Limit:</span>
                                <span className="font-semibold">10:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base-content/70">Passing Score:</span>
                                <span className="font-semibold">70%</span>
                            </div>
                        </div>

                        <button onClick={startQuiz} className="btn btn-success btn-lg w-full">
                            Start Quiz
                            <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (showScore) {
        const percentage = (score / quizData.questions.length) * 100;
        const passed = percentage >= 70;

        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card bg-base-100 shadow-2xl max-w-md w-full"
                >
                    <div className="card-body text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? 'bg-success text-success-content' : 'bg-error text-error-content'
                                }`}
                        >
                            {passed ? <FaTrophy className="text-3xl" /> : <FaTimes className="text-3xl" />}
                        </motion.div>

                        <h2 className="card-title justify-center text-2xl mb-2">
                            {passed ? 'Congratulations!' : 'Keep Learning!'}
                        </h2>

                        <p className="text-base-content/70 mb-6">
                            {passed
                                ? `You passed with ${percentage.toFixed(1)}%`
                                : `You scored ${percentage.toFixed(1)}%. Need 70% to pass.`
                            }
                        </p>

                        <div className="stats shadow bg-base-200 mb-6">
                            <div className="stat">
                                <div className="stat-title">Your Score</div>
                                <div className="stat-value text-success">{score}/{quizData.questions.length}</div>
                                <div className="stat-desc">{percentage.toFixed(1)}%</div>
                            </div>
                        </div>

                        <div className="card-actions justify-center">
                            <button onClick={resetQuiz} className="btn btn-success gap-2">
                                <FaRedo />
                                Try Again
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQ = quizData.questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.answer;

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-base-content">{quizData.title}</h1>
                                <p className="text-base-content/70">Question {currentQuestion + 1} of {quizData.questions.length}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`badge badge-lg ${timeLeft < 60 ? 'badge-error' : 'badge-success'}`}>
                                    <FaClock className="mr-1" />
                                    {formatTime(timeLeft)}
                                </div>
                                <div className="badge badge-lg badge-ghost">
                                    Score: {score}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-base-300 rounded-full h-2 mt-4">
                            <motion.div
                                className="bg-success h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="card bg-base-100 shadow-xl border border-base-300"
                    >
                        <div className="card-body">
                            <h2 className="card-title text-xl text-base-content mb-6">
                                {currentQ.question}
                            </h2>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => {
                                    let optionStyle = "bg-base-100 border-base-300 hover:bg-base-200";

                                    if (answered) {
                                        if (option === currentQ.answer) {
                                            optionStyle = "bg-success border-success text-success-content";
                                        } else if (option === selectedOption && option !== currentQ.answer) {
                                            optionStyle = "bg-error border-error text-error-content";
                                        }
                                    } else if (selectedOption === option) {
                                        optionStyle = "bg-success border-success text-success-content";
                                    }

                                    return (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: answered ? 1 : 1.02 }}
                                            whileTap={{ scale: answered ? 1 : 0.98 }}
                                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle} ${!answered ? 'hover:shadow-md' : ''
                                                }`}
                                            onClick={() => handleAnswer(option)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{option}</span>
                                                {answered && option === currentQ.answer && (
                                                    <FaCheck className="flex-shrink-0" />
                                                )}
                                                {answered && option === selectedOption && option !== currentQ.answer && (
                                                    <FaTimes className="flex-shrink-0" />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            {answered && currentQ.explanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 p-4 bg-info/20 rounded-lg border border-info/30"
                                >
                                    <p className="text-info-content text-sm">{currentQ.explanation}</p>
                                </motion.div>
                            )}

                            {/* Navigation */}
                            <div className="card-actions justify-end mt-6">
                                <button
                                    onClick={handleNext}
                                    disabled={!answered}
                                    className="btn btn-success gap-2"
                                >
                                    {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Quiz;