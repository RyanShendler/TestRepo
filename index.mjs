import * as fs from "fs";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
dotenv.config()

const typeDefs = fs.readFileSync('./schema.graphql', 'utf8').toString();

const driver = neo4j.driver(`${process.env.DB_URL}`)

const neoSchema = new Neo4jGraphQL({typeDefs, driver})
neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({schema})
    server.listen().then(({url}) => {
        console.log(`Server ready at ${url}`)
    })
})