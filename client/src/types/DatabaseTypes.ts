export type Movie = {
  tconst: string;
  title_type: string;
  primary_title: string;
  original_title: string;
  is_adult: boolean;
  end_year: number | null;
  start_year: number;
  runtime_minutes: number | null;
  genres: string | null;
  liked?: boolean;
};

export type User = {
  username: string;
};

export type Like = {
  liked: boolean;
};
