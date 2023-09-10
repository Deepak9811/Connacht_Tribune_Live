const constants = {
  REQUEST_ATTEMPT: 'REQUEST_ATTEMPT',
  REQUEST_FAILURE: 'REQUEST_FAILURE',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
};

const requestAttempt = () => ({ type: constants.REQUEST_ATTEMPT });
const requestFailure = error => ({ error, type: constants.REQUEST_FAILURE });
const requestSuccess = () => ({ type: constants.REQUEST_SUCCESS });

const httpActions = { requestAttempt, requestFailure, requestSuccess, actions: constants };
export default httpActions;
