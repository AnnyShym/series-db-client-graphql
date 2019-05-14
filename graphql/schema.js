const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Actor {
        id: Int!,
        name: String!,
        middle_name: String,
        last_name: String!,
        citizenship: String
    }
    type Countries {
        countries: [String]
    }
    input ActorInput {
        name: String!,
        middle_name: String,
        last_name: String!,
        citizenship: String
    }
    type DeleteResponse {
        msg: String
    }
    type InsertResponse {
        msg: String
    }
    type UpdateResponse {
        msg: String
    }
    type RootQuery  {
        getActors: [Actor],
        getCountries: Countries!
    }
    type RootMutation  {
        getActor(id: Int!): Actor,
        deleteActor(id: Int!): DeleteResponse,
        insertActor(actorInput: ActorInput!): InsertResponse,
        updateActor(id: Int!, actorInput: ActorInput!): UpdateResponse
    }
    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);
