"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useAuth } from "@clerk/nextjs";
import { Sparkles, Send, Loader2, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useIsChatOpen,
  useChatActions,
  usePendingMessage,
} from "@/lib/store/chat-store-provider";

import {
  getMessageText,
  getToolParts,
  WelcomeScreen,
  MessageBubble,
  ToolCallUI,
} from "./chat";

export function ChatSheet() {
  const isOpen = useIsChatOpen();
  const { closeChat, clearPendingMessage } = useChatActions();
  const pendingMessage = usePendingMessage();
  const { isSignedIn } = useAuth();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom when new messages arrive or streaming updates
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger scroll on message/loading changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle pending message - send it when chat opens
  useEffect(() => {
    if (isOpen && pendingMessage && !isLoading) {
      sendMessage({ text: pendingMessage });
      clearPendingMessage();
    }
  }, [isOpen, pendingMessage, isLoading, sendMessage, clearPendingMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only visible on mobile/tablet (< xl) */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l-4 border-border bg-background overscroll-contain sm:w-[448px] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <header className="shrink-0 border-b-4 border-border bg-yellow-400">
          <div className="flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-black">
              <Sparkles className="h-6 w-6 stroke-[2.5]" />
              AI Assistant
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeChat}
              className="h-10 w-10 rounded-[10px] border-2 border-black bg-white text-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_black] active:translate-y-[2px] active:shadow-none"
            >
              <X className="h-5 w-5 stroke-[3]" />
            </Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
          {messages.length === 0 ? (
            <WelcomeScreen
              onSuggestionClick={sendMessage}
              isSignedIn={isSignedIn ?? false}
            />
          ) : (
            <div className="space-y-6">
              {messages.map((message) => {
                const content = getMessageText(message);
                const toolParts = getToolParts(message);
                const hasContent = content.length > 0;
                const hasTools = toolParts.length > 0;

                if (!hasContent && !hasTools) return null;

                return (
                  <div key={message.id} className="space-y-4">
                    {/* Tool call indicators */}
                    {hasTools &&
                      toolParts.map((toolPart) => (
                        <ToolCallUI
                          key={`tool-${message.id}-${toolPart.toolCallId}`}
                          toolPart={toolPart}
                          closeChat={closeChat}
                        />
                      ))}

                    {/* Message content */}
                    {hasContent && (
                      <MessageBubble
                        role={message.role}
                        content={content}
                        closeChat={closeChat}
                      />
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-4 pl-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-2 border-border bg-yellow-400 shadow-[4px_4px_0px_var(--border)]">
                    <Bot className="h-6 w-6 stroke-[2.5] text-black" />
                  </div>
                  <div className="flex items-center gap-2 rounded-[10px] border-2 border-border bg-card px-5 py-4 shadow-[4px_4px_0px_var(--border)]">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]" />
                      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-foreground [animation-delay:-0.15s]" />
                      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-foreground" />
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t-4 border-border bg-card px-4 py-4 p-5">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our gear..."
              disabled={isLoading}
              className="flex-1 rounded-[10px] border-2 border-border bg-background px-4 py-6 font-bold text-foreground shadow-[inset_2px_2px_0px_var(--border)] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-[52px] w-[52px] shrink-0 rounded-[10px] border-2 border-border bg-foreground text-background shadow-[4px_4px_0px_var(--border)] transition-all hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_var(--border)]"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin stroke-[2.5]" />
              ) : (
                <Send className="h-6 w-6 stroke-[2.5] translate-x-[-2px] translate-y-[2px]" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}