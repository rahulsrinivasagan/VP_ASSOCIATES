/**
 * app/loading.tsx — Next.js App Router root loading UI.
 *
 * This file is wrapped in a React Suspense boundary by Next.js automatically.
 * It renders IMMEDIATELY when navigating to any route, before the destination
 * page component renders. This is the correct way to mask loading time in
 * Next.js App Router.
 *
 * The TransitionProvider also handles initial load + refresh via useEffect,
 * while this file handles client-side navigation loading states at the
 * framework level.
 */
export default function RootLoading() {
  return null;
}
