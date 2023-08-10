import { gql } from '@apollo/client';

export const GET_COURSES = gql`
query getCourses($page: PageInput!, $name: String) {
  getCourses(page: $page, name: $name){
    code
    message
    page {
      total
      pageNum
      pageSize
    }
    data {
      id
      name
      limitNumber
      duration
    }
  }
}
`;
