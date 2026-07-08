import { product } from "./product";

export type NavItem = { label: string; href: string; external?: boolean };

export const navLinks: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Compare", href: "/compare" },
  { label: "Docs", href: "/docs" },
  { label: "Install", href: "/install" },
  { label: "Changelog", href: "/changelog" },
];

export const footerColumns: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Compare", href: "/compare" },
      { label: "Use cases", href: "/use-cases" },
      { label: "Providers", href: "/providers" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Install", href: "/install" },
      { label: "Security & privacy", href: "/security" },
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
