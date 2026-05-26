import { communityTags, type CommunityTag } from "@/data/communityTags";

export const isCommunityTag = (tag: string): tag is CommunityTag => communityTags.includes(tag as CommunityTag);

export function normalizeCommunityTags(tags: string[]) {
  return Array.from(new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(isCommunityTag))).slice(0, 8);
}
