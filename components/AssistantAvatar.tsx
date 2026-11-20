import type { CSSProperties } from "react";
import BrandMark from "./BrandMark";

type AssistantAvatarProps = { size?: number };

export default function AssistantAvatar({ size = 64 }: AssistantAvatarProps) {
  return (
    <span
      className="assistant-avatar"
      style={{ "--avatar-size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      <BrandMark className="assistant-avatar-mascot" size={size} />
    </span>
  );
}
