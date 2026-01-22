"use client";

import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { PhoneOff, Send, Mic } from "lucide-react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";

// Import your Lottie animations
import AiLoading from "../../../lottieJson/AI_logo_Foriday.json";
import Loading_loop from "../../../lottieJson/Loading_loop_animation.json";
import { useMasterContext, Message } from "../../context/AgentContext";

export default function VoiceAgent() {
  const { currentTextConversation, setCurrentTextConversation } = useMasterContext();
  const [isConnected, setIsConnected] = useState(false);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "listening" | "speaking">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = currentTextConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConnection = () => {
    setStatus("connecting");
    setTimeout(() => {
      setIsConnected(true);
      setStatus("listening");
      // Initial greeting
      const conversationId = currentTextConversation?.conversation_id || `conv_${Date.now()}`;
      const greeting: Message = { role: "ai", message: "Hello! How can I assist you today?" };
      setCurrentTextConversation(conversationId, [greeting]);
    }, 1500);
  };

  const disconnect = () => {
    setIsConnected(false);
    setStatus("idle");
    setIsSpeaking(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = { role: "user", message: input };
    const conversationId = currentTextConversation?.conversation_id || `conv_${Date.now()}`;
    const updatedMessages = [...messages, newUserMsg];

    setCurrentTextConversation(conversationId, updatedMessages);
    setInput("");
    setStatus("speaking");
    setIsSpeaking(true);

    setTimeout(() => {
      const aiMsg: Message = { role: "ai", message: "This is a demo response from the Voice Assistant. I process your voice in real-time." };
      setCurrentTextConversation(conversationId, [...updatedMessages, aiMsg]);
      setStatus("listening");
      setIsSpeaking(false);
    }, 2000);
  };

  const getStatusText = () => {
    switch (status) {
      case "connecting": return "Connecting...";
      case "connected": return "Connected";
      case "listening": return "Listening...";
      case "speaking": return "Speaking...";
      default: return "Start Voice Assistant";
    }
  };

  return (
    <Box sx={{ height: "80vh", width: "100%", display: "flex", bgcolor: "white", borderRadius: "16px", overflow: "hidden" }}>
      {/* Left Panel - Animation Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#F9FAFB",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative", width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Lottie
            animationData={isConnected ? AiLoading : Loading_loop}
            loop
            autoplay
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />

          <Button
            onClick={isConnected ? undefined : startConnection}
            variant="contained"
            sx={{
              position: "relative",
              zIndex: 10,
              px: 4,
              py: 1.5,
              bgcolor: "white",
              color: "#111827",
              fontWeight: 600,
              borderRadius: "999px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              textTransform: "none",
              "&:hover": { bgcolor: "#f3f4f6" },
              display: isConnected ? "none" : "flex",
            }}
          >
            {getStatusText()}
          </Button>
        </Box>

        {isConnected && (
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              {getStatusText()}
            </Typography>
            <Button
              onClick={disconnect}
              startIcon={<PhoneOff size={20} />}
              sx={{
                px: 3,
                py: 1,
                bgcolor: "black",
                color: "white",
                borderRadius: "999px",
                textTransform: "none",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              End Chat
            </Button>
          </Box>
        )}
      </Box>

      {/* Right Panel - Conversation */}
      <Box sx={{ width: "400px", display: "flex", flexDirection: "column", borderLeft: "1px solid #E5E7EB" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #E5E7EB" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Conversation</Typography>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {messages.length === 0 ? (
            <Typography variant="body2" sx={{ color: "#6B7280", textAlign: "center", mt: 4 }}>
              Start the voice assistant to begin...
            </Typography>
          ) : (
            messages.map((msg, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    maxWidth: "85%",
                    borderRadius: msg.role === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
                    bgcolor: msg.role === "user" ? "#2563EB" : "#F3F4F6",
                    color: msg.role === "user" ? "white" : "#111827",
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                </Paper>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        {isConnected && (
          <Box sx={{ p: 3, borderTop: "1px solid #E5E7EB" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Talk to reply..."
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#F9FAFB",
                }
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={sendMessage} disabled={!input.trim()} sx={{ color: "#2563EB" }}>
                      <Send size={18} />
                    </IconButton>
                  )
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
