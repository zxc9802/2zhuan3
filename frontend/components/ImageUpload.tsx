/**
 * 图片上传组件
 */

'use client';

import { useRef, useState } from 'react';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  onImageSelect: (base64: string, file: File) => void;
  disabled?: boolean;
}

export default function ImageUpload({ onImageSelect, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('请上传 JPG 或 PNG 格式的图片');
      return;
    }

    // 验证文件大小 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('图片大小不能超过 10MB');
      return;
    }

    // 读取文件并转换为base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      onImageSelect(base64, file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''} ${
          disabled ? styles.disabled : ''
        } ${preview ? styles.hasPreview : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" />
            <div className={styles.overlay}>
              <span>点击或拖拽更换图片</span>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>拖拽图片到这里或点击上传</p>
            <span>支持 JPG、PNG 格式，最大 10MB</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleInputChange}
          disabled={disabled}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
