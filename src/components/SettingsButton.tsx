import { Button, useModalManager } from '@abhishekbarve/components'
import { FaCog } from 'react-icons/fa'
import { SETTINGS_MODAL_ID } from './SettingsModal'

function SettingsButton() {
  const { openModal } = useModalManager()
  return (
    <Button
      variant="ghost"
      size="sm"
      id="settings-modal"
      asChild
      onClick={() => openModal(SETTINGS_MODAL_ID)}
    >
      <FaCog />
      Settings
    </Button>
  )
}

export default SettingsButton
