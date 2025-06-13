import { FaChalkboardTeacher, FaCertificate, FaUserFriends, FaHandsHelping, FaLaptopCode, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WhyChooseUs = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const features = [
        {
            icon: <FaChalkboardTeacher className="text-4xl" />,
            title: "Expert Instructors",
            description: "Learn from industry professionals with 10+ years of real-world experience.",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <FaLaptopCode className="text-4xl" />,
            title: "Project-Based Learning",
            description: "Build portfolio-worthy projects that demonstrate your skills.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <FaCertificate className="text-4xl" />,
            title: "Certified Courses",
            description: "Receive industry-recognized certificates upon completion.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <FaUserFriends className="text-4xl" />,
            title: "Community Support",
            description: "Join our 50,000+ member community for networking and help.",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: <FaGraduationCap className="text-4xl" />,
            title: "Career Services",
            description: "Get resume reviews, interview prep, and job placement help.",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: <FaHandsHelping className="text-4xl" />,
            title: "1-on-1 Mentorship",
            description: "Personalized guidance from experienced professionals.",
            color: "from-yellow-500 to-amber-400"
        }
    ];

    return (
        <section className="py-20" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
                        Why <span className="text-success bg-clip-text ">Choose Us?</span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        We're committed to providing the best learning experience with proven results
                    </p>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200 group-hover:duration-300" />
                            <div className="relative bg-white/30  rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center border">
                                <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;