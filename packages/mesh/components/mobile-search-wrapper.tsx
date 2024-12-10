import { useState } from 'react'

import Icon from './icon'
import SearchModal from './search-modal'

export default function MobileSearchWrapper() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const handleToggleModal = () => {
    setIsSearchModalOpen((prev) => !prev)
  }

  return (
    <>
      <button
        onClick={handleToggleModal}
        aria-label="Open search modal"
        aria-haspopup="dialog"
        aria-expanded={isSearchModalOpen}
      >
        <Icon size="2xl" iconName="icon-search" />
      </button>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  )
}
