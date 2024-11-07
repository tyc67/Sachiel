import { INTRO_LIMITATION } from '@/constants/profile'
import type { EditProfileFormTypes } from '@/types/profile'

export function profileFormValidation(
  form: EditProfileFormTypes
): Partial<EditProfileFormTypes> {
  const errorMessages: Record<keyof EditProfileFormTypes, string> = {
    name: '名稱不能空白',
    customId: '這個 ID 目前無法使用，請使用其他 ID',
    intro: '自我介紹超過字數上限',
    avatar: '', //TODO: Add an appropriate error message if needed
  }
  const customIdErrors = {
    empty: 'ID 不能空白',
    format: 'ID 只能包含英文字母和數字',
    space: 'ID 開頭和結尾不能有空白',
  }

  const newErrors: Partial<EditProfileFormTypes> = {}

  const isUserNameEmpty = form.name.trim()
  const isCustomIdEmpty = !form.customId.trim()
  const hasSpaceAroundCustomId = form.customId !== form.customId.trim()
  const hasInvalidCharacters = !/^[a-zA-Z0-9]+$/.test(form.customId)

  // user name
  if (isUserNameEmpty) newErrors.name = errorMessages.name
  // custom id
  if (isCustomIdEmpty) {
    newErrors.customId = customIdErrors.empty
  }
  if (hasSpaceAroundCustomId) {
    newErrors.customId = customIdErrors.space
  }
  if (hasInvalidCharacters) {
    newErrors.customId = customIdErrors.format
  }
  // intro
  if (form.intro.length > INTRO_LIMITATION)
    newErrors.intro = errorMessages.intro
  return newErrors
}
