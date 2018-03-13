export interface Project {
  id: string;
  title: string;
  thumbnail_img: string;
  main_img: string;
  body: string;
  start_date: string;
  end_date: string;
  gallery: Gallery;
  project_type: string;
  project_url: string;
  roles: string;
  tasks: Task[];
  promote: string;
  videos: Video;
}

export interface Task {
  task: string;
}

export interface Gallery {
  url: string;
  alt: string;
}

export interface Video {
  url: string;
}
