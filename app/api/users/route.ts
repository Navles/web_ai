import { NextResponse } from 'next/server';

// Mock database
let users = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Inactive',
    },
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
    };
    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
}
