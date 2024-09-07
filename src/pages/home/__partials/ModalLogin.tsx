import { Button } from "@/shared/components/Button/Button";
import { FC } from "react";
import { useModalLoginUtil } from "./ModalLogin.util";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  onRegister: () => void;
}

const ModalLogin: FC<Props> = ({ isOpen, onClose, onLogin, onRegister }) => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    handleRegister,
  } = useModalLoginUtil({
    isOpen,
    onClose,
    onLogin,
    onRegister,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
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
          <div className="mt-4 flex justify-between">
            <div className="flex flex-row space-x-2">
              <Button
                title="Close"
                backgroundColor="neutral"
                onClick={onClose}
                isFull={false}
              />
              <Button
                title="Register"
                backgroundColor="green"
                onClick={handleRegister}
                isFull={false}
              />
            </div>
            <Button
              title="Login"
              backgroundColor="blue"
              onClick={handleLogin}
              isFull={false}
              isDisabled={username === "" || password === ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
