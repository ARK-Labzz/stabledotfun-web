import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 flex flex-1 w-full h-screen bg-secondary/70 backdrop-blur-md items-center justify-center">
      <div className="lg:w-1/6 bg-secondary/90 border border-white/50 rounded-2xl p-8 gap-6 flex flex-col items-center">
        <Image
          src="/stable-fun-logo.svg"
          alt="Stable.fun"
          width={140}
          height={34}
          className="w-[200px]"
        />

        <div className="flex flex-1 flex-col gap-4 justify-center items-center">
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 border-4 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[hsl(var(--muted-foreground))]">
              Loading...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
