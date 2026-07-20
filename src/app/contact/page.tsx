"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Input, TextArea } from "@/components/ui/Fields";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate sending email (in production, you'd call an API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white py-16">
      <Container className="max-w-2xl">
        <div className="space-y-8">
          <div>
            <h1 className="mb-2 font-display text-4xl font-bold text-ink">Get in Touch</h1>
            <p className="text-ink-faint">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {submitted && (
                <div className="mb-6 rounded-lg border border-green-500 bg-green-50 p-4 text-sm text-green-700">
                  ✓ Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  disabled={isLoading}
                />

                <TextArea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  disabled={isLoading}
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-display font-semibold text-ink">Email</h3>
                <a href="mailto:hello@scholarai.com" className="text-amber hover:text-amber/80">
                  sumaiyajannat2209@gmail.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 font-display font-semibold text-ink">Support</h3>
                <p className="text-sm text-ink-muted mb-2">Need help? Check out our FAQ or reach out to support.</p>
                <a href="mailto:support@scholarai.com" className="text-amber hover:text-amber/80">
                  jannatsumaiya199@gmail.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 font-display font-semibold text-ink">Response Time</h3>
                <p className="text-sm text-ink-muted">We typically respond within 24-48 business hours.</p>
              </div>

              <div className="rounded-lg border border-parchment-line bg-parchment p-4">
                <h3 className="mb-2 font-semibold text-ink text-sm">Quick Links</h3>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <li>
                    <a href="/explore" className="text-amber hover:text-amber/80">
                      Browse Papers
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-amber hover:text-amber/80">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="text-amber hover:text-amber/80">
                      Sign In
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
