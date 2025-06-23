"use client";

import { useSearchParams } from "next/navigation";
import SignUp from "./auth/signup/page";
import Login from "./auth/login/page";

export default function Home() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <div className="relative min-h-screen">
      {view === "signup" ? <SignUp /> : <Login />}
    </div> 
      
  );
}