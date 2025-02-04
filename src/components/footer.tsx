import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Separator } from './ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-8 dark:text-white">
      <Separator />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-md:flex max-md:flex-col max-md:items-center">
          <div className="flex flex-col space-y-4 max-md:order-2 max-md:items-center">
            <h3 className="text-sm font-semibold max-md:text-center">
              Nos acompanhe por aqui também:
            </h3>
            <ul className="flex flex-wrap items-center max-md:flex-col max-md:space-y-2">
              <li>
                <a
                  href="https://frc-events.firstinspires.org/team/7563"
                  className="text-sm hover:text-primary transition-colors"
                >
                  FIRST
                </a>
              </li>
              <li className="mx-2 text-gray-400 max-md:hidden">|</li>
              <li>
                <a
                  href="https://megazord7563.wixsite.com/megazord7563"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Website
                </a>
              </li>
              <li className="mx-2 text-gray-400 max-md:hidden">|</li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sesi-senai-megazord-8ba874228/"
                  className="text-sm hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4 max-md:order-1">
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/megazord7563/"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@megazord7563"
                title="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@megazord7563"
                title="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2 max-md:order-3 max-md:items-center">
            <p className="text-xs font-semibold max-md:text-center">
              Desenvolvido por:
            </p>
            <ul className="text-right max-md:text-center">
              <li>
                <a
                  href="https://fdestro.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary hover:underline transition-colors"
                >
                  Felipe Destro
                </a>
              </li>
              <li>
                <a
                  href="https://giovannivicentin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary hover:underline transition-colors"
                >
                  Giovanni Vicentin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center max-md:order-4">
          <p className="text-xs">
            © Megazord7563 - {currentYear}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
