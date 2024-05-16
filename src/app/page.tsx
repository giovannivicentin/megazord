import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/megazordLogo.png"
        width="240"
        height="300"
        alt="Megazord White logo"
      ></Image>
    </main>
  )
}
