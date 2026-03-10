import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "StudiAmo - Votre passerelle vers les universités italiennes",
  description: "Plateforme SaaS pour guider les étudiants tunisiens dans leur candidature aux universités italiennes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
