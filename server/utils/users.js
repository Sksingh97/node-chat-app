[{
  id: '/#23894738942',
  name: "andrew",
  room:"the office room"
}]



//add useris,name,Room
//removeuserid
//getuser
//getuserlist
class Users {
  constructor(){
    this.users=[];
  }
  addUser(id,name,room){
    var user={id,name,room};
    this.users.push(user);
    this.user;

  }
  removeUser(id){
    //return user that is removed
    var user= this.getUser(id);
    if(user){
      this.users = this.users.filter((user)=>user.id !==id)
    }
    return user;
  }
  getUser(id){
    //return user with id
    return this.users.filter((user)=>user.id === id)[0]
  }
  getUserList(room){
    var users = this.users.filter((user)=> user.room === room)
    var namesArray = users.map((user)=>user.name);

    return namesArray;
  }

}

module.exports={Users}
