"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import Card from "@/components/common/Card";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        // Basic login simulation
        console.log("Logging in with:", email);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success! Save "auth" state (for demo purposes)
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } catch (error) {
        console.error("Login Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen flex relative overflow-hidden bg-[#0A3776]">
      {/* Global Background Gradient & Decorative Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3776] via-[#0A3776] to-[#1e40af]" />
        
        {/* Decorative Circular Elements (Matching Reference Image) */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] right-[10%] w-[80%] h-[80%] border border-white/10 rounded-full"
        />
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] border border-white/5 rounded-full" />
      </div>

      {/* Left side: branding and animation */}
      <div className="hidden lg:flex flex-1 relative z-10 items-center justify-center p-12">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Massive background ALIX text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
          >
            <span className="text-[14rem] font-black tracking-tighter text-white pb-40">
              ALIX
            </span>
          </motion.div>

          {/* Hero Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Restored Animated Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-12 inline-block"
            >
            </motion.div>

            {/* Hero Robot Image Overlapping Background Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mb-10"
            >
              <img 
                src="/footer-image.png" 
                alt="ALIX Robot" 
                className="w-full max-w-lg h-auto drop-shadow-[0_80px_80px_rgba(0,0,0,0.6)] z-20 relative"
              />
              {/* Ambient glow around robot */}
              <div className="absolute inset-0 bg-blue-500/20 blur-[120px] -z-10" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg flex flex-col items-stretch"
        >
          {/* Header with Text and Logo */}
          <div className="flex flex-row items-center justify-between mb-12 px-2">
            <div className="flex flex-col text-left">
              <h2 className="text-5xl font-extrabold text-white mb-3 tracking-tight">Welcome Back</h2>
              <p className="text-blue-100/70 font-semibold text-xl">Please sign in to your account</p>
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-32 h-32 bg-blue-400/10 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.3)] relative overflow-hidden group shrink-0"
            >
              <motion.div
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  repeatDelay: 3,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-0"
              />
              <img src="/logo.png" alt="logo" className="w-20 h-20 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              <div className="absolute inset-0 rounded-[2.5rem] border border-blue-400/20 pointer-events-none" />
            </motion.div>
          </div>

          <Card className="bg-white border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3),0_30px_60px_-30px_rgba(0,0,0,0.35),0_-18px_60px_-10px_rgba(255,255,255,0.05)] rounded-[2.5rem] p-12 md:p-14">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] ml-1 -mt-0.5 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  icon={<Mail size={18} className="text-blue-500" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  className="h-16 border-slate-200 bg-slate-50/80 rounded-2xl transition-all font-normal text-slate-700 text-lg placeholder:text-slate-300 shadow-sm"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-500 font-semibold ml-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] -mt-0.5 block">Password</label>
                  <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    icon={<Lock size={18} className="text-blue-500" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    className="h-16 border-slate-200 bg-slate-50/80 rounded-2xl transition-all font-normal text-slate-700 text-lg pr-12 placeholder:text-slate-300 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-500 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-500 font-semibold ml-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                className="w-full h-16 text-lg font-bold tracking-wide bg-gradient-to-r from-[#0A3776] to-[#1e40af] border-none hover:shadow-2xl hover:shadow-blue-500/20 transition-all rounded-2xl shadow-xl shadow-blue-900/40 active:scale-[0.98] group"
                isLoading={loading}
              >
                {!loading && (
                  <div className="flex items-center justify-center gap-3">
                    <span className="tracking-[0.05em]">Sign In</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
      
    </div>
  );
};

export default LoginPage;
