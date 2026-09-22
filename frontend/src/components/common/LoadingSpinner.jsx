const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;