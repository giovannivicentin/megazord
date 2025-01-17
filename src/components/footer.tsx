import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="mt-8">
      <Separator />
      <div className="flex flex-col items-center py-8 gap-6">
        <div className="flex flex-row items-center gap-8 text-xl text-white">
          <a
            href="https://www.instagram.com/megazord7563/"
            title="Instagram"
            target="_blank"
            rel="noopener"
            className="bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:opacity-95"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@megazord7563"
            title="Tiktok"
            target="_blank"
            rel="noopener"
            className="bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:opacity-95"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.youtube.com/@megazord7563"
            title="Youtube"
            target="_blank"
            rel="noopener"
            className="bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:opacity-95"
          >
            <FaYoutube />
          </a>
        </div>
        <div className="flex flex-col justify-center text-center gap-2">
          <p className="text-sm">
            © Megazord7563 - 2025. Todos os direitos reservados.
          </p>
          <p className="text-sm font-bold">Desenvolvidor por: </p>
          <ul className="flex flex-col gap-1 text-sm justify-center">
            <li>
              <a
                href="https://fdestro.vercel.app/"
                target="_blank"
                rel="noopener"
                className="hover:underline hover:text-primary"
              >
                Felipe Destro
              </a>
            </li>
            <li>
              <a
                href="https://giovannivicentin.com/"
                target="_blank"
                rel="noopener"
                className="hover:underline hover:text-primary"
              >
                Giovanni Vicentin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
