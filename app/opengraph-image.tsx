import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mukit - AI Product Manager & Technical Builder';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginBottom: 20,
            background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Mukit <span style={{ marginLeft: 20 }}>👋</span>
        </div>
        
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            marginBottom: 30,
            opacity: 0.9,
          }}
        >
          AI Product Manager & Technical Builder
        </div>
        
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            opacity: 0.8,
            marginBottom: 50,
            textAlign: 'center',
          }}
        >
          Portfolio showcasing Agentic Workflows, AI automation & System Architecture
        </div>
        
        <div
          style={{
            display: 'flex',
            gap: 40,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
            }}
          >
            Data (analysis)
          </div>
          <div
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
            }}
          >
            Decision (strategy)
          </div>
          <div
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
            }}
          >
            Design (system)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
