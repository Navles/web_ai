"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
  role: "user" | "ai";
  message: string;
  images?: string[];
  author?: string;
  isAction?: boolean;
  status?: "pending" | "completed" | "error";
  actionType?: "call" | "response" | "transfer";
  actionId?: string;
  turnId?: string;
  isPartial?: boolean;
}

export interface Conversation {
  conversation_id: string;
  messages: Message[];
  call_title_summary: string;
}

export interface MasterContextData {
  voice: Conversation[];
  text: Conversation[];
  history1: any[];
  setHistory1: (conversation: any[]) => void;
  currentTextConversation: {
    conversation_id: string;
    messages: Message[];
  } | null;
  addTextConversation: (conversation: Conversation) => void;
  updateTextConversation: (
    conversationId: string,
    updates: Partial<Conversation>
  ) => void;
  setCurrentTextConversation: (
    conversationId: string | null,
    messages?: Message[]
  ) => void;
  clearAllContext: () => void;
}

const MasterContext = createContext<MasterContextData | undefined>(undefined);

export const useMasterContext = () => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error(
      "useMasterContext must be used within a MasterContextProvider"
    );
  }
  return context;
};

interface MasterContextProviderProps {
  children: ReactNode;
}

export const MasterContextProvider: React.FC<MasterContextProviderProps> = ({
  children,
}) => {
  const [voice, setVoice] = useState<Conversation[]>([]);
  const [text, setText] = useState<Conversation[]>([]);
  const [history1, setHistory1] = useState<any[]>([]);
  const [currentTextConversation, setCurrentTextConversation] = useState<{
    conversation_id: string;
    messages: Message[];
  } | null>({ conversation_id: "", messages: [] });

  const addTextConversation = (conversation: Conversation) => {
    setText((prev) => [...prev, conversation]);
  };

  const updateTextConversation = (
    conversationId: string,
    updates: Partial<Conversation>
  ) => {
    setText((prev) =>
      prev.map((conv) =>
        conv.conversation_id === conversationId ? { ...conv, ...updates } : conv
      )
    );
  };

  const setCurrentTextConversationData = (
    conversationId: string | null,
    messages: Message[] = []
  ) => {
    if (conversationId === null) {
      setCurrentTextConversation(null);
    } else {
      setCurrentTextConversation({ conversation_id: conversationId, messages });
    }
  };

  const clearAllContext = () => {
    setText([]);
    setVoice([]);
    setHistory1([]);
    setCurrentTextConversation({ conversation_id: "", messages: [] });
  };

  const value: MasterContextData = {
    voice,
    text,
    history1,
    setHistory1,
    currentTextConversation,
    addTextConversation,
    updateTextConversation,
    setCurrentTextConversation: setCurrentTextConversationData,
    clearAllContext,
  };

  return (
    <MasterContext.Provider value={value}>{children}</MasterContext.Provider>
  );
};
