import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'nl'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files
  // - Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};