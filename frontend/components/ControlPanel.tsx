/**
 * 控制面板组件 - 视角和风格选择
 */

'use client';

import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  viewAngle: string;
  style: string;
  onViewAngleChange: (angle: string) => void;
  onStyleChange: (style: string) => void;
  disabled?: boolean;
}

const VIEW_ANGLES = [
  { value: 'perspective', label: '透视图', icon: '📐' },
  { value: 'front', label: '正视图', icon: '⬜' },
  { value: 'side', label: '侧视图', icon: '◻️' },
  { value: 'top', label: '俯视图', icon: '⬛' },
];

const STYLES = [
  { value: 'realistic', label: '写实风格', description: '超写实摄影风格' },
  { value: 'technical', label: '技术线稿', description: '工程制图风格' },
  { value: 'cartoon', label: '简约卡通', description: '彩色插画风格' },
];

export default function ControlPanel({
  viewAngle,
  style,
  onViewAngleChange,
  onStyleChange,
  disabled,
}: ControlPanelProps) {
  return (
    <div className={styles.container}>
      {/* 视角选择 */}
      <div className={styles.section}>
        <h3 className={styles.title}>视角选择</h3>
        <div className={styles.optionGrid}>
          {VIEW_ANGLES.map((angle) => (
            <button
              key={angle.value}
              className={`${styles.option} ${
                viewAngle === angle.value ? styles.active : ''
              }`}
              onClick={() => onViewAngleChange(angle.value)}
              disabled={disabled}
            >
              <span className={styles.icon}>{angle.icon}</span>
              <span className={styles.label}>{angle.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 风格选择 */}
      <div className={styles.section}>
        <h3 className={styles.title}>风格选择</h3>
        <div className={styles.styleList}>
          {STYLES.map((s) => (
            <button
              key={s.value}
              className={`${styles.styleOption} ${
                style === s.value ? styles.active : ''
              }`}
              onClick={() => onStyleChange(s.value)}
              disabled={disabled}
            >
              <div className={styles.styleLabel}>{s.label}</div>
              <div className={styles.styleDescription}>{s.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
