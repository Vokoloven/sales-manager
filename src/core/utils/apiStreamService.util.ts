import { CONTENT_TYPE, HTTP_HEADER } from '@/core/constants/apiService.constant';

const errorGenerator = (
  error = {
    error: 'An unexpected error occurred.',
    message: 'An unexpected stream from the server.',
    statusCode: 500
  }
) => {
  return new Response(JSON.stringify(error), {
    status: 500,
    headers: { [HTTP_HEADER.ContentType]: CONTENT_TYPE.JSON }
  });
};

export { errorGenerator };
