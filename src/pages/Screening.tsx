import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    category: "Reading & Writing",
    question: "Does your child have difficulty recognizing letters or words they've seen before?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 2,
    category: "Attention",
    question: "Does your child struggle to stay focused on tasks or activities?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 3,
    category: "Emotional Well-being",
    question: "Does your child often seem worried, anxious, or unusually stressed?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 4,
    category: "Reading & Writing",
    question: "Does your child reverse letters or numbers when writing (e.g., 'b' and 'd')?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 5,
    category: "Social Skills",
    question: "Does your child have difficulty making or keeping friends?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  }
];

const Screening = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-calm py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <Card className="p-8 shadow-soft md:p-12">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h1 className="mb-4 text-4xl font-bold">Screening Complete!</h1>
              <p className="text-lg text-muted-foreground">
                Thank you for completing the screening assessment.
              </p>
            </div>

            <div className="mb-8 rounded-2xl bg-primary/5 p-6">
              <h2 className="mb-4 text-2xl font-semibold">Your Results Summary</h2>
              <p className="mb-4 text-muted-foreground">
                Based on your responses, we've identified some areas where your child might benefit 
                from additional support. This screening is not a diagnosis, but rather a helpful 
                starting point for understanding your child's needs.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Consider consulting with a learning specialist or educational psychologist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Explore our personalized activity recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Connect with our parent community for support and resources</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/activities" className="flex-1">
                <Button size="lg" className="w-full gap-2">
                  View Recommended Activities
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/resources" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Parent Resources
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold">Learning & Well-being Screening</h1>
          <p className="text-muted-foreground">
            This brief questionnaire helps identify areas where your child might need support.
          </p>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-soft md:p-12">
          <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {questions[currentQuestion].category}
          </div>
          
          <h2 className="mb-8 text-2xl font-semibold leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <RadioGroup
            value={answers[questions[currentQuestion].id]}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 rounded-xl border-2 border-border p-4 transition-all hover:border-primary hover:bg-primary/5"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id]}
              className="gap-2"
            >
              {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Screening;
