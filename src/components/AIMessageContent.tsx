import { useMemo } from "react";
import AICodeBlock from "./AICodeBlock";

interface AIMessageContentProps {
  content: string;
}

interface ContentPart {
  type: "text" | "code";
  content: string;
  language?: string;
}

const AIMessageContent = ({ content }: AIMessageContentProps) => {
  const parts = useMemo(() => {
    const result: ContentPart[] = [];
    // Match code blocks with optional language: ```language\ncode\n```
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before this code block
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index).trim();
        if (textContent) {
          result.push({ type: "text", content: textContent });
        }
      }

      // Add code block
      const language = match[1] || "plaintext";
      const code = match[2].trim();
      if (code) {
        result.push({ type: "code", content: code, language });
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      const textContent = content.slice(lastIndex).trim();
      if (textContent) {
        result.push({ type: "text", content: textContent });
      }
    }

    // If no parts found, return the whole content as text
    if (result.length === 0 && content.trim()) {
      result.push({ type: "text", content: content.trim() });
    }

    return result;
  }, [content]);

  const formatText = (text: string) => {
    // Handle inline code
    let formatted = text.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-primary">$1</code>'
    );

    // Handle bold text
    formatted = formatted.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );

    // Handle italic text
    formatted = formatted.replace(
      /\*([^*]+)\*/g,
      '<em>$1</em>'
    );

    // Handle bullet points
    formatted = formatted.replace(
      /^[•\-]\s+(.+)$/gm,
      '<li class="ml-4 list-disc">$1</li>'
    );

    // Wrap consecutive list items in ul
    formatted = formatted.replace(
      /(<li[^>]*>.*?<\/li>\n?)+/g,
      '<ul class="space-y-1 my-2">$&</ul>'
    );

    // Handle line breaks
    formatted = formatted.replace(/\n/g, "<br />");

    return formatted;
  };

  return (
    <div className="space-y-2">
      {parts.map((part, index) => (
        <div key={index}>
          {part.type === "code" ? (
            <AICodeBlock code={part.content} language={part.language || "plaintext"} />
          ) : (
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatText(part.content) }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AIMessageContent;
