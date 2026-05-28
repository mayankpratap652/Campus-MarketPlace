import { Outlet } from "react-router-dom";
import auth from "../../assets/login.png";
import { TypeAnimation } from "react-type-animation";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full relative overflow-hidden">

      {/* Mobile Background Image */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${auth})`,
        }}
      ></div>

      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black/60 lg:hidden"></div>

      {/* Left Panel */}
      <div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${auth})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-lg space-y-6 text-center px-6 text-white">

          <h6 className="text-5xl md:text-6xl lg:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-2xl">
            Welcome to <br />

            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {/* <TypeAnimation
                sequence={[
                  "Campus Marketplace for Smart Students",
                  2000,
                  "Buy and Sell Within Your Campus",
                  2000,
                  "Trade Books Gadgets and Essentials Easily",
                  2000,
                  "Secure Platform Built for Students",
                  2000,
                  "Save Money While Supporting Your Campus",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
              /> */}

              CAMPUS-MARKETPLACE
            </span>
          </h6>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            A smart and secure platform where students can buy, sell, and exchange
            books, gadgets, and essentials within their campus community.
          </p>

          <p className="text-sm text-gray-300">
            Connect. Trade. Save. – Built for Students, By Students.
          </p>

        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative z-10">

        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-xl min-h-[350px] text-gray-800">

          {/* Logo & Brand Name */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Logo"
              className="h-10 w-10"
            />

            <span className="text-2xl font-bold text-yellow-600 tracking-wide">
              Campus Marketplace
            </span>
          </div>

          <Outlet />

        </div>
      </div>
    </div>
  );
}

export default AuthLayout;