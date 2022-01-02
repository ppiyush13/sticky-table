import styled from 'styled-components/macro';
import { useAsyncDebounce } from 'react-table';
import { ReactComponent as SearchIcon } from './Search_Icon.svg';

export const Search = ({ onSearchChange }) => {
  const onChange = useAsyncDebounce((e) => {
    onSearchChange(e.target.value);
  }, 300);

  return (
    <SearchWrapper>
      <SearchTextWrapper>
        <SearchText placeholder={'Search by any field'} onChange={onChange} />
        <SearchIcon width={'1.5rem'}></SearchIcon>
      </SearchTextWrapper>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  padding: 1rem 0;
`;

const SearchTextWrapper = styled.div`
  display: flex;
  align-items: center;
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
