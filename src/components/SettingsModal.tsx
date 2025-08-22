'use client'

import { Button, Modal, Label, RangeInput, Select } from '@abhishekbarve/components'
import { FaRotateLeft } from 'react-icons/fa6'
import {
  FONT_SIZES,
  LETTER_SPACING,
  LINE_HEIGHTS,
  FONT_OPTIONS,
  THEME_OPTIONS,
} from '@/lib/constants'
import { useStore } from '@/stores/store'
import type { Theme } from '@/lib/types'

export const SETTINGS_MODAL_ID = 'settings-modal'

function SettingsModal() {
  const { settings, onUpdateSettings, onResetSettings } = useStore()
  return (
    <Modal id={SETTINGS_MODAL_ID} centered={false}>
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
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ fontSize: FONT_SIZES.small })}
                  active={settings.fontSize === FONT_SIZES.small}
                >
                  Small
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ fontSize: FONT_SIZES.medium })}
                  active={settings.fontSize === FONT_SIZES.medium}
                >
                  Medium
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ fontSize: FONT_SIZES.large })}
                  active={settings.fontSize === FONT_SIZES.large}
                >
                  Large
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ fontSize: FONT_SIZES.extraLarge })}
                  active={settings.fontSize === FONT_SIZES.extraLarge}
                >
                  Extra Large
                </Button>
              </div>
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
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ lineHeight: LINE_HEIGHTS.tight })}
                  active={settings.lineHeight === LINE_HEIGHTS.tight}
                >
                  Tight
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ lineHeight: LINE_HEIGHTS.normal })}
                  active={settings.lineHeight === LINE_HEIGHTS.normal}
                >
                  Normal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ lineHeight: LINE_HEIGHTS.relaxed })}
                  active={settings.lineHeight === LINE_HEIGHTS.relaxed}
                >
                  Relaxed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ lineHeight: LINE_HEIGHTS.loose })}
                  active={settings.lineHeight === LINE_HEIGHTS.loose}
                >
                  Loose
                </Button>
              </div>
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

            <div className="space-y-2">
              <Label htmlFor="letter-spacing">Letter Spacing: {settings.letterSpacing}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ letterSpacing: LETTER_SPACING.extraTight })}
                  active={settings.letterSpacing === LETTER_SPACING.extraTight}
                >
                  Tight
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ letterSpacing: LETTER_SPACING.tight })}
                  active={settings.letterSpacing === LETTER_SPACING.tight}
                >
                  Normal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ letterSpacing: LETTER_SPACING.normal })}
                  active={settings.letterSpacing === LETTER_SPACING.normal}
                >
                  Relaxed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ letterSpacing: LETTER_SPACING.wide })}
                  active={settings.letterSpacing === LETTER_SPACING.wide}
                >
                  Wide
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ letterSpacing: LETTER_SPACING.wider })}
                  active={settings.letterSpacing === LETTER_SPACING.wider}
                >
                  Wider
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateSettings({ letterSpacing: LETTER_SPACING.widest })}
                  active={settings.letterSpacing === LETTER_SPACING.widest}
                >
                  Widest
                </Button>
              </div>
              <RangeInput
                id="letter-spacing"
                min={0.05}
                max={0.5}
                step={0.05}
                value={settings.letterSpacing}
                onChange={(e) => onUpdateSettings({ letterSpacing: parseFloat(e.target.value) })}
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
