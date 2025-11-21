"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizResult } from "./quiz-result";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Meat", animal: "dog" },
      { text: "Fish", animal: "cat" },
      { text: "Grains", animal: "horse" },
      { text: "Seeds", animal: "hamster" },
      { text: "Leaves", animal: "fox" },
    ],
  },
  {
    text: "Which activity do you enjoy most?",
    options: [
      { text: "Running", animal: "horse" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Cuddling", animal: "cat" },
      { text: "Nibbling", animal: "hamster" },
      { text: "Hunting", animal: "fox" },
    ],
  },
  {
    text: "What is your preferred environment?",
    options: [
      { text: "Open fields", animal: "horse" },
      { text: "Urban parks", animal: "dog" },
      { text: "Homes", animal: "cat" },
      { text: "Cages", animal: "hamster" },
      { text: "Forests", animal: "fox" },
    ],
  },
  {
    text: "How would you describe your personality?",
    options: [
      { text: "Energetic", animal: "horse" },
      { text: "Loyal", animal: "dog" },
      { text: "Independent", animal: "cat" },
      { text: "Curious", animal: "hamster" },
      { text: "Sly", animal: "fox" },
    ],
  },
  {
    text: "What is your favorite pastime?",
    options: [
      { text: "Grazing", animal: "horse" },
      { text: "Chasing balls", animal: "dog" },
      { text: "Sleeping", animal: "cat" },
      { text: "Chewing", animal: "hamster" },
      { text: "Sneaking", animal: "fox" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return <QuizResult answers={answers} onRetake={resetQuiz} />;
  }

  const question = questions[current];
  const shuffledOptions = shuffleArray(question.options);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
