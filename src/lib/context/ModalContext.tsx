'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isBookModalOpen: boolean;
  openBookModal: (preselectedService?: string) => void;
  closeBookModal: () => void;
  selectedService: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBookModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    } else {
      setSelectedService('');
    }
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isBookModalOpen,
        openBookModal,
        closeBookModal,
        selectedService,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
