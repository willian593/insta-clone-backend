import client from '../client';

export default {
  Query: {
    movies: () => client.movie.findMany(), // mostrar todos
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }), // mostrar solo uno por ID
  },
};
