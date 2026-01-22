import { NextResponse } from 'next/server';

// Mock database (needs to be consistent with route.ts for persistence in memory across same server instance ideally, but for separate files in dev mode this might re-init. 
// For a simple mock, we might need a shared file or just accept they are separate in dev if HMR reloads. 
// However, since Next.js app router keeps server running, a separate array in another file isn't shared. 
// We will move the data to a shared separate file or just keep it simple and focus on the UI flow.
// Actually, let's put the users in a global variable for this mock to work better across files if needed, 
// or better yet, just simulate successful responses without verifying persistence too strictly for this quick mock.
// Re-using the array from the other file is hard without a real DB. 
// Let's create a hacky shared store for this session if possible, or just mock the responses.

// Better approach for mock: simpler is better. We will just return success.
// If we want real list updates, we ideally need a singleton.

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();

    // In a real app we would update the Db.
    // For this mock, we just echo back the data with the ID.
    return NextResponse.json({ id, ...body });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    // Mock delete
    return NextResponse.json({ message: `User ${id} deleted` });
}
