import { getInvalidNameList } from '@/app/actions/get-invalid-names'
import { INTRO_LIMITATION } from '@/constants/profile'
import type { EditProfileFormTypes } from '@/types/profile'

export async function profileFormValidation(
  form: EditProfileFormTypes
): Promise<Partial<EditProfileFormTypes>> {
  const customIdErrors = {
    empty: 'ID 不能空白',
    format: 'ID 只能包含英文字母和數字',
    space: 'ID 開頭和結尾不能有空白',
  }

  const errorMessages: Record<
    keyof EditProfileFormTypes,
    Record<string, string>
  > = {
    name: {
      empty: '名稱不能空白',
      duplicateNameWithPublisher: '不得與媒體名稱相同',
    },
    customId: { ...customIdErrors },
    intro: { exceedLength: '自我介紹超過字數上限' },
    avatar: { default: '' }, //TODO: Add an appropriate error message if needed
  }

  const invalidNames = await getInvalidNameList()

  const newErrors: Partial<EditProfileFormTypes> = {}

  const isUserNameEmpty = !form.name.trim()
  const isCustomIdEmpty = !form.customId.trim()
  const hasSpaceAroundCustomId = form.customId !== form.customId.trim()
  const hasInvalidCharacters = !/^[a-zA-Z0-9]+$/.test(form.customId)

  // user name
  if (isUserNameEmpty) newErrors.name = errorMessages.name.empty
  if (invalidNames?.length) {
    invalidNames.forEach((name) => {
      // 建立 RegExp 物件，'i' flag 代表 case insensitive
      const nameRegex = new RegExp(name, 'i')
      // 使用 test() 方法來檢查是否包含該名稱
      if (nameRegex.test(form.name)) {
        newErrors.name = errorMessages.name.duplicateNameWithPublisher
      }
    })
  }
  // custom id
  if (isCustomIdEmpty) {
    newErrors.customId = errorMessages.customId.empty
  }
  if (hasSpaceAroundCustomId) {
    newErrors.customId = errorMessages.customId.space
  }
  if (hasInvalidCharacters) {
    newErrors.customId = errorMessages.customId.format
  }
  // intro
  if (form.intro.length > INTRO_LIMITATION)
    newErrors.intro = errorMessages.intro.exceedLength
  return newErrors
}
