import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from '@emotion/styled';
import 'aos/dist/aos.css';

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background: var(--bg-secondary);
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const AboutText = styled(motion.div)`
  opacity: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  text-align: left;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const LeadText = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--primary-color);
  }

  i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  position: relative;
  
  @media (max-width: 1024px) {
    order: -1;
  }
`;

const AboutImage = styled(motion.img)`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(var(--primary-color-rgb), 0.3);
  }
`;

const skills = [
  {
    icon: 'fa-image',
    title: 'Photo Editing',
    description: 'Professional retouching and color grading'
  },
  {
    icon: 'fa-object-group',
    title: 'Photoshop',
    description: 'Advanced manipulation and compositing'
  },
  {
    icon: 'fa-paint-brush',
    title: 'Lightroom',
    description: 'Color correction and batch processing'
  },
  {
    icon: 'fa-camera',
    title: 'Photography',
    description: 'Composition and lighting techniques'
  },
  {
    icon: 'fa-crop',
    title: 'Graphic Design',
    description: 'Layout and visual communication'
  },
  {
    icon: 'fa-video',
    title: 'Video Editing',
    description: 'Motion graphics and color grading'
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [displayText, setDisplayText] = useState('AAbout Me');  // Changed from 'About Me'
  
  useEffect(() => {
    if (isInView) {
      const finalText = "AAbout Me";  // Changed from 'About Me'
      let i = 0;
      setDisplayText('');  // Clear first
      
      const timer = setInterval(() => {
        if (i < finalText.length) {
          setDisplayText(prev => prev + finalText.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <AboutContent
          as={motion.div}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <AboutText>
            <SectionTitle className="typewriter">
              {displayText}
            </SectionTitle>
            <LeadText variants={itemVariants}>
              I'm a professional Photo Editor with over 5 years of experience transforming ordinary images into extraordinary visual stories. 
              Specializing in advanced Photoshop techniques, I excel at portrait retouching, product enhancement, and creative compositing 
              that brings artistic vision to life.
            </LeadText>
            <motion.div variants={containerVariants}>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    variants={itemVariants}
                  >
                    <i className={`fas ${skill.icon}`}></i>
                    <SkillTitle>{skill.title}</SkillTitle>
                    <SkillDescription>{skill.description}</SkillDescription>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </motion.div>
          </AboutText>
          <ImageContainer>
            <AboutImage
              as={motion.img}
              src="src/assets/profile.jpg"
              alt="Ali's profile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(var(--primary-color-rgb), 0.3)'
              }}
            />
          </ImageContainer>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
