"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
  };
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3.5s (start exit animation 350ms before removal)
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
    }, 3150);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 350);
  }, []);

  const toast = {
    success: (msg: string) => addToast(msg, "success"),
    error: (msg: string) => addToast(msg, "error"),
    info: (msg: string) => addToast(msg, "info"),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}

// ─── Toast Container ──────────────────────────────────────────────────────────
const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />,
  error: <XCircle size={18} className="text-red-400 flex-shrink-0" />,
  info: <Info size={18} className="text-blue-400 flex-shrink-0" />,
};

const bars: Record<ToastType, string> = {
  success: "bg-emerald-400",
  error: "bg-red-400",
  info: "bg-blue-400",
};

function ToastContainer({
  toasts,
  dismiss,
}: {
  toasts: Toast[];
  dismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none"
      style={{ maxWidth: "360px", width: "calc(100vw - 48px)" }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto relative overflow-hidden rounded-xl shadow-2xl flex items-start gap-3 p-4
            bg-[#1a1a1a] text-white border border-white/10
            ${t.exiting ? "toast-exit" : "toast-enter"}
          `}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {/* Colored progress bar */}
          <span
            className={`absolute bottom-0 left-0 h-0.5 ${bars[t.type]}`}
            style={{
              animation: t.exiting ? "none" : "shimmerBar 3.15s linear forwards",
              width: "100%",
            }}
          />

          {icons[t.type]}

          <p className="text-sm font-medium leading-snug flex-1">{t.message}</p>

          <button
            onClick={() => dismiss(t.id)}
            className="text-white/50 hover:text-white transition-colors ml-1 flex-shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}

      <style>{`
        @keyframes shimmerBar {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}
