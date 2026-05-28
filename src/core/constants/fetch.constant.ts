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

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
} as const;

export { CONTENT_TYPE, HTTP_HEADER, HTTP_METHOD };
