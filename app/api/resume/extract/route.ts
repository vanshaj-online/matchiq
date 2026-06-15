import { PdfReader } from "pdfreader";
import mammoth from "mammoth";

const ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: Request) {
    const formData = await req.formData()

    const file = formData.get('resume') as File;

    if (!file) {
        return Response.json({
            success: false,
            message: 'No file uploaded'
        },
            {
                status: 400
            })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let text = ''

    if (file.size > 1024 * 1024 * 5) {
        return Response.json({
            success: false,
            message: 'Please upload a file less than 5MB'
        }, {
            status: 400
        })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return Response.json({
            success: false,
            message: 'Please upload a PDF or DOCX file'
        }, {
            status: 400
        })
    }

    if (file.name.endsWith('.pdf')) {
        await new Promise<void>((resolve, reject) => {
            new PdfReader().parseBuffer(buffer, (err, item) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!item) {
                    resolve();
                    return;
                }

                if (item.text) {
                    text += item.text + " ";
                }
            });
        });

    } else if (file.name.endsWith('.docx')) {

        const result = await mammoth.extractRawText({
            buffer,
        });

        text = result.value;
    }


    const cleanedText = text.replace(/\s+/g, " ").trim();


    return Response.json({
        success: true,
        text: cleanedText
    });

}