import { Grid, List, ListItem } from '@mui/material';
import { FC } from 'react';
import { User } from '../../types';
import { getformattedDate } from '../../utils';

type CurrentUserProps = { currentUsers: User[] };

const CurrentUsers: FC<CurrentUserProps> = ({ currentUsers }) => {
  return (
    <>
      {currentUsers && (
        <List>
          {currentUsers.map(
            ({
              id,
              created_at: createdAt,
              first_name: firstName,
              last_name: lastName,
            }: User) => (
              <ListItem key={id}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <span>{`${firstName} ${lastName}`}</span>
                  </Grid>
                  <Grid item>
                    <span>{getformattedDate(createdAt)}</span>
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
