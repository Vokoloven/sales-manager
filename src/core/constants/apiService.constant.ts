const CONTENT_TYPE = {
  JSON: 'application/json',
  Blob: 'application/octet-stream',
  FormData: 'multipart/form-data',
  Stream: 'text/event-stream'
} as const;

const HTTP_HEADER = {
  ContentType: 'Content-Type',
  Authorization: 'Authorization',
  Accept: 'Accept'
} as const;

const RESPONSE_METHOD = {
  json: 'json',
  blob: 'blob',
  text: 'text'
} as const;

const RESPONSE_TYPE = {
  arraybuffer: 'arraybuffer',
  blob: 'blob',
  document: 'document',
  formdata: 'formdata',
  json: 'json',
  stream: 'stream',
  text: 'text'
} as const;

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
} as const;

const HTTP_RESPONSE_STATUS = {
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  expectationFailed: 417,
  tooManyRequests: 429,
  internalServerError: 500
} as const;

const AXIOS_VALIDATION_ERROR = 'ERR_VALIDATION';

export {
  CONTENT_TYPE,
  HTTP_HEADER,
  RESPONSE_METHOD,
  HTTP_METHOD,
  HTTP_RESPONSE_STATUS,
  RESPONSE_TYPE,
  AXIOS_VALIDATION_ERROR
};
