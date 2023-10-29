"use client";
import Link from "next/link";
import React, {useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const respones = await axios.post("api/users/signup", user);
      console.log("Signup successful", respones.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-6 text-6xl">
        {loading ? "processing" : "Signup Page - NextJs"}
      </h1>
      <hr />
      <label className="mb-2" htmlFor="username">
        username
      </label>
      <input
        id="usename"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="usename"
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      <label className="mb-2" htmlFor="email">
        email
      </label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      <label className="mb-2" htmlFor="password">
        password
      </label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Signup" : "Signup here"}
      </button>
      <Link href={"/login"}>[Visit Login Page from here]</Link>
    </div>
  );
}
