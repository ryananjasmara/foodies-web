import { FC, Fragment } from "react";
import { useHomePageUtil } from "./HomePage.util";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ProductCard from "./__partials/ProductCard";
import ProductCardSkeleton from "./__partials/ProductCardSkeleton";
import ModalPurchase from "./__partials/ModalPurchase";
import { Svgs } from "@/assets/svgs";
import ModalLogin from "./__partials/ModalLogin";
import ModalUser from "./__partials/ModalUser";
import ModalRegister from "./__partials/ModalRegister";
import ModalOrderHistory from "./__partials/ModalOrderHistory";

const HomePage: FC = () => {
  const {
    productData,
    isLoadingProduct,
    keyword,
    setKeyword,
    loginData,
    setIsOpenModalUser,
    setIsOpenModalLogin,
    handleBuy,
    isOpenModalLogin,
    isOpenModalUser,
    isOpenModalPurchase,
    isOpenModalOrderHistory,
    isOpenModalRegister,
    setIsOpenModalOrderHistory,
    setIsOpenModalPurchase,
    setIsOpenModalRegister,
    selectedProduct,
    handleConfirmPurchase,
    handleLogin,
    handleLogout,
    handleUpdateUser,
    handleRegister,
    orderHistoryData,
    isLoadingOrderHistoryData,
  } = useHomePageUtil();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Foodies</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {Object.keys(loginData).length > 0 ? (
            <Fragment>
              <button className="p-2" onClick={() => setIsOpenModalUser(true)}>
                <UserIcon className="h-6 w-6 text-gray-700" />
              </button>
            </Fragment>
          ) : (
            <button className="p-2" onClick={() => setIsOpenModalLogin(true)}>
              <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-gray-700" />
            </button>
          )}
        </div>
      </header>
      <main
        className={`p-4 flex-grow flex ${
          productData?.data?.length === 0
            ? "items-center justify-center"
            : "items-start"
        }`}
      >
        {isLoadingProduct ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : productData?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 p-4">
            <img
              src={Svgs.not_found}
              alt="No products illustration"
              className="w-1/2 md:w-1/4 lg:w-2/3 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Products not available
            </h2>
            <p className="text-base">
              Sorry we can't find any products for you at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {productData?.data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                qty={product.qty}
                image={product.image}
                type={product.type}
                handleBuy={() => handleBuy(product)}
              />
            ))}
          </div>
        )}
        <ModalPurchase
          isOpen={isOpenModalPurchase}
          onClose={() => setIsOpenModalPurchase(false)}
          product={selectedProduct}
          onConfirm={handleConfirmPurchase}
        />
        <ModalLogin
          isOpen={isOpenModalLogin}
          onClose={() => setIsOpenModalLogin(false)}
          onLogin={handleLogin}
          onRegister={() => setIsOpenModalRegister(true)}
        />
        <ModalUser
          isOpen={isOpenModalUser}
          onClose={() => setIsOpenModalUser(false)}
          onLogout={handleLogout}
          onUpdateUserInfo={handleUpdateUser}
          userInfo={{
            username: loginData?.username || "",
            name: loginData?.name || "",
          }}
          onViewHistory={() => {
            setIsOpenModalUser(false);
            setIsOpenModalOrderHistory(true);
          }}
        />
        <ModalRegister
          isOpen={isOpenModalRegister}
          onClose={() => setIsOpenModalRegister(false)}
          onRegister={handleRegister}
        />
        <ModalOrderHistory
          isOpen={isOpenModalOrderHistory}
          onClose={() => setIsOpenModalOrderHistory(false)}
          orderHistory={orderHistoryData?.data || []}
          isLoading={isLoadingOrderHistoryData}
        />
      </main>
    </div>
  );
};

export default HomePage;
