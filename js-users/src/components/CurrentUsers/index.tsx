import { Grid, List, ListItem, Button } from '@mui/material';
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
                <Grid container spacing={1}>
                  <Grid item xs={8} md={8}>
                    <span>{`${firstName} ${lastName}`}</span>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <span>{getformattedDate(createdAt)}</span>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Button variant="outlined" >Edit</Button>
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
