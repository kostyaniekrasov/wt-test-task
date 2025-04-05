function RecursiveRenderer(obj: object) {
  return (
    <div className="space-y-2 border-gray-300 pl-4">
      {Object.entries(obj).map(([key, value]) => (
        <div key={key}>
          <span className="text-xl font-semibold text-gray-500">{key}:</span>{' '}
          {typeof value === 'object' && value !== null ? (
            RecursiveRenderer(value)
          ) : (
            <span className="text-lg font-semibold text-blue-400">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecursiveRenderer;
