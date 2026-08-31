import React, { createContext, useState, useContext } from 'react';

const ContactModalContext = createContext();

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState(null);

  const openContactModal = (category = null) => {
    setInitialCategory(category);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <ContactModalContext.Provider value={{ isContactModalOpen, openContactModal, closeContactModal, initialCategory }}>
      {children}
    </ContactModalContext.Provider>
  );
};
