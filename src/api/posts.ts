import graphQL from "./graphql";
import { Post } from "./posts.types";

export async function getPostBySlug(slug: string) {
  return graphQL(
    `query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
        title
        content(format: RENDERED)
        slug
        date
        tags {
          edges {
            node {
              name
              slug
            }
          }
        }
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    }`,
    { slug }
  );
}

type PostsResponse<T extends object = {}> = {
  data: {
    posts: {
      edges: { node: Post & { id: string } }[],
      pageInfo: { offsetPagination: { total: number }}
    }
  } & T
}

export async function getPosts(page: number, perPage: number): Promise<PostsResponse> {
  return graphQL(
    `
    query AllPosts($size: Int!, $offset: Int!) {
      posts(where: {offsetPagination: { size: $size, offset: $offset }, orderby: { field: DATE, order: DESC }}) {
        edges {
          node {
            id
            author {
              node {
                name
                slug
                avatar {
                  url
                }
              }
            }
            title
            content(format: RENDERED)
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }
  `,
    { offset: (page - 1) * perPage, size: perPage }
  );
}

export async function getPostsByTag(tag: string, page: number, perPage: number): Promise<PostsResponse<{ tag: { name: string } }>> {
  return graphQL(
    `
    query PostsByTag($tagID: ID!, $tag: String!, $size: Int!, $offset: Int!) {
      posts(where: { tag: $tag, offsetPagination: { offset: $offset, size: $size } }) {
        edges {
          node {
            id
            author {
              node {
                name
                slug
                avatar {
                  url
                }
              }
            }
            title
            content(format: RENDERED)
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
      tag( id: $tagID, idType: SLUG ) {
        name
      }
    }
  `,
    { tagID: tag, tag, offset: (page - 1) * perPage, size: perPage }
  );
}



export async function getPostsByCategory(category: string, page: number, perPage: number): Promise<PostsResponse<{ category: { name: string } }>> {
  return graphQL(
    `
    query PostsByCategory($categoryID: ID!, $categoryName: String!, $size: Int!, $offset: Int!) {
      posts(where: { categoryName: $categoryName, offsetPagination: { offset: $offset, size: $size } }) {
        edges {
          node {
            id
            author {
              node {
                name
                slug
                avatar {
                  url
                }
              }
            }
            title
            content(format: RENDERED)
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
      category( id: $categoryID, idType: SLUG ) {
        name
      }
    }
  `,
    {
      categoryID: category,
      categoryName: category,
      offset: (page - 1) * perPage,
      size: perPage,
    }
  );
}

export async function getPostsByAuthor(author: string, page: number, perPage: number): Promise<PostsResponse<{ user: { name: string } }>> {
  return graphQL(
    `
    query PostsByAuthor($authorID: ID!, $authorName: String!, $size: Int!, $offset: Int!) {
      posts(where: { authorName: $authorName, offsetPagination: { offset: $offset, size: $size } }) {
        edges {
          node {
            id
            author {
              node {
                name
                slug
                avatar {
                  url
                }
              }
            }
            title
            content(format: RENDERED)
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
      user( id: $authorID, idType: SLUG ) {
        name
      }
    }
  `,
    {
      authorID: author,
      authorName: author,
      offset: (page - 1) * perPage,
      size: perPage,
    }
  );
}
