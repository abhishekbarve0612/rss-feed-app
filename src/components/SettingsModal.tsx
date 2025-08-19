'use client'

import { Button, Modal, Label, RangeInput, Select } from '@abhishekbarve/components'
import { FaRotateLeft } from 'react-icons/fa6'
import type { ReadingSettings } from '@/lib/types'

interface SettingsDialogProps {
  settings: ReadingSettings
  onUpdateSettings: (settings: Partial<ReadingSettings>) => void
  onResetSettings: () => void
}

const FONT_OPTIONS = [
  { value: 'system', label: 'System Default' },
  { value: 'serif', label: 'Serif (Times)' },
  { value: 'sans', label: 'Sans Serif (Arial)' },
  { value: 'mono', label: 'Monospace' },
]

type Theme = 'light' | 'dark' | 'sepia'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'sepia', label: 'Sepia' },
]

function SettingsModal({ settings, onUpdateSettings, onResetSettings }: SettingsDialogProps) {
  return (
    <Modal id="settings-modal" centered={false}>
      <Modal.Header>Reading Settings</Modal.Header>
      <Modal.Body className="sm:max-w-[500px]">
        <p>Customize your reading experience with font, spacing, and theme options.</p>

        <div className="space-y-6 py-4">
          {/* Typography Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Typography</h3>

            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select
                value={settings.fontFamily}
                onValueChange={(value) => onUpdateSettings({ fontFamily: value })}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  {FONT_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size: {settings.fontSize}px</Label>
              <RangeInput
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={settings.fontSize}
                onChange={(e) => onUpdateSettings({ fontSize: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="line-height">Line Height: {settings.lineHeight}</Label>
              <RangeInput
                id="line-height"
                min={1.2}
                max={2.0}
                step={0.1}
                value={settings.lineHeight}
                onChange={(e) => onUpdateSettings({ lineHeight: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <hr />

          {/* Layout Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Layout</h3>

            <div className="space-y-2">
              <Label htmlFor="max-width">Content Width: {settings.maxWidth}px</Label>
              <RangeInput
                id="max-width"
                min={600}
                max={1200}
                step={50}
                value={settings.maxWidth}
                onChange={(e) => onUpdateSettings({ maxWidth: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <hr />

          {/* Theme Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Theme</h3>

            <div className="space-y-2">
              <Label htmlFor="theme">Reading Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value: string) => onUpdateSettings({ theme: value as Theme })}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  {THEME_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className={`rounded-md border p-4 ${
                settings.theme === 'dark'
                  ? 'bg-gray-900 text-gray-100'
                  : settings.theme === 'sepia'
                    ? 'bg-amber-50 text-amber-900'
                    : 'bg-white text-gray-900'
              }`}
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight,
                fontFamily:
                  settings.fontFamily === 'serif'
                    ? 'serif'
                    : settings.fontFamily === 'sans'
                      ? 'sans-serif'
                      : settings.fontFamily === 'mono'
                        ? 'monospace'
                        : 'system-ui',
              }}
            >
              This is how your articles will look with the current settings. The quick brown fox
              jumps over the lazy dog.
            </div>
          </div>
        </div>

        <Modal.Footer className="flex justify-between">
          <Button variant="outline" onClick={onResetSettings}>
            <FaRotateLeft className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Modal.CloseButton>
            <Button>Done</Button>
          </Modal.CloseButton>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default SettingsModal
