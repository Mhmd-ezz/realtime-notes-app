import type { BaseResponse, Pagination } from "./api";

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}
export type CreateNoteInput = {
  title: string;
  content: string;
};
export type UpdateNoteInput = {
  _id: string;
  title: string;
  content: string;
};

export interface DeleteNoteInput {
  _id: string;
}
export type NoteResponse = BaseResponse<Note>;
export type NotesResponse = BaseResponse<Note[]>;
export type CreateNoteResponse = BaseResponse<Note>;
export type UpdateNoteResponse = BaseResponse<Note>;
export type DeleteNoteResponse = BaseResponse<null>;

export interface PaginatedNotesResponse extends BaseResponse<Note[]> {
  pagination: Pagination;
}

export interface SearchNotesResponse extends BaseResponse<Note[]> {
  totalResults: number;
}