import { leaders } from './leaders.js';
import { chapterArt } from './chapterArt.js';
export const storyChapters = leaders.map((leader, index) => ({
  ...leader,
  index,
  id: `chapter-${index}`,
  artwork: chapterArt[index],
  number: String(index + 1).padStart(2, '0'),
  initials: leader.name.split(' ').map(word => word[0]).slice(0, 2).join(''),
  // Reuse the supplied curatorial writing; don't manufacture missing stories.
  narrative: leader.magazineContent.narrative || '',
  chapterTitle: leader.magazineContent.chapterTitle?.includes('TAFAWA BALEWA') && index !== 0
    ? leader.name : leader.magazineContent.chapterTitle || leader.name,
}));
export function chapterFromHash(hash) {
  const match = /^#chapter-(\d+)$/.exec(hash);
  const index = match ? Number(match[1]) : -1;
  return index >= 0 && index < storyChapters.length ? index : -1;
}
export function storyBeats(chapter) {
  const sentences = chapter.narrative.match(/[^.!?]+[.!?…]+|[^.!?]+$/g)?.map(s => s.trim()).filter(Boolean) || [];
  if (sentences.length <= 3) return sentences.length ? sentences : ['The curatorial story for this chapter is being prepared.'];
  const size = Math.ceil(sentences.length / 3);
  return [sentences.slice(0,size).join(' '),sentences.slice(size,size*2).join(' '),sentences.slice(size*2).join(' ')].filter(Boolean);
}
