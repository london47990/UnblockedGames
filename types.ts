
export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  iframeUrl: string;
  rating: number;
}

export type Category = 'All' | 'Action' | 'Puzzle' | 'Sports' | 'Arcade' | 'Retro';
