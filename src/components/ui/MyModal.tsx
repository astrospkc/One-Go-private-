import React from "react";
interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="  overflow-y-scroll fixed inset-0 bg-transparent bg-opacity-50  flex justify-center items-center z-50">
            <div className="bg-black shadow-lg shadow-amber-100/80  rounded-xl p-6 w-1/2  relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>


    );


}





