import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { User } from '../../types';
import { getErrorMessage } from '../../utils';
import CurrentUsers from '../CurrentUsers';
import PaginationComponent from '../Pagination';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [click, setClick] = useState(0);

  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const numberOfPages = Math.ceil(users.length / usersPerPage);

  const getUsers = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}users`,
        requestOptions,
      );
      const data = await res.json();

      return data.sort(
        (obj: User, nextObj: User) =>
          -obj.created_at.localeCompare(nextObj.created_at),
      );
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getUsers().then((userList) => setUsers(userList));
  }, [click]);

  return (
    <Stack alignItems="center" sx={{ m: 'auto' }}>
      <Typography variant="h5" sx={{ m: 2 }}>List of users</Typography>
      <CurrentUsers
        currentUsers={currentUsers}
        click={click}
        setClick={setClick}
      />
      <PaginationComponent
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage}
      />
    </Stack>
  );
};

export default UserList;
