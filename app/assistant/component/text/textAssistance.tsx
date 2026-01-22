"use client";

import { useState, useRef, useEffect } from "react";
import {
  BarChart3,
  ClipboardEdit,
  AlertTriangle,
  PieChart,
  LineChart,
  Bot,
  Mic,
  Send,
} from "lucide-react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useMasterContext, Message } from "../../context/AgentContext";

export default function TextPage() {
  const { currentTextConversation, setCurrentTextConversation } = useMasterContext();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = currentTextConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickActions = [
    {
      label: "DIC Status",
      desc: "View real-time device health",
      prompt: "List the total count of DIC devices",
      icon: BarChart3,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      label: "Feedback Overview",
      desc: "NEA feedback",
      prompt: "List top 5 feedback for Sep 1, 2025",
      icon: ClipboardEdit,
      color: "#4f46e5",
      bg: "#eef2ff",
    },
    {
      label: "Defect Notices",
      desc: "Insights",
      prompt: "List top 5 defect notices",
      icon: AlertTriangle,
      color: "#d97706",
      bg: "#fffbeb",
    },
    {
      label: "Defect Notice Chart",
      desc: "Visual charts",
      prompt: "Generate pie chart of defect notices",
      icon: PieChart,
      color: "#e11d48",
      bg: "#fff1f2",
    },
    {
      label: "DIC Chart Data",
      desc: "Visual device levels",
      prompt: "Generate pie chart with DIC data",
      icon: LineChart,
      color: "#059669",
      bg: "#ecfdf5",
    },
  ];

  const onSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { role: "user", message: text };
    const conversationId = currentTextConversation?.conversation_id || `conv_${Date.now()}`;
    const updatedMessages = [...messages, newUserMsg];

    setCurrentTextConversation(conversationId, updatedMessages);
    setInput("");

    // Simple demo response
    setTimeout(() => {
      const aiMsg: Message = { role: "ai", message: "This is a demo response to your query: " + text };
      setCurrentTextConversation(conversationId, [...updatedMessages, aiMsg]);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        position: "relative",
        bgcolor: "white",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 4, display: "flex", flexDirection: "column" }}>
        {messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 10,
            }}
          >
            {/* Centered Bot Icon */}
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                bgcolor: "#DBEAFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
              }}
            >
              <Bot size={40} color="#2563EB" />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: "#111827" }}>
              How can I help you today?
            </Typography>
            <Typography variant="body1" sx={{ color: "#6B7280", mb: 6 }}>
              Start a conversation or select a quick action.
            </Typography>

            {/* Quick Actions Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" },
                gap: 2,
                width: "100%",
                maxWidth: "1100px",
              }}
            >
              {quickActions.map((action, idx) => (
                <Paper
                  key={idx}
                  onClick={() => onSendMessage(action.prompt)}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: action.color,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      bgcolor: action.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <action.icon size={20} color={action.color} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: action.color, mb: 0.5 }}>
                    {action.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", display: "block" }}>
                    {action.desc}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    borderRadius: msg.role === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
                    bgcolor: msg.role === "user" ? "#2563EB" : "#F3F4F6",
                    color: msg.role === "user" ? "white" : "#111827",
                  }}
                >
                  <Typography variant="body1">{msg.message}</Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      {/* Bottom Chat Input */}
      <Box sx={{ p: 3, borderTop: "1px solid #E5E7EB" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSendMessage(input)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#F9FAFB",
              "& fieldset": { borderColor: "#E5E7EB" },
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" sx={{ mr: 1, color: "#6B7280", bgcolor: "#F3F4F6" }}>
                    <Mic size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onSendMessage(input)}
                    disabled={!input.trim()}
                    sx={{
                      color: input.trim() ? "white" : "#9CA3AF",
                      bgcolor: input.trim() ? "#2563EB" : "transparent",
                      "&:hover": { bgcolor: "#1D4ED8" },
                    }}
                  >
                    <Send size={18} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
