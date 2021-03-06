import React, { useEffect, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";
import { useAppSelector } from "../../redux/hooks";
import { Note } from "../../redux/reducers/notesReducer";
import { useDispatch } from "react-redux";
import { activeNote, startDeleting } from "../../redux/actions/notes";

export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useAppSelector((state) => state.notes);

  const { handleInputChange, values, reset } = useForm<Note>(note!);

  const { id, body, title } = values;

  const activeId = useRef(note?.id);

  useEffect(() => {
    if (note?.id !== activeId.current) {
      reset(note!);
      activeId.current = note?.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(values.id!, { ...values }));
  }, [dispatch, values]);

  const handleDelete = () => {
    dispatch(startDeleting(id!));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note?.url && (
          <div className="notes__image">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>

      <button
        className="btn btn-danger"
          onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
