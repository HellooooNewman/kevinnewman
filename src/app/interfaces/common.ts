export interface Project {
  id: string;
  title: string;
  thumbnail_img: string;
  main_img: string;
  body: string;
  start_date: string;
  end_date: string;
  gallery: Gallery[];
  project_type: string;
  project_url: string;
  roles: string;
  tasks: string[];
  promote: boolean;
  videos: Video[];
  archived: boolean;
}

export interface Gallery {
  url: string;
  alt: string;
}

export interface Video {
  url: string;
}

export interface GameJam {
  cover_url: string;
  created_at: string;
  downloads_count: number;
  id: number;
  min_price: number;
  p_android: boolean;
  p_linux: boolean;
  p_osx: boolean;
  p_windows: boolean;
  published: boolean;
  published_at: string;
  purchases_count: number;
  short_text: string;
  title: string;
  type: string;
  url: string;
  views_count: number;
}

interface Earning {
  currency: string;
  amount_formatted: string;
  amount: number;
}
