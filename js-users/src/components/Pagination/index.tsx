import { Pagination, PaginationItem } from '@mui/material';
import { ChangeEvent, FC, SetStateAction } from 'react';

type PaginationProps = {
  currentPage: number;
  numberOfPages: number;
  setCurrentPage: (pageNumber: SetStateAction<number>) => void;
};

const PaginationComponent: FC<PaginationProps> = ({
  currentPage,
  numberOfPages,
  setCurrentPage,
}) => {
  const paginate = (
    event: ChangeEvent<unknown>,
    pageNumber: SetStateAction<number>,
  ) => setCurrentPage(pageNumber);

  return (
    <Pagination
      page={currentPage}
      count={numberOfPages}
      onChange={paginate}
      color="primary"
      renderItem={(item) => <PaginationItem {...item} />}
    />
  );
};

export default PaginationComponent;
