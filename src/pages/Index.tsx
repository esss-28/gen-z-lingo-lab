import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SlangCard from "@/components/SlangCard";
import AddSlangButton from "@/components/AddSlangButton";

// Temporary data - will be replaced with API calls
const MOCK_SLANG = [
  {
    word: "bussin",
    definition: "Something that's really good or amazing",
    example: "Yo, this new restaurant is bussin fr fr!",
    votes: 423,
  },
  {
    word: "no cap",
    definition: "No lie or no fake",
    example: "This party is lit, no cap!",
    votes: 389,
  },
  {
    word: "slay",
    definition: "To do something exceptionally well",
    example: "You finished that project in one day? Slay queen! 👑",
    votes: 567,
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSlang = MOCK_SLANG.filter(
    (slang) =>
      slang.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slang.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 space-y-8">
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold gradient-text">
          Gen Z Dictionary
        </h1>
        <p className="text-muted-foreground">
          Stay updated with the latest slang! 🔥
        </p>
      </header>

      <SearchBar onSearch={setSearchTerm} />

      <div className="max-w-2xl mx-auto space-y-6">
        {filteredSlang.map((slang) => (
          <SlangCard key={slang.word} {...slang} />
        ))}
      </div>

      <AddSlangButton />
    </div>
  );
};

export default Index;