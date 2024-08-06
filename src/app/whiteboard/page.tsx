import WhiteboardCanvas from '@/components/whiteboard'

function WhiteboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center mx-4 md:mx-0">
      <h1 className="text-4xl font-bold mt-8 mb-8">Quadro Branco</h1>
      <WhiteboardCanvas />
    </div>
  )
}

export default WhiteboardPage
