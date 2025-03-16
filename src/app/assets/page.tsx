import { Button } from "@/components/ui/button";
import Link from "next/link";
import { token } from "@/static-data/token";

export default function AssetsPage() {
  // TODO - Implement token fetch api to replace the static `token` import
  if (!token || token.length < 1) return <NoAssetFound />;

  return <div className="space-y-2"></div>;
}

function NoAssetFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Assets</h2>
        <p className="text-white/50 mb-6">
          {
            "You don't have any assets yet. Create a stablecoin or buy one to get started."
          }
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant={"secondary"} asChild>
            <Link href="/create">Create Stablecoin</Link>
          </Button>
          <Button className="border-primary" variant="outline">
            <Link href="/">Buy Stablecoin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
