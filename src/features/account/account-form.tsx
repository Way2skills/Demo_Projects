"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import styles from "./account-form.module.css";

type AccountFormProps = {
  mode: "sign-in" | "create-account";
};

type AuthMethod = "email" | "phone";

function Field({
  children,
  icon,
  label,
}: {
  children: ReactNode;
  icon: ReactNode;
  label: string;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.inputWrap}>
        {icon}
        {children}
      </span>
    </label>
  );
}

function PasswordField({
  action,
  autoComplete,
  label,
  minLength,
  onChange,
  placeholder,
  reveal,
  setReveal,
}: {
  action?: ReactNode;
  autoComplete: string;
  label: string;
  minLength?: number;
  onChange?: () => void;
  placeholder: string;
  reveal: boolean;
  setReveal: (reveal: boolean) => void;
}) {
  const fieldId = `account-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div className={styles.field}>
      <div className={styles.fieldHeading}>
        <label className={styles.fieldLabel} htmlFor={fieldId}>
          {label}
        </label>
        {action}
      </div>
      <span className={styles.inputWrap}>
        <LockKeyhole aria-hidden="true" className={styles.fieldIcon} size={19} />
        <input
          autoComplete={autoComplete}
          id={fieldId}
          minLength={minLength}
          name={label.toLowerCase().replaceAll(" ", "-")}
          onChange={onChange}
          placeholder={placeholder}
          required
          type={reveal ? "text" : "password"}
        />
        <button
          aria-label={reveal ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className={styles.visibilityButton}
          onClick={() => setReveal(!reveal)}
          type="button"
        >
          {reveal ? (
            <EyeOff aria-hidden="true" size={19} />
          ) : (
            <Eye aria-hidden="true" size={19} />
          )}
        </button>
      </span>
    </div>
  );
}

export default function AccountForm({ mode }: AccountFormProps) {
  const isSignIn = mode === "sign-in";
  const [method, setMethod] = useState<AuthMethod>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recoveringPassword, setRecoveringPassword] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (
      !isSignIn &&
      method === "email" &&
      formData.get("password") !== formData.get("confirm-password")
    ) {
      setFeedback("Your passwords do not match. Please check and try again.");
      return;
    }

    setFeedback(
      recoveringPassword
        ? "Password recovery is not available yet because account services are not connected."
        : "Account access is not available yet because authentication services are not connected.",
    );
  }

  function changeMethod(nextMethod: AuthMethod) {
    setMethod(nextMethod);
    setFeedback("");
  }

  return (
    <main className={styles.page}>
      <section aria-labelledby="account-title" className={styles.card}>
        <Link aria-label="Return to the Nool & Zari homepage" className={styles.backLink} href="/">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to the atelier
        </Link>

        <header className={styles.heading}>
          <p className={styles.eyebrow}>Nool &amp; Zari · Atelier account</p>
          <h1 id="account-title">
            {recoveringPassword
              ? "Reset your password"
              : isSignIn
                ? "Welcome back"
                : "Create your account"}
          </h1>
          <p>
            {recoveringPassword
              ? "Enter the email address linked to your account."
              : isSignIn
                ? "Pick up where you left off — your saved heirlooms, orders, and curated wishlist."
                : "Join the atelier to keep your orders, saved pieces, and wishlist together."}
          </p>
        </header>

        {!(isSignIn && recoveringPassword) && (
          <div aria-label="Choose sign-in method" className={styles.tabs}>
            <button
              aria-pressed={method === "email"}
              className={method === "email" ? styles.activeTab : ""}
              onClick={() => changeMethod("email")}
              type="button"
            >
              {isSignIn ? "Email" : "Email registration"}
            </button>
            <button
              aria-pressed={method === "phone"}
              className={method === "phone" ? styles.activeTab : ""}
              onClick={() => changeMethod("phone")}
              type="button"
            >
              Phone OTP
            </button>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          {recoveringPassword ? (
            <Field
              icon={<Mail aria-hidden="true" className={styles.fieldIcon} size={19} />}
              label="Email address"
            >
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </Field>
          ) : (
            <>
              {!isSignIn && (
                <Field
                  icon={<UserRound aria-hidden="true" className={styles.fieldIcon} size={19} />}
                  label="Full name"
                >
                  <input
                    autoComplete="name"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </Field>
              )}

              {method === "email" ? (
                <Field
                  icon={<Mail aria-hidden="true" className={styles.fieldIcon} size={19} />}
                  label="Email address"
                >
                  <input
                    autoComplete="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </Field>
              ) : (
                <>
                  <Field
                    icon={<Phone aria-hidden="true" className={styles.fieldIcon} size={19} />}
                    label="Phone number"
                  >
                    <input
                      autoComplete="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      required
                      type="tel"
                    />
                  </Field>
                  <Field
                    icon={<LockKeyhole aria-hidden="true" className={styles.fieldIcon} size={19} />}
                    label="One-time code"
                  >
                    <input
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      name="otp"
                      placeholder="Enter your verification code"
                      required
                    />
                  </Field>
                </>
              )}

              {method === "email" && !isSignIn && (
                <Field
                  icon={<Phone aria-hidden="true" className={styles.fieldIcon} size={19} />}
                  label="Phone number (optional)"
                >
                  <input
                    autoComplete="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    type="tel"
                  />
                </Field>
              )}

              {method === "email" && (
                <PasswordField
                  action={
                    isSignIn ? (
                      <button
                        className={styles.textButton}
                        onClick={() => {
                          setRecoveringPassword(true);
                          setFeedback("");
                        }}
                        type="button"
                      >
                        Forgot password?
                      </button>
                    ) : undefined
                  }
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  label="Password"
                  minLength={isSignIn ? undefined : 8}
                  onChange={() => setFeedback("")}
                  placeholder={isSignIn ? "Your password" : "At least 8 characters"}
                  reveal={showPassword}
                  setReveal={setShowPassword}
                />
              )}

              {!isSignIn && method === "email" && (
                <PasswordField
                  autoComplete="new-password"
                  label="Confirm password"
                  minLength={8}
                  onChange={() => setFeedback("")}
                  placeholder="Re-enter your password"
                  reveal={showConfirmPassword}
                  setReveal={setShowConfirmPassword}
                />
              )}
            </>
          )}

          <button className={styles.submitButton} type="submit">
            {recoveringPassword
              ? "Send reset link"
              : isSignIn
                ? method === "phone"
                  ? "Continue with phone"
                  : "Sign in"
                : method === "phone"
                  ? "Verify phone number"
                  : "Create patron account"}
          </button>
          {feedback && (
            <p aria-live="polite" className={styles.feedback} role="status">
              {feedback}
            </p>
          )}
        </form>

        {recoveringPassword ? (
          <button
            className={styles.secondaryLink}
            onClick={() => {
              setRecoveringPassword(false);
              setFeedback("");
            }}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={15} />
            Return to sign in
          </button>
        ) : (
          <p className={styles.alternateAction}>
            {isSignIn ? "New to the atelier?" : "Already have an account?"}{" "}
            <Link href={isSignIn ? "/account/create-account" : "/account/sign-in"}>
              {isSignIn ? "Create an account" : "Sign in"}
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
