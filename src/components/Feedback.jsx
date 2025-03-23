import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from '@emotion/styled';

const FeedbackSection = styled.section`
  padding: 6rem 2rem;
  background: var(--bg-primary);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeedbackGrid = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  scroll-behavior: smooth;
  padding-bottom: 1rem; /* Space for scroll area */
  
  /* Add some space at the end for better UX */
  &::after {
    content: '';
    padding-right: 1rem;
  }
`;

const FeedbackCard = styled(motion.div)`
  flex: 0 0 350px; /* Fixed width cards */
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(var(--primary-color-rgb), 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
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

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const ClientImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientName = styled.h4`
  color: var(--text-primary);
  font-size: 1.1rem;
  margin: 0;
`;

const ClientRole = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
`;

const FeedbackText = styled.p`
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'};
  font-size: 1.2rem;
`;

const feedbacks = [
  {
    id: 1,
    text: "Ali's photo editing skills are exceptional! He transformed my product photos into stunning visuals that significantly boosted our online sales. His attention to detail and understanding of lighting is remarkable.",
    rating: 5,
    client: {
      name: "Sarah Johnson",
      role: "E-commerce Owner",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    }
  },
  {
    id: 2,
    text: "Working with Ali was a game-changer for our wedding photos. His retouching maintained natural skin tones while perfecting every detail. The results were breathtaking!",
    rating: 5,
    client: {
      name: "Michael Chen",
      role: "Wedding Photographer",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  },
  {
    id: 3,
    text: "Ali's creative compositing work is mind-blowing. He took our concept art and turned it into realistic photo manipulations that perfectly captured our vision.",
    rating: 5,
    client: {
      name: "Emma Davis",
      role: "Art Director",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  },
  {
    id: 4,
    text: "Incredible talent in photo restoration! Ali brought my family's old, damaged photos back to life with amazing detail and care. The results were emotional and perfect.",
    rating: 5,
    client: {
      name: "David Wilson",
      role: "Family Historian",
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  },
  {
    id: 5,
    text: "Ali's expertise in fashion photo editing is unmatched. His color grading and skin retouching work maintained the authenticity while achieving magazine-quality results.",
    rating: 5,
    client: {
      name: "Sophie Martinez",
      role: "Fashion Photographer",
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  },
  {
    id: 6,
    text: "Professional, fast, and incredibly skilled. Ali's work on our real estate photos made properties look stunning while keeping them realistic. A true expert!",
    rating: 5,
    client: {
      name: "James Thompson",
      role: "Real Estate Agent",
      image: "https://randomuser.me/api/portraits/men/6.jpg"
    }
  }
];

const Feedback = () => {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const scrollLeft = () => {
    if (gridRef.current) {
      const newIndex = currentIndex === 0 ? feedbacks.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      gridRef.current.scrollTo({
        left: newIndex * 370, // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      const newIndex = currentIndex === feedbacks.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      gridRef.current.scrollTo({
        left: newIndex * 370, // Card width + gap
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
      const cardWidth = 370; // Card width + gap
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

  const cardVariants = {
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
    <FeedbackSection id="feedback" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Client Feedback
        </SectionTitle>
        <FeedbackGrid
          ref={gridRef}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} variants={cardVariants}>
              <StarRating>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} filled={index < feedback.rating}>
                    ★
                  </Star>
                ))}
              </StarRating>
              <FeedbackText>{feedback.text}</FeedbackText>
              <ClientInfo>
                <ClientImage src={feedback.client.image} alt={feedback.client.name} />
                <ClientDetails>
                  <ClientName>{feedback.client.name}</ClientName>
                  <ClientRole>{feedback.client.role}</ClientRole>
                </ClientDetails>
              </ClientInfo>
            </FeedbackCard>
          ))}
        </FeedbackGrid>
        <ScrollButtons>
          <ScrollButton onClick={scrollLeft} aria-label="Scroll left">
            ←
          </ScrollButton>
          <ScrollButton onClick={scrollRight} aria-label="Scroll right">
            →
          </ScrollButton>
        </ScrollButtons>
      </Container>
    </FeedbackSection>
  );
};

export default Feedback;
