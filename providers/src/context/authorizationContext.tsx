import { createContext, useContext, useState } from "react";
import { DatasetAccessResult } from "../types/authorization";
import { checkDatasetAccess } from "../services/authorizationService";

interface AuthorizationContextType {
  getDatasetAccess: (datasetIds: string[]) => Promise<DatasetAccessResult[]>;
  datasetAccess: DatasetAccessResult[];
}

// Context for authorization info
const AuthorizationContext = createContext<AuthorizationContextType | null>(
  null,
);

// Context provider
export const AuthorizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [datasetAccess, setDatasetAccess] = useState<DatasetAccessResult[]>([]);

  const getDatasetAccess = async (
    datasetIds: string[],
  ): Promise<DatasetAccessResult[]> => {
    const results = await checkDatasetAccess(datasetIds);

    setDatasetAccess(results);

    return results;
  };

  return (
    <AuthorizationContext.Provider
      value={{
        getDatasetAccess,
        datasetAccess,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
// To use context
export function useAuthorizationContext() {
  const context = useContext(AuthorizationContext);

  if (context === null) {
    throw new Error(
      "useAuthorizationContext must be used within an AuthorizationProvider",
    );
  }

  return context;
}
