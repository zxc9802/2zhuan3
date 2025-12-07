/**
 * Blueprint3D - 主页面
 */

'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import ControlPanel from '@/components/ControlPanel';
import ResultPreview from '@/components/ResultPreview';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import styles from './page.module.css';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [viewAngle, setViewAngle] = useState('perspective');
  const [style, setStyle] = useState('realistic');

  const { loading, result, error, generate, reset } = useImageGeneration();

  const handleImageSelect = (base64: string) => {
    setUploadedImage(base64);
    reset(); // 清空之前的结果
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      alert('请先上传图片');
      return;
    }

    await generate({
      image: uploadedImage,
      description: description || '工程结构图纸',
      viewAngle,
      style,
    });
  };

  const handleDownload = () => {
    if (result?.imageUrl) {
      // 创建临时链接下载
      const link = document.createElement('a');
      link.href = result.imageUrl;
      link.download = `blueprint3d_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className={styles.page}>
      {/* 顶部导航 */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>
              <span className={styles.logoIcon}>📐</span>
              Blueprint3D
            </h1>
            <p className={styles.subtitle}>工程图纸3D可视化工具</p>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className={styles.main}>
        <div className="container">
          <div className={styles.workspace}>
            {/* 左栏：上传和描述 */}
            <aside className={styles.leftPanel}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>上传图纸</h2>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  disabled={loading}
                />
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>图纸描述（可选）</h2>
                <textarea
                  className={styles.textarea}
                  placeholder="例如：钢结构厂房平面图、机械零件设计图等..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows={4}
                />
              </div>

              <button
                className={`btn-primary ${styles.generateBtn}`}
                onClick={handleGenerate}
                disabled={!uploadedImage || loading}
              >
                {loading ? '生成中...' : '生成3D效果图'}
              </button>
            </aside>

            {/* 中栏：预览区 */}
            <section className={styles.centerPanel}>
              <ResultPreview
                imageUrl={result?.imageUrl || null}
                loading={loading}
                error={error}
                processingTime={result?.processingTime}
                onDownload={handleDownload}
                onRegenerate={handleRegenerate}
              />
            </section>

            {/* 右栏：控制面板 */}
            <aside className={styles.rightPanel}>
              <ControlPanel
                viewAngle={viewAngle}
                style={style}
                onViewAngleChange={setViewAngle}
                onStyleChange={setStyle}
                disabled={loading}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className={styles.footer}>
        <div className="container">
          <p>Powered by 豆包SeeDream 4.5 | Blueprint3D v1.0</p>
        </div>
      </footer>
    </div>
  );
}
