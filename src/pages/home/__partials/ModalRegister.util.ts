import { useEffect, useState } from "react";

export const useModalRegisterUtil = ({
  isOpen,
  onRegister,
}: {
  isOpen: boolean;
  onRegister: (username: string, password: string, name: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setPassword("");
    }
  }, [isOpen]);

  const handleRegister = () => {
    onRegister(username, password, name);
  };

  return {
    username,
    password,
    name,
    setUsername,
    setPassword,
    setName,
    handleRegister,
  };
};
