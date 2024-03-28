const typeColors = {
  fire: "bg-red-500",
  grass: "bg-green-500",
  water: "bg-blue-500",
  electric: "bg-yellow-500",
  poison: "bg-purple-500",
  flying: "bg-orange-400",
};

interface TypeProps {
  typeName: keyof typeof typeColors;
}

const Type: React.FC<TypeProps> = ({ typeName }) => {
  const bgColor = typeColors[typeName] || "bg-gray-500";
  return (
    <div
      className={`inline-block px-3 text-white rounded-md ${bgColor}`}
    >
      {typeName}
    </div>
  );
};

export default Type;
