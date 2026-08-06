export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
