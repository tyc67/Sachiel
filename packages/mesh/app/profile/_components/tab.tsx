'use client'

import {
  type TabCategoryType,
  type UserType,
  TabCategory,
} from '@/types/profile'

type TabProps = {
  setCategory?: (newCategory: TabCategoryType) => void
  tabCategory?: TabCategoryType
  userType: UserType
}

type TabItem = {
  tabName: string
  tabCategory: TabCategoryType
}

const Tab = ({ tabCategory, setCategory, userType }: TabProps) => {
  const activeTabStyle =
    'after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800 text-primary-700'
  const inactiveTabStyle = 'text-primary-400'

  function handleTabOnClick(category: TabCategoryType) {
    if (!setCategory) return
    setCategory(category)
  }

  const tabList: TabItem[] = [
    { tabName: '精選', tabCategory: TabCategory.PICKS },
    { tabName: '集錦', tabCategory: TabCategory.COLLECTIONS },
    { tabName: '書籤', tabCategory: TabCategory.BOOKMARKS },
    { tabName: '報導', tabCategory: TabCategory.PUBLISH },
  ]

  const tabFilter = (item: TabItem) => {
    if (userType === 'visitor') {
      return (
        item.tabCategory === TabCategory.PICKS ||
        item.tabCategory === TabCategory.COLLECTIONS
      )
    }
    if (userType === 'publisher') {
      return item.tabCategory === TabCategory.PUBLISH
    }
    return (
      item.tabCategory === TabCategory.PICKS ||
      item.tabCategory === TabCategory.COLLECTIONS ||
      item.tabCategory === TabCategory.BOOKMARKS
    )
  }

  return (
    <ul
      className="flex h-[48px] w-full items-center justify-around border-y border-primary-200 bg-white
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px] lg:pl-10"
    >
      {tabList
        .filter(tabFilter)
        .map(({ tabName, tabCategory: itemCategory }) => (
          <li
            key={tabName}
            onClick={() => handleTabOnClick(itemCategory)}
            className={`button-large relative cursor-pointer p-[14px] pt-3 sm:px-8 sm:py-[13px] ${
              itemCategory === tabCategory ? activeTabStyle : inactiveTabStyle
            }`}
          >
            {tabName}
          </li>
        ))}
    </ul>
  )
}

export default Tab
