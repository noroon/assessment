import { Grid, List, ListItem, Button } from '@mui/material';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { User } from '../../types';
import { getformattedDate } from '../../utils';

type CurrentUserProps = { currentUsers: User[] };

const CurrentUsers: FC<CurrentUserProps> = ({ currentUsers }) => {
  // const columns: GridColDef[] = [
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 300,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.row.first_name} ${params.row.last_name}`,
  //   },
  //   {
  //     field: 'created_at',
  //     headerName: 'Created at',
  //     width: 200,
  //   }
  // ];

  return (
    <>
      {/* {currentUsers && (
        <div style={{ height: 640, width: '100%' }}>
          <DataGrid
            rows={currentUsers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            // checkboxSelection
          />
        </div>
      )} */}
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
                  <Grid item xs={6} md={6}>
                    <span>{`${firstName} ${lastName}`}</span>
                  </Grid>
                  <Grid item xs={5} md={5}>
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
