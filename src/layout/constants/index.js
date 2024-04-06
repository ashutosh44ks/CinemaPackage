export const layoutPadding = (paddingY) =>
  `${paddingY} px-4 min-[480px]:px-8 min-[950px]:px-16 xl:px-24 2xl:px-32`;
export const publicHeaderRoutes = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "FAQs",
    link: "/faq",
  },
];
export const protectedHeaderRoutes = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "My Crates",
    link: "/my-account/my-crates",
  },
  {
    name: "Store",
    link: "/store",
  },
];
export const footerRoutes = [
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "FAQs",
    link: "/faq",
  },
  {
    name: "Terms & Conditions",
    link: "/terms",
  },
];

