/**
 * 结果预览组件
 */

'use client';

import styles from './ResultPreview.module.css';

interface ResultPreviewProps {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
  processingTime?: number;
  onDownload?: () => void;
  onRegenerate?: () => void;
}

export default function ResultPreview({
  imageUrl,
  loading,
  error,
  processingTime,
  onDownload,
  onRegenerate,
}: ResultPreviewProps) {
  const handleDownload = () => {
    if (imageUrl && onDownload) {
      onDownload();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        {loading && (
          <div className={styles.loadingState}>
            <div className="loading-spinner"></div>
            <p>正在生成3D效果图...</p>
            <span>这可能需要几十秒，请耐心等待</span>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>生成失败</p>
            <span>{error}</span>
            {onRegenerate && (
              <button className="btn-primary" onClick={onRegenerate}>
                重新生成
              </button>
            )}
          </div>
        )}

        {!loading && !error && !imageUrl && (
          <div className={styles.emptyState}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>3D效果图预览</p>
            <span>上传工程图纸并生成后，结果将在此显示</span>
          </div>
        )}

        {!loading && !error && imageUrl && (
          <div className={styles.imageResult}>
            <img src={imageUrl} alt="Generated 3D Result" />
            {processingTime && (
              <div className={styles.metadata}>
                <span>生成耗时: {processingTime}秒</span>
              </div>
            )}
          </div>
        )}
      </div>

      {!loading && !error && imageUrl && (
        <div className={styles.actions}>
          <button className="btn-primary" onClick={handleDownload}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            下载图片
          </button>
          {onRegenerate && (
            <button className="btn-secondary" onClick={onRegenerate}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              重新生成
            </button>
          )}
        </div>
      )}
    </div>
  );
}
