import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  const { notes } = useAppSelector((state) => state.notes);
  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};
