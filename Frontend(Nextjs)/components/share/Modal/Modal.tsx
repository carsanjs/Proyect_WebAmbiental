import { GrClose } from "react-icons/gr";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    
  }
  
  function Modal({ onClose, children }: ModalProps){
    return (
        <div className="bg-slate-300 fixed z-9999 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="bg-gray-50 pt-2 pl-2 sm:px-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={onClose}
                  type="button"
                  className="btncancel inline-flex justify-center pt-5 pb-3 text-base font-medium text-black hover:bg-red-700 hover:text-write focus:outline-none focus:bg-red-400 sm:ml-3 sm:w-auto sm:text-sm">
                  <GrClose
                  />
                </button>
              </div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="h-screen w-11/12 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-11/12 sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                
                
                {children}


              </div>
            </div>
          </div>
        </div>
      );
  }

export default Modal;
