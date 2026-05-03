"use client";

export default function BaseModal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-md z-10">
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-primary">
            {title}
          </h3>
        )}

        {children}
      </div>
    </div>
  );
}