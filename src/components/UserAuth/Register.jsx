import React, { use, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import authbg from "../../assets/auth-bg.svg";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInWithGoogle, signInWithGithub, createUser, updateUser, setUser, setLoading } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Signed in with Google",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(location.state?.from?.pathname || '/');
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: 'Google Sign-in Failed',
                    text: getErrorMessage(err.code),
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    };

    const handleGithubSignIn = () => {
        signInWithGithub()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Signed in with GitHub",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(location.state?.from?.pathname || '/');
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: 'GitHub Sign-in Failed',
                    text: getErrorMessage(err.code),
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    };

    const validatePassword = (password, confirmPassword, email) => {
        const errors = [];

        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }

        if (!/\d/.test(password)) {
            errors.push("Password must contain at least one number.");
        }

        if (!/[\W_]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }

        if (email && password.toLowerCase().includes(email.split("@")[0].toLowerCase())) {
            errors.push("Password cannot contain your email address.");
        }

        if (password !== confirmPassword) {
            errors.push("Password and confirm password do not match.");
        }

        return errors;
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setPasswordError("");

        const { name, email, photoURL, password, confirmPassword } = e.target.elements;
        const trimmedName = name.value.trim();
        const trimmedEmail = email.value.trim();
        const trimmedPhoto = photoURL.value.trim();
        const pwd = password.value;
        const confirmPwd = confirmPassword.value;

        const validationErrors = validatePassword(pwd, confirmPwd, trimmedEmail);
        if (validationErrors.length > 0) {
            setPasswordError(validationErrors.join("\n"));
            return;
        }

        try {
            const userCredential = await createUser(trimmedEmail, password.value);
            const user = userCredential.user;

            await updateUser({ displayName: trimmedName, photoURL: trimmedPhoto });
            setUser({ ...user, displayName: trimmedName, photoURL: trimmedPhoto });

            await Swal.fire({
                icon: 'success',
                title: 'Account created successfully!',
                showConfirmButton: false,
                timer: 2000
            });
            navigate(location.state?.from?.pathname || "/");
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: getErrorMessage(err.code),
                confirmButtonColor: '#d33'
            });
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/email-already-in-use':
                return 'This email is already registered';
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/operation-not-allowed':
                return 'Registration is currently disabled';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters';
            case 'auth/popup-closed-by-user':
                return 'Google sign-up was canceled';
            default:
                return 'Registration failed. Please try again';
        }
    };

    return (
        <div className="flex items-center justify-center mx-[5%] mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl bg-base-100 rounded-2xl shadow-lg border border-gray-300 overflow-hidden">

                {/* Left Image */}
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

                {/* Right Form */}
                <div className="flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold mb-6 text-center">Create a new account</h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <input
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                autoFocus
                                required
                                className="w-full input input-bordered"
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full input input-bordered"
                            />
                            <input
                                name="photoURL"
                                type="text"
                                placeholder="Photo URL..."
                                className="w-full input input-bordered"
                            />
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
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
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    className="w-full input input-bordered pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                {passwordError && (
                                    <ul className="text-error text-sm list-disc ml-5">
                                        {passwordError.split("\n").map((err, idx) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                )}
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

                        <div className="flex flex-col md:flex-row items-center justify-center  gap-2">
                            {/* Google Sign-In */}
                            <button
                                onClick={handleGoogleSignUp}
                                className="btn btn-outline bg-success/50 flex items-center justify-center gap-2 rounded-full"
                            >
                                <FcGoogle />
                                Continue with Google
                            </button>
                            {/* Github Sign-In */}
                            <button
                                onClick={handleGithubSignIn}
                                className="btn btn-outline bg-success/50 flex items-center justify-center gap-2 rounded-full"
                            >
                                <FaGithub />
                                Continue with GitHub
                            </button>
                        </div>

                        {/* Sign In Link */}
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
