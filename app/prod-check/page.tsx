export default function Page() {
  return (
    <pre style={{ padding: 16, whiteSpace: "pre-wrap" }}>
      {JSON.stringify(
        {
          convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL,
          clerkPk: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        },
        null,
        2,
      )}
    </pre>
  );
}
