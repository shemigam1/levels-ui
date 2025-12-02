import { useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import nithub from "../assets/nithub.jpeg";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className=" border-b w-full fixed top-0 right-0 left-0 z-10  border-gray-200">
      <div className=" px-4 sm:px-6  lg:px-20 py-3 bg-white">
        <div className="flex w-full items-center justify-between ">
          {/* Logo */}
          <img src={nithub} className="h-18 w-auto object-contain" alt="logo" />
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => navigate({ to: "/register" })}
              className="px-6 py-2 bg-slate-800 hover:opacity-90 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
            >
              Testimonials
            </button>
            <button className="w-full px-6 py-2 bg-slate-800 hover:opacity-90 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
