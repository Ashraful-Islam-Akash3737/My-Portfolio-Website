"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Zap,
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Paperclip,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  customProjectType: string;
  budget: string;
  customBudget: string;
  subject: string;
  message: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: EASE, delay },
});

const fieldClass =
  "bg-surface border border-border rounded-xl px-4 py-3 w-full text-foreground font-mono text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-secondary/40";

const selectFieldClass = `${fieldClass} cursor-pointer text-foreground/70 [&>option]:bg-surface [&>option]:text-foreground`;

const labelClass =
  "block text-xs font-semibold text-secondary/80 mb-1.5 tracking-wide";

const infoRows = [
  {
    icon: Mail,
    label: "Email",
    value: "abirashrafulislamabir@gmail.com",
    href: "mailto:abirashrafulislamabir@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
  {
    icon: Zap,
    label: "Status",
    value: "Available for projects",
    href: null,
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "General Inquiry",
    customProjectType: "",
    budget: "N/A",
    customBudget: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const hasSupabase =
        !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_url_here";
      
      const maxLimit = hasSupabase ? 10 * 1024 * 1024 : 2 * 1024 * 1024;
      if (file.size > maxLimit) {
        alert(
          hasSupabase
            ? "File size exceeds 10MB limit. Please upload a smaller file."
            : "File size exceeds 2MB limit. To upload files up to 10MB, configure Supabase Storage in .env.local."
        );
        return;
      }
      setAttachment(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    try {
      const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
      
      const finalProjectType = form.projectType === "Other" ? form.customProjectType : form.projectType;
      const finalBudget = form.budget === "Custom" ? form.customBudget : form.budget;

      let attachmentUrl = "";
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const isSupabaseConfigured =
        !!supabaseUrl &&
        supabaseUrl !== "your_supabase_url_here" &&
        !!supabaseKey &&
        supabaseKey !== "your_supabase_anon_key_here";

      if (attachment && isSupabaseConfigured) {
        const cleanName = attachment.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const fileName = `${Date.now()}_${cleanName}`;
        const uploadUrl = `${supabaseUrl}/storage/v1/object/portfolio-attachments/${fileName}`;

        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${supabaseKey}`,
            "apikey": supabaseKey,
            "Content-Type": attachment.type
          },
          body: attachment
        });

        if (!uploadResponse.ok) {
          const errData = await uploadResponse.json().catch(() => ({}));
          console.error("Supabase upload error:", errData);
          throw new Error("Failed to upload attachment to Supabase Storage.");
        }

        attachmentUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-attachments/${fileName}`;
      }

      const formData = new FormData();
      formData.append("access_key", key);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("project_type", finalProjectType);
      formData.append("estimated_budget", finalBudget);
      formData.append("subject", `💼 Portfolio: [${finalProjectType}] ${form.subject || "New Message"}`);
      
      if (attachmentUrl) {
        formData.append("message", `${form.message}\n\n---\n📎 Attached Document (Supabase): ${attachmentUrl}`);
      } else {
        formData.append("message", form.message);
      }

      formData.append("from_name", `${form.name} via Portfolio`);
      formData.append("replyto", form.email);
      formData.append("title", "New Contact Form Submission");

      if (attachment && !attachmentUrl) {
        formData.append("attachment", attachment);
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);

        const rect = submitRef.current?.getBoundingClientRect();
        const originX = rect
          ? (rect.left + rect.width / 2) / window.innerWidth
          : 0.5;
        const originY = rect ? rect.top / window.innerHeight : 0.85;

        confetti({
          particleCount: 120,
          spread: 80,
          startVelocity: 45,
          origin: { x: originX, y: originY },
          colors: ["#22d3ee", "#818cf8", "#f1f5f9", "#6ee7f7", "#c4b5fd"],
          scalar: 0.9,
        });

        setForm({
          name: "",
          email: "",
          projectType: "General Inquiry",
          customProjectType: "",
          budget: "N/A",
          customBudget: "",
          subject: "",
          message: "",
        });
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(result.message || "Something went wrong. Please check if your Access Key is correct.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Failed to send message. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none -z-10" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <motion.div {...fadeUp(0)} className="flex justify-center mb-4">
          <span className="section-tag">
            <Mail size={10} />
            Contact
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
            {"Let's Build Something"}
            <br />
            <span className="text-gradient">Great Together</span>
          </h2>
          <p className="mt-4 text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have a project, idea, or just want to say hi? Drop me a message
            and I will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <motion.div {...fadeUp(0.12)} className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-snug">
                Ready to turn your vision
                <br />
                into reality?
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                I specialize in building clean, performant, and visually
                stunning web experiences. Whether it is a SaaS dashboard,
                marketing site, or complex React app, I have got you covered.
              </p>
            </div>

            <div className="space-y-5">
              {infoRows.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.18 + i * 0.07 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-card/60 border border-border flex items-center justify-center text-accent group-hover:border-accent/30 transition-colors">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-foreground hover:text-accent transition-colors truncate block font-mono"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-foreground font-mono">
                        {value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="separator" />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-4">
                Find me online
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-card/60 border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="lg:col-span-7">
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-7 sm:p-10 relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-purple/5 rounded-full blur-[60px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="projectType" className={labelClass}>Inquiry / Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className={selectFieldClass}
                    >
                      <option value="General Inquiry">General Inquiry / Say Hi</option>
                      <option value="Full-Time Position">Full-Time Position</option>
                      <option value="Freelance / Contract">Freelance / Contract</option>
                      <option value="Collaboration">Collaboration / Partnership</option>
                      <option value="Other">Other (Specify...)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClass}>Estimated Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={selectFieldClass}
                    >
                      <option value="N/A">N/A (Job Offer / General)</option>
                      <option value="Under $1,000">Under $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                      <option value="Custom">Custom Budget...</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {form.projectType === "Other" ? (
                    <div>
                      <label htmlFor="customProjectType" className={labelClass}>Specify Project Type</label>
                      <input
                        type="text"
                        id="customProjectType"
                        name="customProjectType"
                        value={form.customProjectType}
                        onChange={handleChange}
                        placeholder="e.g. Code Audit, Consulting"
                        className={fieldClass}
                        required
                      />
                    </div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {form.budget === "Custom" ? (
                    <div>
                      <label htmlFor="customBudget" className={labelClass}>Enter Custom Budget</label>
                      <input
                        type="text"
                        id="customBudget"
                        name="customBudget"
                        value={form.customBudget}
                        onChange={handleChange}
                        placeholder="e.g. $10,000 or Hourly rate"
                        className={fieldClass}
                        required
                      />
                    </div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="subject" className={labelClass}>Subject</label>
                    <input
                      required
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry..."
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Attachment (Max {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_url_here" ? "10MB" : "2MB"})
                    </label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-surface border border-border border-dashed rounded-xl px-4 w-full h-[46px] flex items-center justify-between cursor-pointer hover:border-accent/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="shrink-0 text-secondary/60">
                          <Paperclip size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          {attachment ? (
                            <p className="text-xs font-mono font-medium text-foreground truncate">
                              {attachment.name}
                            </p>
                          ) : (
                            <p className="text-xs font-mono text-secondary/40 truncate">
                              Upload document (PDF, PNG)...
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {attachment ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAttachment(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="shrink-0 w-6 h-6 rounded-lg hover:bg-card border border-transparent hover:border-border flex items-center justify-center text-secondary hover:text-accent transition-colors"
                        >
                          <X size={12} />
                        </button>
                      ) : (
                        <span className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                          Browse
                        </span>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={fieldClass + " resize-none"}
                  />
                </div>

                <motion.button
                  ref={submitRef}
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="bg-gradient-neon w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-background font-bold text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-card/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-5 p-8 text-center z-20"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent"
                  >
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                    <p className="text-secondary text-sm leading-relaxed max-w-xs">
                      Thanks for reaching out. I will get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-secondary hover:text-accent transition-colors underline underline-offset-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}