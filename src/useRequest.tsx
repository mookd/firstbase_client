import { useQuery, gql, useMutation } from '@apollo/client';

export const GET_PEOPLE_QUERY = gql`
  query people {
    people {
      id,
      name {
        title
        first
        last
      },
      picture {
        thumbnail
      }
    }
  }
`;

export const GET_PERSON_QUERY = gql`
  query person($personId: ID!){
      person(id: $personId) {
        id,
        name {
          title
          first
          last
        },
        picture {
          large
        },
        email
    }
  }
`;

export const UPDATE_PERSON_QUERY = gql`
  mutation editPerson($id: ID!, $payload: EditPerson){
    editPerson(id: $id, payload: $payload) {
        id,
        name {
          title
          first
          last
        },
        picture {
          large
        }
        email
    }
  }
`;


export function useGetPeople(){
  return useQuery(GET_PEOPLE_QUERY);
}

export function useGetPerson(personId: string){
  return useQuery(GET_PERSON_QUERY,
      { variables: { personId } }
  );
}

export function useUpdatePerson(){
  return useMutation(UPDATE_PERSON_QUERY);
}

