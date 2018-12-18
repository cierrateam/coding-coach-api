const getUser = /* GraphQL */ `
  query getUserByMail($email: String!) {
    userByEmail(email: $email) {
      name
      type
      id
    }
  }
`;

const userSignUp = /* GraphQL */ `
  mutation userSignUp($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, type: Both, email: $email, password: $password }) {
      name
      id
    }
  }
`;

describe('Users', () => {
  test('Users signup can be submitted to the api', async () => {
    const user = await client.request(userSignUp, {
      name: 'John Doe',
      email: 'john-doe@codingcoach.io',
      password: 'Secret!1Pass',
    });

    const userFetched = await client.request(getUser, {
      email: 'john-doe@codingcoach.io',
    });
    expect(userFetched.id).toEqual(user.id);
  });
});
