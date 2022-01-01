import styled from 'styled-components/macro';

export const Content = ({ children }) => {
  return (
    <ContentWrapper>
      <ContentText>{children}</ContentText>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  padding: 1rem 0;
`;

const ContentText = styled.div`
  background-color: #dcdcdc;
  padding: 0.5rem 1rem;
`;
