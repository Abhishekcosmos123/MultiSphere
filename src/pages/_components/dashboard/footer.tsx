import Link from "next/link"
import { footerLinks, socialLinks } from "@/lib/content"
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case "facebook":
        return <Facebook className="w-5 h-5" />
      case "twitter":
        return <Twitter className="w-5 h-5" />
      case "linkedin":
        return <Linkedin className="w-5 h-5" />
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "youtube":
        return <Youtube className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <footer className="py-12 bg-black text-white">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-white rounded-full hover:bg-gray-200"
              aria-label={link.name}
            >
              {getSocialIcon(link.icon)}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm hover:text-white ${link.name === "Do Not Sell or Share My Personal Information" ? "text-yellow-400" : "text-gray-400"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 md:flex-row">
          <div className="text-sm text-gray-400">
            <p>Get the app</p>
            <div className="flex gap-2 mt-2">
              <Link href="#" className="block">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </Link>
              <Link href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/200px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </Link>
            </div>
          </div>


          <div className="text-xs text-gray-400 space-y-3">
            <p>
              Any mortgage-related information or activity is performed by NMLS LLC (NMLS #12345), a subsidiary of Home,
              Inc.
            </p>
            <p>*Based on an avg 2023 popularity survey among real estate professionals.</p>
            <p>© 1995-2025 National Association of REALTORS® and Home, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
