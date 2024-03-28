import { fetchPokemon } from "./actions/getPokemon";
import LoadPokemon from "@/components/LoadPokemon";
import Search from "@/components/Search";
const Page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const search =
    typeof searchParams.search === "string"
      ? searchParams.search
      : undefined;

  const pokemon = await fetchPokemon({ search });
  return (
    <div className="max-w-[1500px] w-[95%] mx-auto">
      <Search search={search} />
      <ul key={Math.random()}>
        <LoadPokemon
          search={search}
          initialPokemon={pokemon}
        />
      </ul>
    </div>
  );
};

export default Page;
