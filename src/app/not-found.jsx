import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, Users } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-red-100 mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl">
          <AlertTriangle className="text-red-500 size-8" />
        </div>
        <div className="text-center">
          <div className="font-geist text-9xl font-extrabold tracking-tight text-neutral-900">
            404
          </div>
          <h1 className="font-geist mt-3 text-xl font-semibold text-neutral-900">
            Page not found!
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-500">
            The page you are looking for doesn’t exist or may have been moved.
            Check the URL, or use the actions below to get back on track.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="gap-2 text-white px-8!">
              <Link href="/">
                <Home className="size-4" />
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/clients">
                <Users className="size-4" />
                View Clients
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
