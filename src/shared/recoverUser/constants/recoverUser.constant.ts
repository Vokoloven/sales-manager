const RECOVER_USER_STATUS = {
  Invited: 'Invited',
  Active: 'Active',
  Suspended: 'Suspended'
} as const;

const RECOVER_USER_TYPE_AUTH = {
  LOCAL: 'LOCAL',
  AD: 'AD'
} as const;

const RECOVER_USER_ACCOUNT_ROLE = {
  Admin: 'Admin',
  User: 'User'
} as const;

const RECOVER_USER_QUERY_KEY = 'recoverUser';

export {
  RECOVER_USER_STATUS,
  RECOVER_USER_TYPE_AUTH,
  RECOVER_USER_ACCOUNT_ROLE,
  RECOVER_USER_QUERY_KEY
};
