import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const API_BASE = "http://localhost:8000/profile/api";

  // ================= CHECK AUTH ON LOAD =================
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Invalid token");

        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ================= LOGIN =================
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      // Save tokens
      localStorage.setItem("access", data.token);
      localStorage.setItem("refresh", data.refreshtoken);

      // Fetch user details
      const userRes = await fetch(`${API_BASE}/user/`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = await userRes.json();
      setCurrentUser(userData);

      toast({
        title: "Welcome back 🎉",
        description: "Login successful",
      });

      return { success: true };

    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // ================= SIGNUP =================
  const signup = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password,
          confirm_password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Signup failed";

        if (typeof data === "object") {
          errorMessage =
            Object.values(data)[0]?.[0] ||
            data.detail ||
            "Signup failed";
        }

        throw new Error(errorMessage);
      }

      toast({
        title: "Account Created 🎉",
        description: "You can now login.",
      });

      return { success: true };

    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setCurrentUser(null);

    toast({
      title: "Logged Out",
      description: "You have been logged out.",
    });
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};