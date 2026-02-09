export default function Page() {
  return (
    <pre style={{ padding: 16 }}>
      {JSON.stringify(
        {
          publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
          hasSecret: Boolean(process.env.CLERK_SECRET_KEY),
        },
        null,
        2,
      )}
    </pre>
  );
}
