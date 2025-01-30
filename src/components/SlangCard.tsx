import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "@/hooks/use-toast";

interface SlangCardProps {
  word: string;
  definition: string;
  example: string;
  votes: number;
}

const SlangCard = ({ word, definition, example, votes }: SlangCardProps) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: word,
        text: `${word}: ${definition}`,
        url: window.location.href,
      });
    } catch {
      toast({
        title: "Copied to clipboard!",
        description: "Share this slang with your friends 🔥",
      });
      navigator.clipboard.writeText(`${word}: ${definition}`);
    }
  };

  return (
    <Card className="glass p-6 space-y-4">
      <h3 className="text-2xl font-bold gradient-text">{word}</h3>
      <p className="text-foreground/80">{definition}</p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="italic text-sm">"{example}"</p>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {votes}
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default SlangCard;