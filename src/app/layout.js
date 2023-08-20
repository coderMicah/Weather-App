import { Providers } from "./components/providers";
import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "Weather App Built By Micah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-800">
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}
