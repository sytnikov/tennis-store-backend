import { User, UserUpdate } from "../types/User";

export class UserRepo{
    users = [
        {
            id: 1,
            name: "Admin",
            email: "admin@mail.com",
            password: "admin",
            role: "admin"
        },
        {
            id: 2,
            name: "John Doe",
            email: "john@mail.com",
            password: "john",
            role: "user"
        },
        {
            id: 3,
            name: "Jane Doe",
            email: "free@maill.com",
            password: "jane",
            role: "user"
        }
    ];

    getAll(){
        return this.users;
    }

    getSingle(userId: number){
        const user = this.users.find(user => user.id === userId)
        return user;
    }

    createUser(newUser: User){
        const id = this.users[this.users.length - 1].id + 1;
        const existingUser = this.users.find(user => user.email === newUser.body.email);
        if(!existingUser){
            return null;
        }
        const createUser: User = {
            body: {
                id: id,
                name: newUser.body.name,
                email: newUser.body.email,
                password: newUser.body.password,
                role: newUser.body.role
            }
        }
        this.users.push(createUser.body);
        return createUser;
    }

    updateUser(index: number, updatedUser:  UserUpdate){
        const indexUser = this.users.findIndex(user => user.id === index);
        const existingUser = this.users.find(user => user.email === updatedUser.body?.email);
        if(indexUser !== -1){
            if (!existingUser) {
                this.users[indexUser] = {
                    ...this.users[indexUser],
                    ...updatedUser,
                    id: index
                };
                return this.users[indexUser];
            }
        }
        return false;
    }

    deleteUser(index: number){
        this.users.splice(index, 1)
        return this.users
    }
};

