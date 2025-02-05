import { Html, useProgress } from "@react-three/drei";
import styled from '@emotion/styled';

const LoaderContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(81, 203, 238, 0.5);
  padding: 2rem;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 10px;
  background: #333;
  border-radius: 5px;
  margin: 20px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00fff2, #0084ff);
  transition: width 0.3s ease;
`;

const ParticleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background: #00fff2;
  border-radius: 50%;
  animation: float 3s infinite;
  
  @keyframes float {
    0% { transform: translateY(0) scale(1); opacity: 0.8; }
    50% { transform: translateY(-20px) scale(0.8); opacity: 0.4; }
    100% { transform: translateY(0) scale(1); opacity: 0.8; }
  }
`;

const Heart = styled.svg`
  width: 120px;
  height: 120px;
  animation: beat 1s infinite;
  margin-top: 20px;
  
  @keyframes beat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Loader = () => {
  const { progress } = useProgress();

  // Create random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  return (
    <Html center>
      <LoaderContainer>
        <ParticleContainer>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </ParticleContainer>

        <Heart viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00fff2" />
              <stop offset="100%" stopColor="#0084ff" />
            </linearGradient>
          </defs>
        </Heart>

        {/* Progress Bar */}
        <ProgressBar>
          <ProgressFill style={{ width: `${progress}%` }} />
        </ProgressBar>

        {/* Progress Text */}
        <div style={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: '-webkit-linear-gradient(#00fff2, #0084ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          {progress < 30 && 'Warming up engines...'}
          {progress >= 30 && progress < 70 && 'Loading cosmic assets...'}
          {progress >= 70 && 'Finalizing orbit...'}
        </div>

        {/* Percentage Text */}
        <div style={{ 
          marginTop: '1rem',
          fontSize: '1.2rem',
          color: '#00fff2',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0, 255, 242, 0.5)'
        }}>
          {progress.toFixed(0)}%
        </div>
      </LoaderContainer>
    </Html>
  );
};

export default Loader;
