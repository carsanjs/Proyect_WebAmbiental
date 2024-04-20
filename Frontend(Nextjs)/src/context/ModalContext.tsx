// // import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";
// // import Modal from "../../components/share/Modal/Modal";
// // interface ModalProviderProps {
// //   children: React.ReactNode;
// // }

// // interface ModalComponent {
// // modal: boolean;
// // }

// // export const ModalContext = createContext<ModalComponent>({
// // modal: false
// // });

// // export function ModalProvider({ children }:ModalProviderProps) {
// // const [showModal, setShowModal] = useState<boolean>(false);
// // console.log(showModal)
// // const [modalContent, setModalContent] = useState<ReactNode | null>(null);

// // const openModal = (content: ReactNode) => {
// //       setShowModal(true);
// //       setModalContent(content);
// //     };
  

// // const closeModal = () => {
// //   setShowModal(false);
// // }

// // return (
// //   <ModalContext.Provider value={{ modal: showModal}}>
// //     {children}
// //     {showModal && 
// //       <Modal onClose={closeModal}
// //       children=""
// //       >
       
// //       </Modal>}
// //   </ModalContext.Provider>
// // );
// // }

// import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
// import Modal from "../../components/share/Modal/Modal";

// interface ModalProviderProps {
//     children: React.ReactNode;
//   }

// interface ModalComponent {
//   modal: boolean;
//   setModal:ModalProviderProps
// }

// export const ModalContext = createContext<ModalComponent>({
//   modal: false,
//   setModal: {
//     children: null
//   }
// });

// export function ModalProvider({ children }:ModalProviderProps) {
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  
//   const openModal = (content: ReactNode) => {
//     setModalContent(content);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <ModalContext.Provider value={{ modal: showModal, setModal: modalContent }}>
//       {children}
//       {showModal && <Modal onClose={closeModal}>{modalContent}</Modal>}
//     </ModalContext.Provider>
//   );
// }