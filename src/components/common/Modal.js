export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#35332F]/30 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl rounded-lg border border-[#DED8CD] bg-[#FBFAF7] p-6 text-[#35332F] shadow-[0_12px_40px_rgba(53,51,47,0.12)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
