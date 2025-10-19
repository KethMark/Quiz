import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderOpen } from "lucide-react";

import React from "react";

export const EmptyQuestion = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderOpen />
          </EmptyMedia>
          <EmptyTitle>No Available Question Yet</EmptyTitle>
          <EmptyDescription>
            We haven&apos;t created any Questions yet. We started by creating
            your first question.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent></EmptyContent>
      </Empty>
    </div>
  );
};
