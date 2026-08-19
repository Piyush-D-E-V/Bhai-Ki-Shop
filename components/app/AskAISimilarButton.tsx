"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatActions } from "@/lib/store/chat-store-provider";

interface AskAISimilarButtonProps {
  productName: string;
}

export function AskAISimilarButton({
  productName,
}: AskAISimilarButtonProps) {
  const { openChatWithMessage } = useChatActions();

  const handleClick = () => {
    openChatWithMessage(
      `Show me products similar to "${productName}"`,
    );
  };

  return (
    <Button
      onClick={handleClick}
      className=" group  relative
        h-12
        w-full
        rounded-md
        border-2
        border-border
        bg-orange-400/80
        hover:bg-orange-400
        px-5
        text-sm
        font-black
        uppercase
        tracking-wide
        text-background
        shadow-[5px_5px_0px_var(--border)]
        transition-all
        duration-200
        hover:-translate-y-[2px]
        hover:shadow-[7px_7px_0px_var(--border)]
        active:translate-y-[2px]
        active:shadow-[2px_2px_0px_var(--border)]
      "
    >
      <Sparkles
        className="
          h-5
          w-5
          stroke-[3]
          transition-transform
          duration-200
          group-hover:rotate-12
          group-hover:scale-110
        "
      />

      <span>Ask AI for similar products</span>
    </Button>
  );
}