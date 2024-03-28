import { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import Image from "next/image";
import Type from "./Type";

export interface Pokemon {
  url: string;
  name: string;
}

interface Ablility {
  ability: {
    name: string;
  };
}

interface PokemonData {
  height: number;
  weight: number;
  abilities: Ablility[];
  types: { type: { name: string } }[];
}

interface Props {
  pokemon: Pokemon;
}
const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const [data, setData] = useState<PokemonData | null>(
    null
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const fetchedData: PokemonData =
          await response.json();
        setData(fetchedData);
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    fetchPokemonData();
  }, [pokemon.url]);

  const getPokemonNumberFromUrl = (
    url: string
  ): string | null => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  };

  const pokemonNumber = getPokemonNumberFromUrl(
    pokemon.url
  );

  const flipCard = async () => {
    setIsFlipped(!isFlipped);
    await controls.start({ rotateY: isFlipped ? 0 : 180 });
  };

  const formatPokemonNumber = (number: string): string => {
    return `#${String(number).padStart(4, "0")}`;
  };

  const formatMeasurement = (
    value: number,
    unit: string
  ): string => {
    return `${value} ${unit}`;
  };

  return (
    <div className="flex items-center justify-center flex-col relative">
      <motion.div
        className="cursor-pointer"
        animate={controls}
        onClick={flipCard}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="bg-gray-700 flex items-center rounded-md p-1 relative"
          initial={{ rotateY: 0 }}
          variants={{
            front: { rotateY: 0 },
            back: { rotateY: 180 },
          }}
          animate={isFlipped ? "back" : "front"}
        >
          <div className="absolute top-0 left-0 text-white font-bold p-3 text-5xl">
            {!isFlipped &&
              formatPokemonNumber(pokemonNumber || "")}
          </div>
          {!isFlipped ? (
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonNumber}.png`}
              width={220}
              height={220}
              alt="pokemon image"
              className="z-[9999]"
            />
          ) : (
            <div className="w-[220px] h-[220px] bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-white flex flex-col gap-2">
                <p className="bg-blue-800 px-2 rounded-md">
                  Height:{" "}
                  {data?.height &&
                    formatMeasurement(
                      data.height / 10,
                      "meters"
                    )}
                </p>
                <p className="bg-blue-800 px-2 rounded-md">
                  Weight:{" "}
                  {data?.weight &&
                    formatMeasurement(
                      data.weight / 10,
                      "meters"
                    )}
                </p>
                <div className="flex flex-col text-center">
                  <h3 className="font-bold text-xl underline">
                    Abilities
                  </h3>
                  {data?.abilities &&
                    data.abilities.map((ability, index) => (
                      <span key={index}>
                        {ability.ability.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      <span className="font-bold px-1 rounded-md my-5 uppercase text-white">
        {pokemon.name}
      </span>
      <div className="flex gap-5">
        {data?.types &&
          data.types.map((type, index) => (
            <Type
              key={index}
              typeName={
                type.type.name as
                  | "fire"
                  | "grass"
                  | "water"
                  | "electric"
                  | "poison"
              }
            />
          ))}
      </div>
    </div>
  );
};

export default PokemonCard;
