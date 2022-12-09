import { Grid, List, ListItem, Button, IconButton } from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { Dispatch, FC, SetStateAction } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { User } from '../../types';
import { getErrorMessage, getformattedDate } from '../../utils';

type CurrentUserProps = {
  currentUsers: User[];
  click: number;
  setClick: Dispatch<SetStateAction<number>>;
};

const CurrentUsers: FC<CurrentUserProps> = ({
  currentUsers,
  click,
  setClick,
}) => {
  const handleClick = async (id: string, status: string) => {
    status = status === 'active' ? 'locked' : 'active';

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      };

      await fetch(
        `${process.env.REACT_APP_BASE_URL}users/${id}`,
        requestOptions,
      );

      setClick(click + 1);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  return (
    <>
      {currentUsers && (
        <List sx={{ width: '75%' }} data-testid="list-element">
          {currentUsers.map(
            ({
              id,
              status,
              created_at: createdAt,
              first_name: firstName,
              last_name: lastName,
            }: User) => (
              <ListItem
                key={id}
                style={{
                  textDecoration: status === 'locked' ? 'line-through' : 'none',
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6}>
                    <span>{`${firstName} ${lastName}`}</span>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <span>{getformattedDate(createdAt)}</span>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Button
                      variant="outlined"
                      to={`/edit/${id}`}
                      component={RouterLink}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <IconButton
                      size="large"
                      color="primary"
                      aria-label="lock user"
                      onClick={() => handleClick(id, status)}
                    >
                      <LockTwoToneIcon sx={{ m: 'auto' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ),
          )}
        </List>
      )}
    </>
  );
};

export default CurrentUsers;
