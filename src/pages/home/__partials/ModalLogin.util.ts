import { useEffect, useState } from "react";
import { Props } from "./ModalLogin";

export const useModalLoginUtil = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    onLogin(username, password);
  };

  const handleRegister = () => {
    onRegister();
    onClose();
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    handleRegister,
  };
};
