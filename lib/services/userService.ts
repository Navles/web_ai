export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
}

// Initial mock data
const initialUsers: User[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'Active',
    },
    {
        id: '3',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.j@example.com',
        role: 'User',
        status: 'Inactive',
    },
];

class UserService {
    private users: User[] = [...initialUsers];

    async fetchUsers(): Promise<User[]> {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.users]);
            }, 500);
        });
    }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    ...userData,
                };
                this.users.push(newUser);
                resolve(newUser);
            }, 500);
        });
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.users.findIndex((u) => u.id === id);
                if (index === -1) {
                    reject(new Error('User not found'));
                    return;
                }
                this.users[index] = { ...this.users[index], ...userData };
                resolve(this.users[index]);
            }, 500);
        });
    }

    async deleteUser(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.users.findIndex((u) => u.id === id);
                if (index === -1) {
                    reject(new Error('User not found'));
                    return;
                }
                this.users = this.users.filter((u) => u.id !== id);
                resolve();
            }, 500);
        });
    }
}

export const userService = new UserService();
