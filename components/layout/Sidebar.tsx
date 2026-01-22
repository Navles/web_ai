"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  FileText,
  Settings,
  Bot,
  MapPin,
  Sparkles,
  Bell,
  Wrench,
  ShieldCheck,
  ChevronLeft,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { theme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  FileText,
  Settings,
  Bot,
  MapPin,
  Sparkles,
  Bell,
  Wrench,
  ShieldCheck,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isLoggedIn");
      router.push("/");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col border-r transition-transform duration-300 z-50 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          width: theme.spacing.sidebar.width,
          backgroundColor: theme.colors.sidebar.bg,
          borderColor: theme.colors.sidebar.border,
        }}
      >
        {/* Logo Section */}
        <div
          className="flex items-center justify-between px-6 border-b"
          style={{
            height: theme.spacing.header.height,
            borderColor: theme.colors.sidebar.border,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 ">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-12 h-12  backdrop-blur-2xl  flex items-center justify-center  relative overflow-hidden group shrink-0"
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
                <img src="./ctm-01.png" alt="logo" className="w-12 h-12 z-10 " />
                <div className="absolute inset-0  border border-blue-400/20 pointer-events-none" />
              </motion.div>
            </div>
            <h1
              className="text-lg font-bold tracking-wider font-heading"
              style={{ color: "#ffffff" }}
            >
              CTM
            </h1>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors md:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => onClose()} // Close sidebar on mobile when link clicked
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                      isActive ? "shadow-lg" : ""
                    )}
                    style={{
                      backgroundColor: isActive
                        ? theme.colors.sidebar.active
                        : "transparent",
                      color: isActive ? "#ffffff" : theme.colors.sidebar.text,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          theme.colors.sidebar.bgHover;
                        e.currentTarget.style.color =
                          theme.colors.sidebar.textHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = theme.colors.sidebar.text;
                      }
                    }}
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className="text-[13px] font-medium">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div
          className="border-t p-4 flex flex-col gap-4"
          style={{
            borderColor: theme.colors.sidebar.border,
          }}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10 w-full group"
          >
            <LogOut className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-[13px] font-medium">Logout</span>
          </button>


        </div>
      </aside>
    </>
  );
}
