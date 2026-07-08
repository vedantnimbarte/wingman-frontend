import { product } from "./product";

export type NavItem = { label: string; href: string; external?: boolean };

export const navLinks: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Install", href: "/install" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
  { label: "About", href: "/about" },
];

export const footerColumns: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Install", href: "/install" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Install", href: "/install" },
      { label: "Architecture", href: product.architectureDocs, external: true },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "GitHub", href: product.repo, external: true },
      { label: "Issues", href: product.issues, external: true },
      { label: "Discussions", href: product.discussions, external: true },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Why Wingman", href: "/about" },
      { label: "License", href: product.repo + "?tab=readme-ov-file#license", external: true },
    ],
  },
];
