import { createContext, useContext } from "react";

const UserContext = createContext<{ name: string | null }>({ name: null });

export const useUser = () => useContext(UserContext);

export default UserContext;
