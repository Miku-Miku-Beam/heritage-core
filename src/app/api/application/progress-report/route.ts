import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch progress reports for an application
export async function GET(req: NextRequest) {
  const applicationId = req.nextUrl.searchParams.get('applicationId');
  if (!applicationId) {
    return NextResponse.json({ error: 'applicationId is required' }, { status: 400 });
  }
  try {
    const reports = await prisma.progressReport.findMany({
      where: { applicationId },
      orderBy: { weekNumber: 'asc' },
    });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load reports' }, { status: 500 });
  }
}

// POST: Create a new progress report with image upload
export async function POST(req: NextRequest) {
  // Expect JSON payload with UploadThing-generated URL
  const { applicationId, weekNumber, reportText, imageUrl } = await req.json();
  if (!applicationId || typeof weekNumber !== 'number' || !reportText || !imageUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  try {
    // Check if week number already exists for this application
    const existingReport = await prisma.progressReport.findFirst({
      where: { applicationId, weekNumber },
    });
    if (existingReport) {
      return NextResponse.json({ error: 'Laporan untuk minggu ini sudah ada' }, { status: 400 });
    }

    // Persist report in database
    const report = await prisma.progressReport.create({
      data: { applicationId, weekNumber, reportText, imageUrl },
    });
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error('Error creating progress report:', error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}
