import React from "react";
import authbg from "../../assets/auth-bg.svg";

const ForgotPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset requested");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl bg-base-100 rounded-2xl shadow-lg border border-gray-300 overflow-hidden">

                {/* Left-side image with overlay */}
                <div
                    className="flex items-center justify-center relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${authbg})`, minHeight: "500px" }}
                >
                    <div className="absolute inset-0 bg-success/10 flex items-center justify-center p-10">
                        <div className="text-white text-center bg-success/70 p-4 rounded-2xl">
                            <h1 className="text-3xl font-bold mb-3 drop-shadow-lg">Forgot Password?</h1>
                            <p className="text-lg font-medium drop-shadow-md">Don't worry! We'll help you reset it.</p>
                        </div>
                    </div>
                </div>

                {/* Right-side form */}
                <div className="flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold mb-6 text-center">Reset your password</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="w-full input input-bordered"
                                required
                            />
                            <button type="submit" className="btn btn-success w-full rounded-full">
                                Send Reset Link
                            </button>
                        </form>

                        {/* Link back to login */}
                        <p className="text-center text-sm mt-4">
                            Remember your password?{" "}
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

export default ForgotPassword;
