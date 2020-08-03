const { ApolloServer, gql } = require("apollo-server")
const { GraphQLJSON } = require('graphql-type-json');
var rp = require('request-promise')

const typeDefs = gql`
  scalar JSON

  type Query {
    initKeywords : JSON,
    keywords(category : String) : [String]
  }
`

async function getKeywords(category){
  let keywords = []
  await rp('https://api.datamuse.com/words?rel_trg=' + category + '&max=5')
    .then(body => {
      JSON.parse(body).forEach(keyword => keywords.push(keyword.word))
    })
    .catch(err => {
      console.log(err)
    })
  return keywords
}

const defaultCategories = ["cars", "bike", "fruit", "animals", "drinks"]

async function initKeywords(){
  let defaultKeywords = {}
  for(const category of defaultCategories){
    defaultKeywords[category] = await getKeywords(category)
  }
  return defaultKeywords
}

const resolvers = {
  Query: {
    initKeywords: (root, args, context) => initKeywords(),
    keywords: (root, args, context) => getKeywords(args.category)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
