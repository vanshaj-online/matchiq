import { PdfReader } from "pdfreader";
import mammoth from "mammoth";

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

    if (file.name.endsWith('.pdf')) {
        console.log('--------------------- running pdf block ------------------------')
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
        console.log('--------------------- running docx block ------------------------')

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