import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: "Maria Electro Tech | Premium Electrical & Plumbing Services in Kochi",
  description: "Certified electrical, plumbing, inverter, CCTV, and maintenance services in Kochi / Ernakulam. Experienced technicians, 60-min response, transparent pricing & 30-day warranty. Book now on WhatsApp!",
  keywords: [
    "electrician in kochi", 
    "plumber in kochi", 
    "electrical repair ernakulam", 
    "inverter installation kerala", 
    "plumber near kakkanad",
    "cctv installation kochi", 
    "home maintenance kochi"
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
