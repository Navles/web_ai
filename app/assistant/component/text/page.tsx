import { useState, useRef, useEffect } from "react";
import TextAssistance from "./textAssistance";

export default function ChatAssistance() {
  // const router = useNavigate();

  // const [tokenData, setTokenData] = useState<string | null>(null);

  // useEffect(() => {
  //   var tokenData: string | null = sessionStorage.getItem("accessToken");
  //   console.log("tokenData", tokenData);
  //   if (tokenData) {
  //     setTokenData(tokenData);
  //   } else {
  //     router("/");
  //   }
  // }, []);

  // if (tokenData) {
  return <TextAssistance />;
  // } else {
  //   return null;
  // }
}
