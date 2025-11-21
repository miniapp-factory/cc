"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Props = {
  answers: string[];
  onRetake: () => void;
};

const animalImages: Record<string, string> = {
  cat: "/cat.png",
  dog: "/dog.png",
  fox: "/fox.png",
  hamster: "/hamster.png",
  horse: "/horse.png",
};

export function QuizResult({ answers, onRetake }: Props) {
  const score: Record<string, number> = {
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  };

  answers.forEach((a) => {
    score[a] = (score[a] ?? 0) + 1;
  });

  const bestAnimal = Object.entries(score).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  const shareText = `I just took the Animal Quiz and I'm most like a ${bestAnimal}! ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are most like a {bestAnimal}!</h2>
      <img
        src={animalImages[bestAnimal]}
        alt={bestAnimal}
        width={256}
        height={256}
        className="rounded-md"
      />
      <div className="flex gap-2">
        <Share text={shareText} />
        <Button onClick={onRetake}>Retake Quiz</Button>
      </div>
    </div>
  );
}
