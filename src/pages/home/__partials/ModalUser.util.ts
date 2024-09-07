import { useEffect, useState } from "react";

export const useModalUserUtil = ({
  isOpen,
  userInfo,
  onUpdateUserInfo,
}: {
  isOpen: boolean;
  userInfo: {
    username: string;
    name: string;
  };
  onUpdateUserInfo: (username: string, password: string, name: string) => void;
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
      setUsername(userInfo.username);
      setName(userInfo.name);
    }
  }, [isOpen, userInfo]);

  const handleUpdate = () => {
    onUpdateUserInfo(username, password, name);
  };

  return {
    username,
    password,
    name,
    setUsername,
    setPassword,
    setName,
    handleUpdate,
  };
};
