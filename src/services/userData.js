const userDB = [
  {
    id: 1,
    fullname: "Akib hasan",
    email: "akib@example.com",
    mobile: "+088 017711 7711"
  },
  {
    id: 2,
    fullname: "Sakib hasan",
    email: "sakib@example.com",
    mobile: "+088 017711 7711"
  },
  {
    id: 3,
    fullname: "Rakib hasan",
    email: "rakib@example.com",
    mobile: "+088 017711 7711"
  },
  {
    id: 4,
    fullname: "Kibria hasan",
    email: "kibria@example.com",
    mobile: "+088 017711 7711"
  },
  {
    id: 5,
    fullname: "Simon hasan",
    email: "simon@gmail.com",
    mobile: "+088 018822 7711"
  },
  {
    id: 6,
    fullname: "Simon hasan",
    email: "simon@gmail.com",
    mobile: "+088 018822 7711"
  },
  {
    id: 7,
    fullname: "Fimon hasan",
    email: "fimon@gmail.com",
    mobile: "+088 018822 7711"
  },
  {
    id: 8,
    fullname: "Mimon hasan",
    email: "mimon@gmail.com",
    mobile: "+088 018822 7711"
  },
  {
    id: 9,
    fullname: "Simon hasan",
    email: "simon@gmail.com",
    mobile: "+088 018822 7711"
  },
  {
    id: 10,
    fullname: "Simon hasan",
    email: "simon@gmail.com",
    mobile: "+088 018822 7711"
  },
  {
    id: 11,
    fullname: "Jimon hasan",
    email: "jimon@gmail.com",
    mobile: "+088 018822 7711"
  }
];

export function deleteUser(id) {
  let users = userDB;
  users.filter(x => x.id != id);
}

export default userDB;
