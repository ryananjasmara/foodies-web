import { Button } from "@/shared/components/Button/Button";
import { FC } from "react";
import { useModalUserUtil } from "./ModalUser.util";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userInfo: {
    username: string;
    name: string;
  };
  onUpdateUserInfo: (username: string, password: string, name: string) => void;
  onLogout: () => void;
  onViewHistory: () => void;
}

const ModalUser: FC<Props> = ({
  isOpen,
  onClose,
  userInfo,
  onUpdateUserInfo,
  onLogout,
  onViewHistory,
}) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    name,
    setName,
    handleUpdate,
  } = useModalUserUtil({ isOpen, userInfo, onUpdateUserInfo });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">User Info</h2>
          <div className="mb-4">
            <Button
              title="View Order History"
              backgroundColor="green"
              onClick={onViewHistory}
            />
          </div>
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
        </div>
        <div className="p-4 flex justify-between">
          <div className="flex flex-row space-x-2">
            <Button title="Close" backgroundColor="neutral" onClick={onClose} />
            <Button title="Logout" backgroundColor="red" onClick={onLogout} />
          </div>
          <div className="flex flex-row space-x-2">
            <Button
              title="Update"
              backgroundColor="blue"
              isDisabled={username === "" || name === ""}
              onClick={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
