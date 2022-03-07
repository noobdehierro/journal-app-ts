import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { startSaveNote, startUploading } from "../../redux/actions/notes";
import { useAppSelector } from "../../redux/hooks";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useAppSelector((state) => state.notes);

  const handleSave = () => {
    dispatch( startSaveNote( active! ) );
  };
  const handlePicktureClick = () => {
    const ButtonElement = document.querySelector(
      "#fileSelector"
    ) as HTMLElement;
    ButtonElement.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        dispatch(startUploading(file))
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={ handleFileChange }
      />

      <div>
        <button
          className="btn"
          onClick={ handlePicktureClick }
        >
          Picture
        </button>

        <button
          className="btn"
          onClick={ handleSave }
        >
          Save
        </button>
      </div>
    </div>
  );
};
