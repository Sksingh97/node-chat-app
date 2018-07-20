const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{

  beforeEach(()=>{
    users=new Users();
    users.users=[
      {
        id:'1',
        name:'goku',
        room:'Node Course'
      },
      {
        id:'2',
        name:'gohan',
        room:'React Course'
      },
      {
        id:'3',
        name:'chichi',
        room:'Node Course'
      },
    ]
  })

  it('Should add new user',()=>{
    var users = new Users();
    var user = {id:5,name:'goku',room:'rooma'};
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user])
  });

  it('should return names for node course',()=>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['goku','chichi']);
  })
  it('should return names for React course',()=>{
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['gohan']);
  })
  it('should remove a user',()=>{
     var userId='1';
     var user = users.removeUser(userId);

     expect(user.id).toBe(userId);
     expect(users.users.length).toBe(2);
  })
  it('Should not remove a user',()=>{
    var userId='99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  })
  it('should Find User',()=>{
    var userId='2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });
  it('should not Find User',()=>{
    var userId='99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  })
})
