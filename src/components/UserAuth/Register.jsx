import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import authbg from "../../assets/auth-bg.svg";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleGoogleSignUp = () => {
        console.log("Google Sign-up triggered");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl bg-base-100 rounded-2xl shadow-lg border border-gray-300 overflow-hidden">

                {/* Left Image with overlay */}
                <div
                    className="flex items-center justify-center relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${authbg})`, minHeight: "500px" }}
                >
                    <div className="absolute inset-0 bg-success/10 flex items-center justify-center p-10">
                        <div className="text-white text-center bg-success/70 p-4 rounded-2xl">
                            <h1 className="text-3xl font-bold mb-3 drop-shadow-lg">Join Us!</h1>
                            <p className="text-lg font-medium drop-shadow-md">Create your account to get started</p>
                        </div>
                    </div>
                </div>

                {/* Right side form */}
                <div className="flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold mb-6 text-center">Create a new account</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full input input-bordered"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full input input-bordered"
                            />
                            <input
                                type="text"
                                placeholder="Photo URL..."
                                className="w-full input input-bordered"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full input input-bordered pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full input input-bordered pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <button type="submit" className="btn btn-success w-full rounded-full">
                                REGISTER
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-2 my-4">
                            <div className="h-px flex-1 bg-gray-300" />
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="h-px flex-1 bg-gray-300" />
                        </div>

                        {/* Google Sign-Up */}
                        <button
                            onClick={handleGoogleSignUp}
                            className="btn btn-outline bg-success/50 w-full flex items-center justify-center gap-2 rounded-full"
                        >
                            <FcGoogle />
                            Continue with Google
                        </button>

                        {/* Sign In link */}
                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <a href="/signin" className="text-success font-medium hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
