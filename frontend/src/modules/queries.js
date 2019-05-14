export default {
  INSERT_ACTOR: `
    mutation InsertActor($name: String!, $middle_name: String, $last_name: String!, $citizenship: String) {
      insertActor(actorInput: {name: $name, middle_name: $middle_name, last_name: $last_name, citizenship: $citizenship}) {
        msg
      }
    }
  `,
  GET_COUNTRIES: `
   query {
     getCountries {
         countries
     }
   }
  `,
  GET_ACTORS: `
   query {
     getActors {
       id
       name
       middle_name
       last_name
       citizenship
      }
    }
  `,
  DELETE_ACTOR: `
   mutation DeleteActor($id: Int!) {
     deleteActor(id: $id) {
         msg
      }
    }
 `,
  UPDATE_ACTOR: `
    mutation UpdateActor($id: Int!, $name: String!, $middle_name: String, $last_name: String!, $citizenship: String) {
      updateActor(id: $id, actorInput: {name: $name, middle_name: $middle_name, last_name: $last_name, citizenship: $citizenship}) {
        msg
       }
     }
  `,
  GET_ACTOR: `
    mutation GetActor($id: Int!) {
      getActor(id: $id) {
        id
        name
        middle_name
        last_name
        citizenship
      }
    }
  `
};
