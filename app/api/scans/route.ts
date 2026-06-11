import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { Scan } from "@/models/scan.model";

export async function GET(req: Request) {
    try {
        await connectDB();
        const session = await auth();

        if (!session?.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const scans = await Scan.find({ userId: session.user.id }).sort({ createdAt: -1 });

        return Response.json({ success: true, data: scans }, { status: 200 });

    } catch (error) {
        console.error("Failed to get scans:", error);
        return Response.json(
            { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
};