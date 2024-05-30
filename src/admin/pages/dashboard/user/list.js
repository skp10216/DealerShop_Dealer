import { Helmet } from 'react-helmet-async';

import  UserListView  from 'admin/sections/user/view/user-list-view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <UserListView />
    </>
  );
}
