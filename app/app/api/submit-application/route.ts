import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: 'Invalid application data' }, { status: 400 });
        }

        const insert = db.prepare('INSERT INTO form_submissions (data) VALUES (?)');

        // Save the parsed JSON back into a string for storage
        const result = insert.run(JSON.stringify(body));

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            id: result.lastInsertRowid
        }, { status: 201 });

    } catch (error) {
        console.error('Error saving application:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const select = db.prepare('SELECT * FROM form_submissions ORDER BY created_at DESC');
        const rows = select.all();

        // Parse the JSON string back into an object before sending
        const applications = rows.map((row: any) => ({
            id: row.id,
            created_at: row.created_at,
            data: JSON.parse(row.data)
        }));

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}
