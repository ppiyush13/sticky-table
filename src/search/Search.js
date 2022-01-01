import styled from 'styled-components/macro';
import { ReactComponent as SearchIconRaw } from './Search_Icon.svg';

export const Search = () => {
  return (
    <SearchWrapper>
      <SearchText placeholder={'Search by account'} />
      <SearchIcon width={'30px'}></SearchIcon>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 0 0.5rem;
  height: 2rem;
  border-bottom: 1px solid grey;
`;

const SearchText = styled.input.attrs({ type: 'text' })`
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  outline: 0;
  font-family: system-ui;
  font-size: 1rem;
`;

const SearchIcon = styled(SearchIconRaw)``;
