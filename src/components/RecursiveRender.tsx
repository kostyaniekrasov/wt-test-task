import { JSONValue } from '@/types';

interface RecursiveRendererProps {
  data: JSONValue;
  level?: number;
}

const RecursiveRenderer: React.FC<RecursiveRendererProps> = ({
  data,
  level = 0,
}) => {
  if (typeof data !== 'object' || data === null) {
    return <span className="font-semibold text-blue-600">{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <ul className="ml-4 list-disc space-y-1">
        {data.map((item, index) => (
          <li key={index}>
            <RecursiveRenderer
              data={item}
              level={level + 1}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`ml-${level * 2} space-y-1 border-gray-300 pl-3`}>
      {Object.entries(data).map(([key, value]) => {
        const isNestedObject =
          typeof value === 'object' && value !== null && !Array.isArray(value);

        return (
          <div
            key={key}
            className={`flex gap-2 ${isNestedObject ? 'flex-col' : 'items-center'}`}
          >
            <span className="text-lg font-semibold text-gray-700">{key}:</span>
            <RecursiveRenderer
              data={value}
              level={level + 1}
            />
          </div>
        );
      })}
    </div>
  );
};
export default RecursiveRenderer;
