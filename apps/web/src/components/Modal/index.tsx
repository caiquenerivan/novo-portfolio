import React from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Permite qualquer conteúdo dentro do modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Não renderiza se não estiver aberto

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center modal-overlay z-50 "
      onClick={onClose}
    >
      <div
        className="bg-gray-700 py-8 px-8 m-10 rounded-md min-h-60 min-w-60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-0 right-0 m-4 w-10 h-10 xl:px-20">
          <MdClose color="#1e293b" className="w-10 h-10 xl:w-20 xl:h-20" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
