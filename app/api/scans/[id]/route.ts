import { Scan } from "@/models/scan.model";
import connectDB from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
      success: false,
      message: "Unauthorized",
    }, { status: 401 })
  }

  await connectDB();

  const { id } = await params;

  const scan = await Scan.findById(id).lean();

  if (!scan || scan.userId.toString() !== session?.user?.id) {
    return Response.json(
      {
        success: false,
        message: "Scan not found",
      },
      { status: 404 }
    )
  }

  return Response.json({
    success: true,
    data: scan,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
      success: false,
      message: "Unauthorized",
    }, { status: 401 })
  }

  await connectDB();

  const { id } = await params;

  const scan = await Scan.findOneAndDelete({ _id: id, userId: session.user.id });

  if (!scan) {
    return Response.json(
      {
        success: false,
        message: "Scan not found",
      },
      { status: 404 }
    )
  }

  return Response.json({
    success: true,
    data: scan,
  });
}