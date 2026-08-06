export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-10 bg-surface-2 rounded-md w-1/4 mb-2"></div>
        <div className="h-5 bg-surface rounded-md w-1/3"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-6 h-32 flex flex-col justify-between">
            <div className="h-4 bg-surface-2 rounded-md w-1/2"></div>
            <div className="h-8 bg-surface-2 rounded-md w-1/3"></div>
            <div className="h-3 bg-surface-2 rounded-md w-2/3"></div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 h-[400px]">
        <div className="flex justify-between mb-8">
          <div className="space-y-2">
            <div className="h-6 bg-surface-2 rounded-md w-48"></div>
            <div className="h-4 bg-surface-2 rounded-md w-64"></div>
          </div>
        </div>
        <div className="w-full h-[300px] bg-surface-2/50 rounded-lg"></div>
      </div>
    </div>
  );
}
