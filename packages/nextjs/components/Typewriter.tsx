"use client";

import React, { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  typeSpeed?: number; // ms per char when typing
  deleteSpeed?: number; // ms per char when deleting
  delay?: number; // ms to wait when a full phrase is displayed
  className?: string;
  cursor?: string;
}

export default function Typewriter({
  texts,
  typeSpeed = 60,
  deleteSpeed = 40,
  delay = 1500,
  className = "",
  cursor = "|",
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subStr, setSubStr] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    const fullText = texts[index];

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // typing
      if (subStr.length < fullText.length) {
        timer = setTimeout(() => {
          setSubStr(fullText.slice(0, subStr.length + 1));
        }, typeSpeed);
      } else {
        // full word typed -> wait, then start deleting
        timer = setTimeout(() => setIsDeleting(true), delay);
      }
    } else {
      // deleting
      if (subStr.length > 0) {
        timer = setTimeout(() => {
          setSubStr(fullText.slice(0, subStr.length - 1));
        }, deleteSpeed);
      } else {
        // finished deleting -> next text
        setIsDeleting(false);
        setIndex(i => (i + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [subStr, isDeleting, index, texts, typeSpeed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {subStr}
      <span className="typewriter-cursor" aria-hidden>
        {cursor}
      </span>

      <style jsx>{`
        .typewriter-cursor {
          display: inline-block;
          margin-left: 4px;
          animation: tw-blink 1s steps(1) infinite;
          opacity: 1;
        }
        @keyframes tw-blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
