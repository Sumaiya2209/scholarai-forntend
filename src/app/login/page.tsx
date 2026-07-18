"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Fields";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { signIn } from "@/lib/auth-client";

const DEMO_EMAIL = "demo@scholarai.com";
const DEMO_PASSWORD = "Demo1234!";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent, loginEmail = email, loginPassword = password) {
    e.preventDefault();
    setError("");

    if (!loginEmail || !loginPassword) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    const { error: authError } = await signIn.email({ email: loginEmail, password: loginPassword });
    setLoading(false);

    if (authError) {
      setError(authError.message || "Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  function handleDemoLogin(e: FormEvent) {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    handleLogin(e, DEMO_EMAIL, DEMO_PASSWORD);
  }

  async function handleGoogleLogin() {
    await signIn.social({ provider: "google", callbackURL: "/" });
  }

  return (
    <div className="mx-auto my-15 max-w-sm rounded-xl border border-parchment-line bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="mt-1 w-full">
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-parchment-line" />
        <span className="text-[12px] text-ink-faint">or</span>
        <div className="h-px flex-1 bg-parchment-line" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2.5 rounded-md border border-parchment-line bg-white py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="mt-7 text-center text-[13px] text-ink-faint">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-navy hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}