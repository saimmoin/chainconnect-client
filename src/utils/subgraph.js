/** @format */

// Helper function to convert params object to GraphQL input string
const formatGraphQLParams = (params) => {
  return JSON.stringify(params).replace(/"([^"]+)":/g, "$1:");
};

export const getAllPosts = (params = {}) => {
  return `
      query getPosts {
        posts: mints(where : ${formatGraphQLParams(params)}) {
          _metadata
          _bidDuration
          _price
          _status
          _tokenId
          _tokenURI
          _user
        }
      }
    `;
};
