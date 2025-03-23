import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from '@emotion/styled';

const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  background: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectsGrid = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
  padding-bottom: 1rem;

  &::after {
    content: '';
    padding-right: 1rem;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 0;
  height: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProjectCard = styled(motion.div)`
  flex: 0 0 400px;
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 450px;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);

    ${ProjectImageContainer} {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    ${ProjectContent} {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const BeforeImage = styled(ProjectImage)`
  opacity: ${props => props.isHovered ? 0 : 1};
`;

const AfterImage = styled(ProjectImage)`
  opacity: ${props => props.isHovered ? 1 : 0};
`;

const ComparisonLabel = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  z-index: 2;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ScrollButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ScrollButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
// تقدر تضيف اكتر من كارت من الجزء دا
const projects = [
  {
    title: "Fashion, Beauty and Portraits",
    description: "You will get High-end Photo Retouching for Products, Fashion, Beauty and Portraits.",
    beforeImage: "src/assets/BeautyBefore.png",
    afterImage: "src/assets/BeautyAfter.png",
    tags: ["Photoshop", "Retouching", "Color Grading"]
  },
  {
    title: "Photoshop Editing",
    description: "You will get Photoshop Editing, Image Manipulation services",
    beforeImage: "src/assets/Photoshop EditingBefore.png",
    afterImage: "src/assets/Photoshop EditingAfter.png",
    tags: ["Product", "Compositing", "Lighting"]
  },
  {
    title: "Photo Retouching",
    description: "You will get Photo Retouching and Photo Editing.",
    beforeImage: "src/assets/Photo RetouchingBefore.png",
    afterImage: "src/assets/Photo RetouchingAfter.png",
    tags: ["Retouching", "Editing", "Color Grading"]
  },
  {
    title: "Creative Compositing",
    description: "Artistic photo manipulation combining multiple elements into surreal compositions.",
    beforeImage: "src/assets/composite-before.jpg",
    afterImage: "src/assets/composite-after.jpg",
    tags: ["Manipulation", "Creative", "Compositing"]
  }
];
//////////////////////////////////////////////////////////////////////////
const Projects = () => {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const scrollLeft = () => {
    if (gridRef.current) {
      const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      gridRef.current.scrollTo({
        left: newIndex * 420, // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      gridRef.current.scrollTo({
        left: newIndex * 420, // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  // Auto scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle manual scroll
  const handleScroll = () => {
    if (gridRef.current) {
      const scrollPosition = gridRef.current.scrollLeft;
      const cardWidth = 420; // Card width + gap
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }

      // If we're at the end, scroll to start
      if (scrollPosition + gridRef.current.offsetWidth >= gridRef.current.scrollWidth) {
        setTimeout(() => {
          gridRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
          setCurrentIndex(0);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('scroll', handleScroll);
      return () => grid.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex]);

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
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </SectionTitle>
        <ProjectsGrid
          ref={gridRef}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <ProjectImageContainer>
                <BeforeImage 
                  src={project.beforeImage} 
                  alt={`${project.title} Before`}
                  isHovered={hoveredProject === index}
                />
                <AfterImage 
                  src={project.afterImage} 
                  alt={`${project.title} After`}
                  isHovered={hoveredProject === index}
                />
                <ComparisonLabel>
                  {hoveredProject === index ? 'After' : 'Before'}
                </ComparisonLabel>
              </ProjectImageContainer>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>{tag}</Tag>
                  ))}
                </ProjectTags>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        <ScrollButtons>
          <ScrollButton onClick={scrollLeft} aria-label="Scroll left">
            ←
          </ScrollButton>
          <ScrollButton onClick={scrollRight} aria-label="Scroll right">
            →
          </ScrollButton>
        </ScrollButtons>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
