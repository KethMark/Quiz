import { Question } from "@/types/quiz";
import {
  QueryObserverRefetchErrorResult,
  QueryObserverLoadingErrorResult,
} from "@tanstack/react-query";
import React from "react";

export const ErrorQuestion = ({
  questions,
}: {
  questions:
    | QueryObserverRefetchErrorResult<Question[], Error>
    | QueryObserverLoadingErrorResult<Question[], Error>;
}) => {
  return (
    <div className="flex items-center justify-center gap-2 h-screen">
      Error loading questions: {questions.error.message}
    </div>
  );
};
