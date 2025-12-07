/**
 * 图片生成Hook
 */

import { useState } from 'react';

interface GenerateParams {
  image: string; // base64
  description: string;
  viewAngle: string;
  style: string;
}

interface GenerateResult {
  success: boolean;
  imageUrl?: string;
  processingTime?: number;
  error?: string;
}

export function useImageGeneration() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const generate = async (params: GenerateParams) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data: GenerateResult = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || '生成失败');
        setResult(data);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '网络请求失败';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    result,
    error,
    generate,
    reset,
  };
}
