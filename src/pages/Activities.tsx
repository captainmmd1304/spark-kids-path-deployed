import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const colors = ["primary", "secondary", "accent", "success"];

const Activities = () => {
  const [score, setScore] = useState(0);
  const [currentColor, setCurrentColor] = useState("");
  const [displayedColor, setDisplayedColor] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const colorMap: Record<string, string> = {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))",
    success: "hsl(var(--success))"
  };

  const colorNames: Record<string, string> = {
    primary: "Blue",
    secondary: "Purple",
    accent: "Yellow",
    success: "Green"
  };

  const generateRound = () => {
    const correctColor = colors[Math.floor(Math.random() * colors.length)];
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    
    setCurrentColor(correctColor);
    setDisplayedColor(correctColor);
    setOptions(shuffledColors);
  };

  const handleAnswer = (selectedColor: string) => {
    if (selectedColor === currentColor) {
      setScore(score + 10);
      setStreak(streak + 1);
      toast.success("Correct! Well done!", {
        description: `+10 points! Streak: ${streak + 1}`,
      });
      generateRound();
    } else {
      setStreak(0);
      toast.error("Not quite! Try again!", {
        description: "Keep practicing, you're doing great!",
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    generateRound();
  };

  return (
    <div className="min-h-screen bg-gradient-calm py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold">Focus & Memory Game</h1>
          <p className="text-muted-foreground">
            Match the color name with the correct color. Build your focus and memory skills!
          </p>
        </div>

        {!gameStarted ? (
          <Card className="p-12 text-center shadow-soft">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">Ready to Play?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              This activity helps improve focus, color recognition, and quick decision-making. 
              Click the correct color as fast as you can!
            </p>
            <Button size="lg" onClick={startGame} className="gap-2">
              Start Game
              <Star className="h-4 w-4" />
            </Button>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex gap-4">
              <Card className="flex-1 p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-3xl font-bold">{score}</p>
                  </div>
                </div>
              </Card>
              <Card className="flex-1 p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Streak</p>
                    <p className="text-3xl font-bold">{streak}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-12 shadow-soft">
              <div className="mb-12 text-center">
                <p className="mb-4 text-lg text-muted-foreground">What color is this?</p>
                <div
                  className="mx-auto mb-4 inline-block rounded-3xl px-12 py-8 text-5xl font-bold shadow-button transition-transform hover:scale-105"
                  style={{ backgroundColor: colorMap[displayedColor], color: "white" }}
                >
                  {colorNames[displayedColor]}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {options.map((color) => (
                  <Button
                    key={color}
                    size="lg"
                    onClick={() => handleAnswer(color)}
                    className="h-24 text-xl font-semibold transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: colorMap[color],
                      color: "white"
                    }}
                  >
                    {colorNames[color]}
                  </Button>
                ))}
              </div>
            </Card>

            <div className="mt-6 text-center">
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  View Your Progress
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Activities;
