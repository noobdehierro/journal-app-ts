import React from "react";
import { useDispatch } from "react-redux";
import { JournalEntries } from "./JournalEntries";
import { startLogout } from "../../redux/actions/auth";
import { useAppSelector } from "../../redux/hooks";
import { startNewNote } from "../../redux/actions/notes";

export const Sidebar = () => {
  const { name } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hanleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>

        <button className="btn" onClick={hanleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
