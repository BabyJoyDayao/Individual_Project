import React, { useState, useEffect } from "react";
import { LogIn, UserPlus, Shield, Key, Eye, EyeOff, Film, Smartphone, Tablet, Monitor } from "lucide-react";

const USERS_KEY = "app_users";

function Login({ onLogin }) {
  const [mode, setMode] = useState("userLogin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const adminExists = users.some((u) => u.role === "admin");

    if (!adminExists) {
      users.push({
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
      });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    const width = window.innerWidth;
    if (width < 640) setDeviceType("mobile");
    else if (width < 1024) setDeviceType("tablet");
    else setDeviceType("desktop");
  }, []);

  const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      setMessage("User not found. Please register.");
      return;
    }

    if (user.role !== "user") {
      setMessage("This is an admin account. Use Admin Login.");
      return;
    }

    if (user.password !== password) {
      setMessage("Incorrect password");
      return;
    }

    onLogin({ email: user.email, role: "user" });
    setMessage("");
  };

  const handleUserRegister = (e) => {
    e.preventDefault();
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      setMessage("User already exists.");
      return;
    }

    saveUser({ email, password, role: "user" });
    onLogin({ email, role: "user" });
    setMessage("");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const admin = users.find(
      (u) => u.email === email && u.role === "admin"
    );

    if (!admin) {
      setMessage("Admin account not found");
      return;
    }

    if (admin.password !== password) {
      setMessage("Incorrect admin password");
      return;
    }

    onLogin({ email: admin.email, role: "admin" });
    setMessage("");
  };

  const handleForgot = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find((u) => u.email === forgotEmail);

    if (!user) {
      setMessage("Email not registered");
      return;
    }

    setMessage(`Password reset link sent to ${forgotEmail} (mock only)`);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setForgotEmail("");
    setMessage("");
    setShowPassword(false);
  };

  const switchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const getDeviceIcon = () => {
    switch (deviceType) {
      case "mobile": return <Smartphone className="w-4 h-4" />;
      case "tablet": return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const renderForm = () => {
    const isMobile = deviceType === "mobile";
    
    switch (mode) {
      case "userLogin":
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LogIn className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-bold">User Login</h2>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded">
                {getDeviceIcon()}
                <span className="hidden sm:inline">{deviceType}</span>
              </div>
            </div>
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Sign In
              </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-4">
              <button 
                onClick={() => switchMode("userRegister")}
                className="text-purple-400 hover:text-purple-300 text-sm py-2 rounded border border-purple-400/20 hover:border-purple-400/40 transition-colors"
              >
                Create Account
              </button>
              <button 
                onClick={() => switchMode("forgot")}
                className="text-neutral-400 hover:text-neutral-300 text-sm py-2 rounded border border-neutral-400/20 hover:border-neutral-400/40 transition-colors"
              >
                Forgot Password?
              </button>
              <button 
                onClick={() => switchMode("adminLogin")}
                className="text-neutral-400 hover:text-neutral-300 text-sm py-2 rounded border border-neutral-400/20 hover:border-neutral-400/40 transition-colors"
              >
                Admin Access
              </button>
            </div>
          </>
        );

      case "userRegister":
        return (
          <>
            <div className="flex items-center gap-2 mb-6">
              <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold">Create Account</h2>
            </div>
            <form onSubmit={handleUserRegister} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base pr-10"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Minimum 6 characters
                </p>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Create Account
              </button>
            </form>
            <button 
              onClick={() => switchMode("userLogin")}
              className="w-full mt-4 text-neutral-400 hover:text-neutral-300 text-sm py-2 rounded border border-neutral-400/20 hover:border-neutral-400/40 transition-colors"
            >
              Back to Login
            </button>
          </>
        );

      case "adminLogin":
        return (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold">Admin Login</h2>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Admin Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Admin Login
              </button>
            </form>
            <button 
              onClick={() => switchMode("userLogin")}
              className="w-full mt-4 text-neutral-400 hover:text-neutral-300 text-sm py-2 rounded border border-neutral-400/20 hover:border-neutral-400/40 transition-colors"
            >
              User Login
            </button>
          </>
        );

      case "forgot":
        return (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold">Reset Password</h2>
            </div>
            <form onSubmit={handleForgot} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Registered Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  required
                />
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Send Reset Link
              </button>
            </form>
            <button 
              onClick={() => switchMode("userLogin")}
              className="w-full mt-4 text-neutral-400 hover:text-neutral-300 text-sm py-2 rounded border border-neutral-400/20 hover:border-neutral-400/40 transition-colors"
            >
              Back to Login
            </button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white p-3 sm:p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-800/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-neutral-700/50">

          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <Film className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-purple-500">Zom</span>
              <span className="text-white">ovies</span>
            </h1>
          </div>
          
          {renderForm()}
          
          {message && (
            <div className="mt-4 p-3 rounded-lg bg-yellow-600/20 border border-yellow-600/30">
              <p className="text-yellow-300 text-sm text-center">{message}</p>
            </div>
          )}
          
          <div className="mt-6 sm:mt-8 pt-6 border-t border-neutral-700/50">
            <p className="text-center text-xs sm:text-sm text-neutral-400">
              Demo Credentials
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="text-center">
                <p className="text-xs text-purple-400 font-medium">Admin</p>
                <p className="text-xs text-neutral-400">admin@gmail.com</p>
                <p className="text-xs text-neutral-500">admin123</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-purple-400 font-medium">Users</p>
                <p className="text-xs text-neutral-400">Any email</p>
                <p className="text-xs text-neutral-500">Any password</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-neutral-500">
            Optimized for {deviceType} ({window.innerWidth}px)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;