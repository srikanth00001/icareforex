"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCog } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState(""); // Changed from firstName/lastName to single name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log("Signing up with:", { name, email, password });
      router.push("/auth/verify-otp");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden lg:flex lg:w-5/12 bg-card flex-col lg:text-center p-6 md:p-10 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
          Hi, Welcome back
        </h1>
        <p className="text-muted-foreground mb-6 md:mb-10 text-base md:text-lg">
          More effectively with optimized workflows.
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

      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-6 bg-card relative">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Get started absolutely free
            </h2>
          </div>
          <p className="text-base text-muted-foreground mb-4 sm:mb-6">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#00A769] hover:underline">
              Get started
            </a>
          </p>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-card-foreground mb-2 text-base font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full name"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-card-foreground mb-2 text-base font-medium"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-card-foreground mb-2 text-base font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="6+ characters"
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        fillRule="evenodd"
                        d="M12 4.5C7.5 4.5 3.738 7.252 2 12c1.738 4.748 5.5 7.5 10 7.5s8.262-2.752 10-7.5C20.262 7.252 16.5 4.5 12 4.5zM12 17c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-2c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M1.606 6.08a1 1 0 0 1 1.313.526L2 7l.92-.394v-.001l.003.009l.021.045l.094.194c.086.172.219.424.4.729a13.4 13.4 0 0 0 1.67 2.237a12 12 0 0 0 .59.592C7.18 11.8 9.251 13 12 13a8.7 8.7 0 0 0 3.22-.602c1.227-.483 2.254-1.21 3.096-1.998a13 13 0 0 0 2.733-3.725l.027-.058l.005-.011a1 1 0 0 1 1.838.788L22 7l.92.394l-.003.005l-.004.008l-.011.026l-.04.087a14 14 0 0 1-.741 1.348a15.4 15.4 0 0 1-1.711 2.256l.797.797a1 1 0 0 1-1.414 1.415l-.84-.84a12 12 0 0 1-1.897 1.256l.782 1.202a1 1 0 1 1-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V16.5a1 1 0 0 1-2 0v-1.544c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 0 1-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 0 1-1.414-1.414l.797-.797a15.4 15.4 0 0 1-1.87-2.519a14 14 0 0 1-.591-1.107l-.033-.072l-.01-.021l-.002-.007l-.001-.002v-.001C1.08 7.395 1.08 7.394 2 7l-.919.395a1 1 0 0 1 .525-1.314"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-card-foreground mb-2 text-base font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        fillRule="evenodd"
                        d="M12 4.5C7.5 4.5 3.738 7.252 2 12c1.738 4.748 5.5 7.5 10 7.5s8.262-2.752 10-7.5C20.262 7.252 16.5 4.5 12 4.5zM12 17c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-2c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M1.606 6.08a1 1 0 0 1 1.313.526L2 7l.92-.394v-.001l.003.009l.021.045l.094.194c.086.172.219.424.4.729a13.4 13.4 0 0 0 1.67 2.237a12 12 0 0 0 .59.592C7.18 11.8 9.251 13 12 13a8.7 8.7 0 0 0 3.22-.602c1.227-.483 2.254-1.21 3.096-1.998a13 13 0 0 0 2.733-3.725l.027-.058l.005-.011a1 1 0 0 1 1.838.788L22 7l.92.394l-.003.005l-.004.008l-.011.026l-.04.087a14 14 0 0 1-.741 1.348a15.4 15.4 0 0 1-1.711 2.256l.797.797a1 1 0 0 1-1.414 1.415l-.84-.84a12 12 0 0 1-1.897 1.256l.782 1.202a1 1 0 1 1-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V16.5a1 1 0 0 1-2 0v-1.544c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 0 1-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 0 1-1.414-1.414l.797-.797a15.4 15.4 0 0 1-1.87-2.519a14 14 0 0 1-.591-1.107l-.033-.072l-.01-.021l-.002-.007l-.001-.002v-.001C1.08 7.395 1.08 7.394 2 7l-.919.395a1 1 0 0 1 .525-1.314"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            {error && <p className="text-base text-destructive mb-4">{error}</p>}
            <button
              type="button"
              onClick={handleSignup}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition duration-200 uppercase"
            >
              Create account
            </button>
            <p className="text-base text-muted-foreground">
              By signing up, I agree to{" "}
              <a href="/terms" className="text-muted-foreground hover:underline">
                Terms of service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-muted-foreground hover:underline">
                Privacy policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;