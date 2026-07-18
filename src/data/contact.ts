/**
 * Contact information — shared across Contact page and Footer.
 */
export interface ContactInfo {
  email: string;
  instagram: { handle: string; url: string };
  location: string;
  locationNote: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: 'hello@flaimestudio.com',
  instagram: { handle: '@flaimestudio', url: 'https://instagram.com' },
  location: 'Los Angeles, CA',
  locationNote: 'Working worldwide',
};