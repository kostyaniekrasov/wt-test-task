function RecursiveRenderer(obj: object) {
  return (
    <div
      className="space-y-2 border-gray-300 pl-4"
      data-testid="recursive-renderer"
    >
      {Object.entries(obj).map(([key, value]) => (
        <div
          key={key}
          data-testid={`recursive-item-${key}`}
        >
          <span
            className="text-xl font-semibold text-gray-500"
            data-testid={`recursive-key-${key}`}
          >
            {key}:
          </span>{' '}
          {typeof value === 'object' && value !== null ? (
            RecursiveRenderer(value)
          ) : (
            <span
              className="text-lg font-semibold text-blue-400"
              data-testid={`recursive-value-${value}`}
            >
              {value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecursiveRenderer;
