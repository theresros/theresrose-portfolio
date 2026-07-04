export function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-secondary/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
    </div>
  );
}