import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AudioVisualizer } from "@/components/audio/AudioVisualizer";
import { CinematicAudioOverlay } from "@/components/audio/CinematicAudioOverlay";
import { MusicPlayer } from "@/components/audio/MusicPlayer";
import { TribunalWorldLayer } from "@/components/dynamic/TribunalWorldLayer";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { JudgmentNotification } from "@/components/ui/JudgmentNotification";
import { VisualThemeProvider } from "@/components/ui/VisualThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saboteadores Mentales: Habitantes Invisibles",
  description: "Demo offline de cartas tacticas sobre claridad emocional, humor negro y juicio mental.",
  manifest: "/manifest.json",
  applicationName: "Saboteadores Mentales",
  appleWebApp: {
    capable: true,
    title: "Saboteadores",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0b10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ErrorBoundary>
          {children}
          <MusicPlayer />
          <AudioVisualizer />
          <CinematicAudioOverlay />
          <JudgmentNotification />
          <TribunalWorldLayer />
          <VisualThemeProvider />
        </ErrorBoundary>
      </body>
    </html>
  );
}
