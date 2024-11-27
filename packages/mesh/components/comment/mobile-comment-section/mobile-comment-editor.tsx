'use client'
import React, { useRef } from 'react'
import { createPortal } from 'react-dom'

import Avatar from '@/components/story-card/avatar'
import { EditDrawerBlockType, useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'

const MobileCommentEditor = () => {
  const { state, dispatch, handleCommentEdit } = useComment()
  const { isEditingComment } = state
  const { user } = useUser()
  const { name, avatar } = user
  const commentEditorRef = useRef(null)
  const isEditingInProfile =
    state.commentEditState.displayMode === EditDrawerBlockType.Profile
  const handleCloseCommentEditor = () => {
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: false } })
  }
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_DRAFT', payload: e.target.value })
  }
  useClickOutside(commentEditorRef, handleCloseCommentEditor)
  if (!isEditingComment) return null
  return (
    <>
      {isEditingInProfile &&
        createPortal(
          <div className="fixed inset-0 z-10 bg-lightbox-dark" />,
          document.body
        )}
      <div
        ref={commentEditorRef}
        className=" fixed inset-x-0 bottom-0 z-40 flex h-[216px] w-screen flex-col bg-white p-5 pt-3"
      >
        <section className="flex items-center justify-start gap-2">
          <Avatar src={avatar} size="l" />
          <p className="subtitle-2">{name}</p>
        </section>
        <textarea
          className="body-2 mt-3 flex max-h-24 grow overflow-y-scroll outline-none"
          name="editComment"
          id="editComment"
          onChange={handleTextChange}
          value={state.commentEditState.content}
        />
        <section
          onClick={() => handleCommentEdit(user)}
          className="body-2 flex items-center justify-end text-custom-blue"
        >
          {/** TODO: 如果在個人檔案為儲存*/}
          {state.commentEditState.content.trim()
            ? isEditingInProfile
              ? '儲存'
              : '送出'
            : '取消編輯'}
        </section>
      </div>
    </>
  )
}

export default MobileCommentEditor
