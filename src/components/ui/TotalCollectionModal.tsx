import React from 'react'

interface ModalProps {
    children: React.ReactNode;
    isCollectionModalOpen: boolean;
    onCloseCollectionModal: () => void;
}

const TotalCollectionModal = ({isCollectionModalOpen, onCloseCollectionModal, children}:ModalProps) => {

    if(!isCollectionModalOpen) return null
    
  return (
      <div
          className=" fixed inset-0 bg-transparent bg-opacity-50  flex justify-center items-center z-50">
          <div className="bg-black shadow-lg shadow-amber-100/80  rounded-xl p-6 w-1/2  relative">
              <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                  onClick={onCloseCollectionModal}
              >
                  &times;
              </button>
              {children}
          </div>
      </div>
  )
}

export default TotalCollectionModal
