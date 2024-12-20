// "use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../src/assets/AskMyPDF-Logo.png";

// import "./shared.scss";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Chat", href: "/chat" },
  { name: "Chat PDF", href: "/pdfChat" },
  { name: "Pricing", href: "/coming-soon" },
  { name: "Contact", href: "/coming-soon" },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-transparent Nav">
      <header className="inset-x-0 top-0 z-50 fixed">
        <nav
          className="flex items-center justify-between p-5 lg:px-8 bg-transparent bg-opacity-20 backdrop-blur-lg"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 ">
            <a href="/" className="-m-1.5 p-1.5">
              {/* <span className="sr-only">Explained</span> */}
              <img className="h-14 w-auto" src={Logo} alt="Logo" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-black link"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/auth"
              className="p-2 px-5 text-sm bg-purple-600 rounded-sm m-2 icon"
              style={{ letterSpacing: "1px" }}
            >
              <span className="text-white">Get started</span>
            </a>
            <a
              href="/register"
              className="p-2 px-5 text-sm bg-transparent border border-black  rounded-sm m-2 icon"
            >
              <span className="text-black ">Register</span>
            </a>
          </div>
        </nav>
        {/* <hr className="bg-purple-600" /> */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                {/* <span className="sr-only">Explained</span> */}
                <img className="h-12 w-auto" src={Logo} alt="Logo" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 flex lg:flex-1 lg:justify-end">
                  <a
                    href="/auth"
                    className="p-2 px-5 text-sm bg-purple-600 rounded-sm m-2 icon"
                    style={{ letterSpacing: "1px" }}
                  >
                    <span className="text-white">Get started</span>
                  </a>
                  <a
                    href="/register"
                    className="p-2 px-5 text-sm bg-transparent border border-black rounded-sm m-2 icon"
                  >
                    <span className="text-black">Register</span>
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
