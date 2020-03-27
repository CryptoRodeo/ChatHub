class UserList {
  constructor()
  {
     this.list = [];
  } 

  addUser(user)
  {
      this.list.push(user); 
  }

  updateList(updated_list)
  {
     this.list = updated_list;
  }

  getUsers()
  {
     return this.list;
  }
}
module.exports = UserList;
