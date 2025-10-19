import { GradeResponse, Question } from "@/types/quiz";
import React from "react";
import { Button } from "./ui/button";
import { QueryObserverPendingResult, QueryObserverPlaceholderResult, QueryObserverSuccessResult } from "@tanstack/react-query";

export const Results = ({
  gradeResult,
  questions,
  handleReset,
}: {
  gradeResult: GradeResponse;
  questions: QueryObserverSuccessResult<Question[], Error> | QueryObserverPendingResult<Question[], Error> | QueryObserverPlaceholderResult<Question[], Error>
  handleReset: () => void;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <p className="text-lg mb-4">
        Total Score: {gradeResult.score}/{gradeResult.total}
      </p>
      <ul className="space-y-2">
        {gradeResult.results.map((r) => {
          const question = questions?.data?.find((q) => q.id === r.id);
          return (
            <li
              key={r.id}
              className={r.correct ? "text-green-500" : "text-red-500"}
            >
              {question?.question}: {r.correct ? "Correct" : "Incorrect"}
            </li>
          );
        })}
      </ul>
      <Button onClick={handleReset} className="mt-4 w-full">
        Try Again
      </Button>
    </div>
  );
};
