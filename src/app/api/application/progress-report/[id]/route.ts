import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT: Update an existing progress report
export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const { weekNumber, reportText, imageUrl } = await req.json();
  
  if (typeof weekNumber !== 'number' || !reportText || !imageUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Check if the report exists
    const existingReport = await prisma.progressReport.findUnique({
      where: { id },
    });

    if (!existingReport) {
      return NextResponse.json({ error: 'Progress report not found' }, { status: 404 });
    }

    // Check if another report with the same week number exists for this application
    const duplicateReport = await prisma.progressReport.findFirst({
      where: { 
        applicationId: existingReport.applicationId, 
        weekNumber,
        id: { not: id } // Exclude current report
      },
    });

    if (duplicateReport) {
      return NextResponse.json({ error: 'Laporan untuk minggu ini sudah ada' }, { status: 400 });
    }

    // Update the report
    const updatedReport = await prisma.progressReport.update({
      where: { id },
      data: { weekNumber, reportText, imageUrl },
    });

    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error('Error updating progress report:', error);
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
  }
}

// DELETE: Delete a progress report
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  try {
    // Check if the report exists
    const existingReport = await prisma.progressReport.findUnique({
      where: { id },
    });

    if (!existingReport) {
      return NextResponse.json({ error: 'Progress report not found' }, { status: 404 });
    }

    // Delete the report
    await prisma.progressReport.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Progress report deleted successfully' });
  } catch (error) {
    console.error('Error deleting progress report:', error);
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 });
  }
}
