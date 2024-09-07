import { Button } from "@/shared/components/Button/Button";
import { FC } from "react";
import { useModalRegisterUtil } from "./ModalRegister.util";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (username: string, password: string, name: string) => void;
}

const ModalRegister: FC<Props> = ({ isOpen, onClose, onRegister }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    name,
    setName,
    handleRegister,
  } = useModalRegisterUtil({ isOpen, onRegister });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              title="Close"
              backgroundColor="neutral"
              onClick={onClose}
              isFull={false}
            />
            <Button
              title="Register"
              backgroundColor="blue"
              onClick={handleRegister}
              isFull={false}
              isDisabled={username === "" || password === "" || name === ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegister;
