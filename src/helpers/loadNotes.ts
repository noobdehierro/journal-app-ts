import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid: string) => {
  const notesSnap = await getDocs(
    query(collection(db, `${uid}/journal/notes`))
  );
  const notes: any[] = [];

  notesSnap.forEach((snapHijo) => {
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  // console.log(notes)

  return notes;
};
