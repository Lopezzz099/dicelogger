"use client";

// import { cookies } from "next/headers";
import { createContext, useEffect, useState } from "react";

export type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
};

type UserContextProps = {
  user?: User | null;
  handleUser: () => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

interface props {
  children: React.ReactNode;
}

const getUser = async () => {
  try {
    const res = await fetch(`/api/my`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const UserProvider = ({ children }: props) => {
  const [user, setUser] = useState<User | null>();

  const logout = () => {
    setUser(null);
  };

  const handleUser = async () => {
    const user = await getUser();
    if (user) {
      setUser(user.data);
    } else setUser(null);
  };

  useEffect(() => {
    const func = async () => {
      const user = await getUser();
      if (user) {
        setUser(user.data);
      } else setUser(null);
    };

    func();
  }, []);

  return (
    <UserContext.Provider value={{ user, handleUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
