import Hero from "./Hero";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

function Header() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" });
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${month}'${day}`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <header className="min-h-screen flex flex-col justify-between ">
      <div className="flex flex-col md:flex-row justify-between items-center p-5 lg:p-10">
        <Logo firstName="mateus" lastName="cerqueira" />
        <div className="flex justify-center mt-5 md:mt-0 flex-wrap gap-10 lg:gap-20 items-start md:items-center">
          <div className="">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Available for work
            </span>
            <h1 className="text-xl font-bold">{formattedDate}</h1>
          </div>
          <div className="">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              {" "}
              Based in
            </span>
            <h1 className="text-xl font-bold">Portugal</h1>
          </div>

          {/* IMPLEMENTAR NO FUTURO */}
          <div
            id="translate"
            className="group bg-neutral-200 rounded-xl lg:rounded-2xl  items-center justify-center cursor-pointer p-5 hover:bg-blue transition-colors duration-300 hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 stroke-neutral-500 group-hover:stroke-white transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>

          <div className="">
            <button
              onClick={handleClick}
              className="bg-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-white block cursor-pointer px-5 md:px-10 py-2.5 md:py-5 font-medium"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <Hero />
      </div>

      <div>
        <div className="flex justify-between p-5"> </div>
      </div>
    </header>
  );
}

export default Header;
