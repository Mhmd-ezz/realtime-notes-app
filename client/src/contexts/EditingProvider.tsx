import { useState } from 'react';
import { EditingContext, type EditingMap } from './EditingContext';

export const EditingProvider = ({ children }: { children: React.ReactNode }) => {
  const [editingMap, setEditingMap] = useState<EditingMap>({});
  return (
    <EditingContext.Provider value={{ editingMap, setEditingMap }}>
      {children}
    </EditingContext.Provider>
  );
};
