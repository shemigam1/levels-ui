import { createFileRoute } from "@tanstack/react-router";

import React, { useState } from "react";
import {
  Wifi,
  Coffee,
  Zap,
  Shield,
  Users,
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Header } from "../components/header";

export const Route = createFileRoute("/")({
  component: Homepage,
});
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

interface Testimonial {
  name: string;
  role: string;

  content: string;
  rating: number;
}
const features: Feature[] = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    description:
      "Blazing fast fiber optic connection for seamless productivity",
  },
  {
    icon: Coffee,
    title: "Free Amenities",
    description:
      "Complimentary coffee, tea, and refreshments throughout the day",
  },
  {
    icon: Zap,
    title: "24/7 Access",
    description: "Work on your schedule with round-the-clock building access",
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "Advanced security systems and private meeting rooms",
  },
  {
    icon: Users,
    title: "Community Events",
    description: "Network with like-minded professionals at regular events",
  },
  {
    icon: Calendar,
    title: "Flexible Booking",
    description: "Book spaces by the day, week or month with easy management",
  },
];

const plans: Plan[] = [
  {
    name: "Daily",
    price: "3000",
    period: "per day",
    features: [
      "Access to shared workspace",
      "High-speed WiFi",
      "Free coffee & tea",
      "Community events",
    ],
  },
  {
    name: "Weekly",
    price: "30000",
    period: "per week",
    features: [
      "Your own dedicated desk",
      "24/7 building access",
      "Storage locker",
      "Free coffee & tea",
      "Community events",
      "All Hot Desk features",
    ],
    popular: true,
  },
  {
    name: "Monthly",
    price: "90000",
    period: "per month",
    features: [
      "Your own dedicated desk",
      "24/7 building access",
      "Storage locker",
      "Community events",
      "Free coffee & tea",
      "All Hot Desk features",
      "Customizable layout",
      "Meeting room access",
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    content:
      "This workspace has really helped me scale my business. The environment is clean, reliable, and perfect for productivity.",
    rating: 4,
  },
  {
    name: "Tunde Adeyemi",
    role: "UI/UX Designer",
    content:
      "A great place for creativity. The modern setup and calm atmosphere help me focus and deliver my best work.",
    rating: 5,
  },
  {
    name: "Chiamaka Okafor",
    role: "Business Consultant",
    content:
      "The flexibility is amazing. I love that I can book exactly what I need without any stress. Highly recommended.",
    rating: 5,
  },
];

function Homepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <Header />
      {/* Hero Section */}
      <section className="pt-14 b-16 px-4 sm:px-6 lg:px-18 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Book your space in minutes
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                Your Perfect
                <span className="block bg-blue-700 bg-clip-text text-transparent">
                  Workspace Awaits
                </span>
              </h1>
              <p className="text-md md:text-lg text-slate-600 leading-relaxed">
                Join a thriving community of professionals in our modern,
                fully-equipped workspace. Flexible plans, premium amenities, and
                the perfect environment for productivity.
              </p>
              <div className="flex gap-4 ">
                <button
                  className="px-4 py-2 sm:px-8 sm:py-2 bg-slate-700 text-white rounded-lg 
    hover:opacity-95 transition-all font-semibold shadow-lg hover:shadow-sm 
    flex items-center justify-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection("pricing")}
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-white border-2 border-slate-200 text-slate-700 
    rounded-lg hover:border-blue-600 hover:text-blue-600 
    transition-all font-semibold text-sm sm:text-base"
                >
                  View Pricing
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <a
                  href="https://www.google.com/maps/place/NIT+Hub+UNILAG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-600">Nithub</span>
                </a>

                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-600">500+ Members</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <Wifi className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-slate-800 mb-1">
                        Fast WiFi
                      </h3>
                      <p className="text-sm text-slate-600">1Gbps Speed</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mt-8">
                      <Coffee className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-slate-800 mb-1">
                        Free Cafe
                      </h3>
                      <p className="text-sm text-slate-600">All Day</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow -mt-8">
                      <Shield className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-slate-800 mb-1">Secure</h3>
                      <p className="text-sm text-slate-600">24/7 Security</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-slate-800 mb-1">
                        Flexible
                      </h3>
                      <p className="text-sm text-slate-600">Easy Booking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto">
              Premium amenities and services designed to help you do your best
              work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-slate-50 rounded-xl  hover:shadow-xs transition-all duration-300 border border-slate-100"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-md md:text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-md">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-10 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, cancel
              anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-2 md:px-10">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl  transition-all duration-300 overflow-hidden
                ${plan.popular ? "ring-2 ring-blue-600 scale-105" : ""}
                p-4 sm:p-0
    `}
              >
                {plan.popular && (
                  <div
                    className="absolute top-0 right-0 bg-slate-600 
        text-white px-2 py-1 sm:px-4 sm:py-1 text-xs sm:text-sm font-bold rounded-bl-lg"
                  >
                    POPULAR
                  </div>
                )}

                <div className="p-4 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 ml-1 sm:ml-2 text-sm sm:text-base">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 sm:space-x-3"
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm sm:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-15 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2.5">
              Loved by Professionals
            </h2>
            <p className="text-lg text-slate-600">
              See what our members have to say about their experience
            </p>
          </div>

          <div className="relative">
            <div className="bg-slate-50 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="flex mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  )
                )}
              </div>
              <p className="text-xl text-slate-700 italic mb-6">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div>
                <p className="font-bold text-slate-900">
                  {testimonials[currentTestimonial].name}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTestimonial === index
                        ? "bg-blue-600 w-8"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 bg-linear-to-br from-blue-700  to-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
            Ready to Register?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
            Join hundreds of professionals who have found their perfect
            workspace
          </p>

          <button className="px-5 py-3 sm:px-5 sm:py-3 bg-white hover:bg-slate-800 ease-in-out hover:text-white text-blue-600 rounded-lg hover:opacity-90 transition-all font-bold text-sm sm:text-lg inline-flex items-center space-x-2 group">
            <span>Book Your Space Now</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <span className="text-white font-bold text-base sm:text-lg italic">
                  Nithub
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                Your perfect workspace solution for modern professionals.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                Product
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Locations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                Company
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                Support
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
            <p>&copy; 2025 Nithub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
