import Auth0Service, { SignUpProps } from './auth0service';

// Mock the fetch function
jest.mock('node-fetch', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    });
  });
});

describe('Auth0Service', () => {
  let auth0Service;

  beforeEach(() => {
    auth0Service = new Auth0Service();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should send a signup request with the correct parameters', async () => {
      const signUpProps = {
        email: 'test@example.com',
        password: 'password123',
        nickname: 'testuser',
      };

      const expectedBody = {
        client_id: process.env.NEXT_PUBLIC_AUTH_ZERO_CLIENT_ID,
        email: signUpProps.email,
        password: signUpProps.password,
        username: signUpProps.nickname,
        connection: 'Username-Password-Authentication',
      };

      const result = await auth0Service.signUp(signUpProps);

      expect(fetch).toHaveBeenCalledWith(
        `https://${process.env.NEXT_PUBLIC_AUTH_ZERO_DOMAIN}/dbconnections/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expectedBody),
        }
      );
      expect(result).toEqual({ success: true });
    });
  });
});