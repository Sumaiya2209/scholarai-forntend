"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Fields";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { signIn, signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    const { error: authError } = await signUp.email({ name, email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message || "Could not create your account");
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleGoogleSignup() {
    await signIn.social({ provider: "google", callbackURL: "/" });
  }

  return (

    <div className="mx-auto my-15 max-w-sm rounded-xl border border-parchment-line bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
        <Input label="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="mt-1 w-full">
          {loading ? "Creating account…" : "Sign up"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-parchment-line" />
        <span className="text-[12px] text-ink-faint">or</span>
        <div className="h-px flex-1 bg-parchment-line" />
      </div>

      <button
        onClick={handleGoogleSignup}
        className="flex w-full items-center justify-center gap-2.5 rounded-md border border-parchment-line bg-white py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="mt-7 text-center text-[13px] text-ink-faint">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-navy hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}