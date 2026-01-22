import { useState, useRef, useEffect } from "react";
import VoiceAgent from "./voiceAssistant";
import { useNavigate } from "react-router-dom";

export default function VoiceAssistance() {
  const [tokenData, setTokenData] = useState<string | null>(null);

  const router = useNavigate();
  useEffect(() => {
    var tokenData: string | null = sessionStorage.getItem("accessToken");
    if (tokenData) {
      setTokenData(tokenData);
    } else {
      router("/");
    }
  }, []);

  if (tokenData) {
    return <VoiceAgent />;
  } else {
    return null;
  }
}
