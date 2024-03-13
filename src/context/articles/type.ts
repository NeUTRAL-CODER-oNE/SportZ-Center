export interface ArticlesState {
  articles: Articles[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type Articles = {
  id: string;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content: string;
  summary: string;
  teams: Teams[];
};

export type Teams = {
  id: number;
  name: string;
};

export enum ArticlesAvailableAction {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",

  REORDER_ARTICLES = "REORDER_ARTICLES",

}

export type ArticlesActions =
  | { type: ArticlesAvailableAction.REORDER_ARTICLES; payload: Articles }
  | { type: ArticlesAvailableAction.FETCH_ARTICLES_REQUEST }
  | {
      type: ArticlesAvailableAction.FETCH_ARTICLES_SUCCESS;
      payload: Articles[];
    }
  | { type: ArticlesAvailableAction.FETCH_ARTICLES_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type ArticlesDispatch = React.Dispatch<ArticlesActions>;
