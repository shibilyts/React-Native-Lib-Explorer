// export action creators
import * as loginActions from './loginActions';
import * as homeActions from './homeActions';
import * as navigationActions from './navigationActions';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  homeActions
);
