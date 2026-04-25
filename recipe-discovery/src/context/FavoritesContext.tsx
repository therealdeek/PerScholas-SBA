import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { FavoritesContextType } from "../types";

const FavoritesContext = createContext<FavoritesContextType | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "recipe-favorites", 
    [], 
  );

  const addFavorite = (id: string): void => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev; // no duplicates
      return [...prev, id];
    });
  };

  const removeFavorite = (id: string): void => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);

  if (context === null) {
    
    throw new Error(
      "useFavorites must be used within a FavoritesProvider. " +
        "Wrap your app (or the relevant subtree) in <FavoritesProvider>.",
    );
  }

  return context;
}
