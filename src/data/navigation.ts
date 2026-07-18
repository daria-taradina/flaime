/**
 * Navigation links — single source of truth for Navbar + Footer.
 */
export interface NavItem {
  to: string;
  label: string;
  end?: boolean; // true = only active on exact path match (mirrors react-router's NavLink `end` prop)
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
];

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com', handle: '@flaimestudio' },
];

/**
 * Footer link groupings — kept separate from NAV_ITEMS because the footer's
 * columns don't mirror the navbar's: it includes Services (not a navbar
 * item) and groups Contact with Instagram rather than with the other pages.
 */
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export const FOOTER_LINK_COLUMNS: FooterLink[][] = [
  [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' }, // TODO — confirm this route exists; not currently in NAV_ITEMS
  ],
  [
    { label: 'Contact', href: '/contact' },
    { label: 'Instagram', href: 'https://instagram.com', external: true },
  ],
];