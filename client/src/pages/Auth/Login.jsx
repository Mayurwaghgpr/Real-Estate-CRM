import { useState } from "react";
import { ArrowRight } from "lucide-react";
import CommonInput from "../../components/input/CommonInput";
import useIcon from "../../hooks/useIcon";
import { useDispatch } from "react-redux";
import useAuthService from "../../services/useAuthService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { loginUser } = useAuthService();
  const icons = useIcon();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      setIsLoading(true);
      await loginUser(formData);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-between  border-inherit">
      {/* Left Section - Illustration & Branding */}
      <div className="hidden lg:flex  bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden h-full w-full">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 text-2xl bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                {icons["building"]}
              </div>
              <h1 className="text-3xl font-bold">EstateManager</h1>
            </div>
            <p className="text-blue-100 text-lg ml-15">
              Your Real Estate CRM Platform
            </p>
          </div>

          {/* Central Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Main illustration card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="w-80 h-80 flex items-center justify-center">
                  <img src="/building.png" alt="building" />
                </div>
              </div>

              {/* Floating icons */}
              <div className="absolute text-2xl -top-8 -right-8 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                {icons["key"]}
              </div>
              <div className="absolute text-2xl -bottom-8 -left-8 w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                {icons["trendingUp"]}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 text-xl bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                {icons["building"]}
              </div>
              <p className="text-sm font-medium">Property Management</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 text-xl bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                {icons["user"]}
              </div>
              <p className="text-sm font-medium">Lead Tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 text-xl bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                {icons["trendingUp"]}
              </div>
              <p className="text-sm font-medium">Analytics</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center w-full max-w-xl border-inherit border-s h-full ">
        {/* Login Form */}
        <div className=" border-inherit p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          <div className="space-y-6 border-inherit">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <CommonInput
              className="px-4 py-2"
              label="Email Address "
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            {/* Password Field */}
            <div className="relative border-inherit">
              <CommonInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="pr-12  px-4 py-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 transform text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? icons["eyeOff"] : icons["eye"]}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
              onClick={handleSubmit}
            >
              {isLoading ? (
                icons["spinner1"]
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact your administrator
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Secure login powered by industry-standard encryption
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
