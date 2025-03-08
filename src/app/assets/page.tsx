import { Button } from "@/components/ui/button"

export default function AssetsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Assets</h2>
        <p className="text-gray-400 mb-6">
          You don't have any assets yet. Create a stablecoin or buy one to get started.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="/create">Create Stablecoin</a>
          </Button>
          <Button variant="outline">
            <a href="/">Buy Stablecoin</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

