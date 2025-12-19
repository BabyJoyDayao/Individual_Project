import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children, title = "", size = "md", showClose = true }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; 
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-[95vw]"
  };

  const paddingClasses = {
    xs: "p-3",
    sm: "p-4",
    md: "p-4 sm:p-6",
    lg: "p-4 sm:p-6 md:p-8",
    xl: "p-4 sm:p-6 md:p-8",
  }[size];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-2 sm:p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-lg sm:rounded-xl md:rounded-2xl w-full ${sizeClasses[size]} max-h-[90dvh] overflow-hidden animate-modalIn`}
        onClick={(e) => e.stopPropagation()}
      >
      
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-2">
          
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>

            {title && (
              <h2 
                id="modal-title"
                className="text-base sm:text-lg md:text-xl font-bold text-white ml-2 truncate"
              >
                {title}
              </h2>
            )}
          </div>

          {showClose && (
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white text-xl sm:text-2xl font-bold transition-all hover:scale-125 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>

        <div className={`${paddingClasses} overflow-y-auto max-h-[calc(90dvh-80px)]`}>
          {children}
        </div>

        <div className="p-3 sm:p-4 md:p-6 border-t border-neutral-800 bg-neutral-900/50">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all text-sm sm:text-base"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalExample() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalSize, setModalSize] = React.useState("md");

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"].map((size) => (
          <button
            key={size}
            onClick={() => {
              setModalSize(size);
              setIsModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded text-xs sm:text-sm"
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${modalSize.toUpperCase()} Modal`}
        size={modalSize}
      >
        <div className="space-y-4">
          <p className="text-neutral-300 text-sm sm:text-base">
            This is a {modalSize} modal. It's fully responsive and works on all screen sizes.
          </p>
          <div className="bg-neutral-800/50 p-3 sm:p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Responsive Features:</h4>
            <ul className="text-neutral-400 text-xs sm:text-sm space-y-1">
              <li>• Adjusts padding based on screen size</li>
              <li>• Proper touch targets on mobile</li>
              <li>• Scrollable content area</li>
              <li>• Escape key support</li>
              <li>• Backdrop click to close</li>
            </ul>
          </div>
          <input
            type="text"
            placeholder="Try typing here..."
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm sm:text-base"
          />
          <textarea
            placeholder="Or here..."
            rows="3"
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm sm:text-base"
          />
        </div>
      </Modal>
    </div>
  );
}

export default Modal;