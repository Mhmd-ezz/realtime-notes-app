import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteDisplay from '@/components/notes/NoteDisplay';
import type { Note } from '@/types';

const mockNote: Note = {
  _id: '123',
  title: 'Test Note',
  content: 'This is a test note',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: 'user1',
  updatedBy: 'user1',
};

describe('NoteDisplay', () => {
  it('renders title and content', () => {
    render(
      <NoteDisplay
        note={mockNote}
        isBeingEditedBy={undefined}
        currentUserName="user1"
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note')).toBeInTheDocument();
  });

  it('calls onEdit when double-clicked', () => {
    const onEdit = jest.fn();
    render(
      <NoteDisplay
        note={mockNote}
        isBeingEditedBy={undefined}
        currentUserName="user1"
        onEdit={onEdit}
        onDelete={jest.fn()}
      />
    );
    fireEvent.doubleClick(screen.getByText('Test Note'));
    expect(onEdit).toHaveBeenCalled();
  });

  it('calls onEdit when edit button clicked from menu', () => {
    const onEdit = jest.fn();
    render(
      <NoteDisplay
        note={mockNote}
        isBeingEditedBy={undefined}
        currentUserName="user1"
        onEdit={onEdit}
        onDelete={jest.fn()}
      />
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const editMenuItem = screen.getByText(/edit/i);
    fireEvent.click(editMenuItem);

    expect(onEdit).toHaveBeenCalled();
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = jest.fn();
    render(
      <NoteDisplay
        note={mockNote}
        isBeingEditedBy={undefined}
        currentUserName="user1"
        onEdit={jest.fn()}
        onDelete={onDelete}
      />
    );
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const deleteMenuItem = screen.getByText(/delete/i);
    fireEvent.click(deleteMenuItem);

    expect(onDelete).toHaveBeenCalled();
  });
});
