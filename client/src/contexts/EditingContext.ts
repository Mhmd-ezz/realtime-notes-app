import { createContext } from 'react';

export type EditingMap = Record<string, string>;

export interface EditingContextType {
  editingMap: EditingMap;
  setEditingMap: React.Dispatch<React.SetStateAction<EditingMap>>;
}

export const EditingContext = createContext<EditingContextType | undefined>(undefined);
