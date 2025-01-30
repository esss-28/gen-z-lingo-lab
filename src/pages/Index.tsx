import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import SlangCard from "@/components/SlangCard";
import AddSlangForm from "@/components/AddSlangForm";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [slangTerms, setSlangTerms] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
    fetchSlangTerms();
    const subscription = supabase
      .channel('public:slang_terms')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'slang_terms' 
      }, () => {
        fetchSlangTerms();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
    setIsLoading(false);
  };

  const fetchSlangTerms = async () => {
    const { data, error } = await supabase
      .from('slang_terms')
      .select('*')
      .order('votes_count', { ascending: false });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch slang terms",
        variant: "destructive",
      });
    } else {
      setSlangTerms(data || []);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const filteredSlang = slangTerms.filter(
    (slang) =>
      slang.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slang.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 space-y-8">
      <header className="flex justify-between items-center mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">
            Gen Z Dictionary
          </h1>
          <p className="text-muted-foreground">
            Stay updated with the latest slang! 🔥
          </p>
        </div>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </header>

      <SearchBar onSearch={setSearchTerm} />

      <div className="max-w-2xl mx-auto space-y-6">
        {filteredSlang.map((slang) => (
          <SlangCard key={slang.id} {...slang} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto pt-8">
        <AddSlangForm onSubmit={fetchSlangTerms} />
      </div>
    </div>
  );
};

export default Index;