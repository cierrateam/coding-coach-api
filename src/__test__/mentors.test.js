const getMentors = /* GraphQL */ `
  query getMentors {
    mentors {
      name
      type
    }
  }
`;

const getMentees = /* GraphQL */ `
  query getMentees {
    mentees {
      name
      type
    }
  }
`;

const createMentor = /* GraphQL */ `
  mutation createMentor($name: String!, $email: String!) {
    createUser(data: { name: $name, type: Mentor, email: $email }) {
      name
    }
  }
`;

const createMentee = /* GraphQL */ `
  mutation createMentee($name: String!, $email: String!) {
    createUser(data: { name: $name, type: Mentee, email: $email }) {
      name
    }
  }
`;

describe('Mentors', () => {
  test('Create mentor and mentee and retrieve them', async () => {
    await client.request(createMentor, {
      name: 'Mentor One',
      email: 'mentor-one@coding-coach.io',
    });
    await client.request(createMentor, {
      name: 'Mentor Two',
      email: 'mentor-two@coding-coach.io',
    });
    await client.request(createMentee, {
      name: 'Mentee Three',
      email: 'mentor-three@coding-coach.io',
    });
    const { mentors } = await client.request(getMentors);
    const { mentees } = await client.request(getMentees);
    expect(mentors).toMatchSnapshot('getMentors');
    expect(mentors).toHaveLength(2);
    expect(mentees).toMatchSnapshot('getMentees');
    expect(mentees).toHaveLength(1);
  });
});
