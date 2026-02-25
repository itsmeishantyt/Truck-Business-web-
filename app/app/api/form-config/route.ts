import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configFilePath = path.join(process.cwd(), 'data', 'formConfig.json');

export async function GET() {
    try {
        if (!fs.existsSync(configFilePath)) {
            // Return an empty array or default if not found
            return NextResponse.json([]);
        }
        const data = fs.readFileSync(configFilePath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading form config:', error);
        return NextResponse.json({ error: 'Failed to read configuration' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Simple manual auth requirement requested by user
        if (body.password !== 'admin123') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!Array.isArray(body.config)) {
            return NextResponse.json({ error: 'Invalid configuration format. Must be an array.' }, { status: 400 });
        }

        // Ensure directory exists
        const dir = path.dirname(configFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(configFilePath, JSON.stringify(body.config, null, 2), 'utf8');
        return NextResponse.json({ success: true, message: 'Configuration saved successfully' });
    } catch (error) {
        console.error('Error saving form config:', error);
        return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
    }
}
