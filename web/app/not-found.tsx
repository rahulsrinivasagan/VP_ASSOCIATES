import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">404 - Page Not Found</h2>
      <p className="text-neutral-400 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
