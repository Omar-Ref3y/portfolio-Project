import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  text-align: center;
  padding: 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

function Footer({ children }) {
  return <FooterWrapper>{children}</FooterWrapper>;
}

export default Footer;
