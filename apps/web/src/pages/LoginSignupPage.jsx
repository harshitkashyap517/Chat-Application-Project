import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail, Lock, User } from "lucide-react";

const LoginSignupPage = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= TOGGLE LOGIN/SIGNUP =================
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required.",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!isLogin) {
      const username = formData.username.trim();

      if (!username) {
        toast({
          title: "Validation Error",
          description: "Username is required.",
          variant: "destructive",
        });
        return false;
      }

      if (password.length < 8) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
        });
        return false;
      }

      if (password !== formData.confirmPassword.trim()) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);

    try {
      const email = formData.email.trim().toLowerCase();
      const password = formData.password.trim();
      const username = formData.username.trim();

      if (isLogin) {
        const res = await login(email, password);

        if (res?.success) {
          navigate("/dashboard");
        }
      } else {
        const res = await signup(username, email, password);

        if (res?.success) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Sign Up"} - ChatApp</title>
        <meta name="description" content="Access your ChatApp account." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">

            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-center text-gray-500 mb-8">
              {isLogin
                ? "Sign in to continue to ChatApp"
                : "Join ChatApp and start connecting today"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Username (Signup Only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label>Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      placeholder="Choose a username"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm password"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-6 rounded-xl mt-6 text-lg"
              >
                {loading
                  ? isLogin
                    ? "Signing in..."
                    : "Creating account..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={toggleMode}
                  className="text-blue-600 font-semibold"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupPage;