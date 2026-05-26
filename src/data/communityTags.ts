export const communityTags = [
  "burnout",
  "catarsis",
  "hardcore",
  "meme",
  "cinematic",
  "narrative",
  "procedural",
  "cursed",
  "psychological",
  "chaos",
  "experimental",
  "tactical",
  "boss-rush",
  "tribunal-vivo",
] as const;

export type CommunityTag = (typeof communityTags)[number];
