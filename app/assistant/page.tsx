"use client";

import { useState } from "react";
import { Box, Button, Modal, Typography, Paper, IconButton } from "@mui/material";
import { Chat, History, Close } from "@mui/icons-material";
import TextPage from "./component/text/textAssistance";
import VoiceAgent from "./component/voice/voiceAssistant";
import { useMasterContext } from "./context/AgentContext";

function MyTextComponent() {
    return (
        <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
            <TextPage />
        </Box>
    );
}

function MyVoiceComponent() {
    return (
        <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
            <VoiceAgent />
        </Box>
    );
}

export default function AiAssistance() {
    const [mode, setMode] = useState<"text" | "voice">("text");
    const [openModal, setOpenModal] = useState(false);
    const { setCurrentTextConversation, setHistory1 } = useMasterContext();

    const toggleMode = () => {
        setCurrentTextConversation(null, []);
        setHistory1([]);
        setMode((prev) => (prev === "text" ? "voice" : "text"));
    };

    const handleHistoryClick = () => {
        setOpenModal(true);
    };

    // Dummy history for demo
    const dummyHistory = [
        { id: 1, title: "DIC Device Status Check", date: "2 hours ago" },
        { id: 2, title: "NEA Feedback Summary", date: "Yesterday" },
        { id: 3, title: "Defect Notice Analysis", date: "Jan 20, 2026" },
    ];

    return (
        <Box
            sx={{
                p: 3,
                position: "relative",
                minHeight: "100vh",
                backgroundColor: "white",
            }}
        >
            {/* Top Right Header Buttons */}
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 30,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    zIndex: 1000,
                }}
            >
                <Button
                    variant="contained"
                    onClick={toggleMode}
                    sx={{
                        px: 3,
                        py: 1,
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    {mode === "text" ? "Voice" : "Text"}
                </Button>

                <IconButton
                    onClick={handleHistoryClick}
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "8px",
                        p: 1.2,
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    <Chat />
                </IconButton>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ mt: 2 }}>
                {mode === "text" ? <MyTextComponent /> : <MyVoiceComponent />}
            </Box>

            {/* History Modal (Slide out Sidebar) */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: { xs: "85%", sm: "350px" },
                        height: "100vh",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 0,
                        outline: "none",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ p: 2.5, borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" fontWeight={700}>
                            Conversation History
                        </Typography>
                        <IconButton onClick={() => setOpenModal(false)} size="small">
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            {dummyHistory.map((item) => (
                                <Paper
                                    key={item.id}
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: "12px",
                                        border: "1px solid #E5E7EB",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                            bgcolor: "#F9FAFB",
                                            borderColor: "#2563EB"
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                        {item.date}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
