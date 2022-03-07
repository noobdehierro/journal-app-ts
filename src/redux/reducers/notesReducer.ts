export interface SemiNote {
  title: string;
  body: string;
  date: number;
  url?: string;
}

export interface Note extends SemiNote {
  id?: string;
}

interface NotesReducer {
  notes: Note[];
  active: null | Note;
}

export type NotesReducerActions =
  | { type: "[Notes] New note"; payload: Note }
  | { type: "[Notes] Set active note"; payload: Note }
  | { type: "[Notes] Load notes"; payload: Note[] }
  | { type: "[Notes] Updated note"; payload: { id: string; note: Note } }
  | { type: "[Notes] Updated image url" }
  | { type: "[Notes] Delete note"; payload: string }
  | { type: "[Notes] Logout Cleaning" };

const initialNotesReducer = {
  notes: [],
  active: null,
};

export const notesReducer = (
  state: NotesReducer = initialNotesReducer,
  action: NotesReducerActions
): NotesReducer => {
  switch (action.type) {
    case "[Notes] Set active note":
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case "[Notes] New note":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case "[Notes] Load notes":
      return {
        ...state,
        notes: [...action.payload],
      };
    case "[Notes] Updated note":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case "[Notes] Delete note":
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case "[Notes] Logout Cleaning":
      return {
        active: null,
        notes: [],
      };
    default:
      return state;
  }
};
