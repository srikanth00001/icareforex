"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCog } from "react-icons/fa";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      console.log("Verifying OTP:", otp);
      router.push("/dashboard");
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    }
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    setError("");
    // Add logic to resend OTP here
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden lg:flex lg:w-5/12 bg-card flex-col lg:text-center p-6 md:p-10 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
          Verify Your OTP
        </h1>
        <p className="text-muted-foreground mb-6 md:mb-10 text-base md:text-lg">
          Securely access your account with a one-time password.
        </p>
        <div className="flex justify-center">
          <img
            src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/illustration-dashboard.webp"
            alt="Dashboard illustration"
            className="w-full max-w-sm h-auto rounded-lg"
          />
        </div>
        <ul className="flex justify-center mt-4 md:mt-6 space-x-4">
          {[
            { href: "#", alt: "Jwt", src: "ic-jwt.svg" },
            { href: "#", alt: "Firebase", src: "ic-firebase.svg" },
            { href: "#", alt: "Amplify", src: "ic-amplify.svg" },
            { href: "#", alt: "Auth0", src: "ic-auth0.svg" },
            { href: "#", alt: "Supabase", src: "ic-supabase.svg" },
          ].map(({ href, alt, src }) => (
            <li key={alt}>
              <a href={href} className="no-underline" aria-label={alt}>
                <img
                  src={`https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/${src}`}
                  alt={alt}
                  className="w-6 h-6"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Verify OTP Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-6 bg-card relative">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 8H16V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V8H7C5.9 8 5 8.9 5 10V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V10C19 8.9 18.1 8 17 8ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V8H10V6ZM17 20H7V10H17V20Z"
                fill="#00A769"
              />
              <path
                d="M12 17C12.55 17 13 16.55 13 16V14C13 13.45 12.55 13 12 13C11.45 13 11 13.45 11 14V16C11 16.55 11.45 17 12 17Z"
                fill="#FFD700"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">
            Verify OTP
          </h2>
          <p className="text-base text-muted-foreground mb-4 sm:mb-6 text-center">
            Please enter the 6-digit OTP sent to your email address to verify your account.
          </p>
          {error && (
            <p className="text-red-500 text-center text-base">{error}</p>
          )}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-card-foreground mb-2 text-base font-medium"
              >
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="w-full py-3 bg-[#1C2526] text-white rounded-lg hover:bg-[#1C2526]/90 transition duration-200"
            >
              Verify OTP
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-base text-muted-foreground hover:underline"
              >
                Resend OTP
              </button>
            </div>
            <div className="text-center">
              <a
                href="/auth/login"
                className="text-base text-muted-foreground hover:underline"
              >
                &lt; Return to sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;