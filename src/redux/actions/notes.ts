import { AppDispatch, RootState } from "../store/store";
import { db } from "../../firebase/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Note, NotesReducerActions, SemiNote } from "../reducers/notesReducer";
import { loadNotes } from "../../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    const newNote: SemiNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (
  id: string,
  note: SemiNote
): NotesReducerActions => ({
  type: "[Notes] Set active note",
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (
  id: string,
  note: SemiNote
): NotesReducerActions => ({
  type: "[Notes] New note",
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    const notes: Note[] = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

const setNotes = (notes: Note[]): NotesReducerActions => ({
  type: "[Notes] Load notes",
  payload: notes,
});

export const startSaveNote = (note: Note) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
    await updateDoc(noteRef, noteToFirestore);

    dispatch(refreshNote(note.id!, noteToFirestore));
    Swal.fire("Save", note.title, "success");
  };
};

export const refreshNote = (id: string, note: Note): NotesReducerActions => ({
  type: "[Notes] Updated note",
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file: File) => {
  return async (dispatch: any, getState: () => RootState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl: string = await fileUpload(file);
    activeNote!.url = fileUrl;

    dispatch(startSaveNote(activeNote!));

    Swal.close();
  };
};

export const startDeleting = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const uid = getState().auth.uid;
    const noteRef = doc(db, `${uid}/journal/notes/${id}`);
    await deleteDoc(noteRef);

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id: string): NotesReducerActions => ({
  type: "[Notes] Delete note",
  payload: id,
});

export const noteLogout = (): NotesReducerActions => ({
  type: "[Notes] Logout Cleaning",
});
