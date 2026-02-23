import { createContext, useState, useContext } from 'react';

const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const closeGallery = () => {
    setIsOpen(false);
    setSelectedIndex(0); // Réinitialise à la première image
  };

  return (
    <GalleryContext.Provider value={{ isOpen, setIsOpen, closeGallery, selectedIndex, setSelectedIndex }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}