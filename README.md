# MatchIQ 📄🖋️

An elegant, print-inspired applicant tracking system (ATS) compatibility analyzer. MatchIQ leverages advanced Gemini AI models to parse, evaluate, and rewrite resumes to align with target job descriptions, providing comprehensive metrics and actionable feedback.

Designed with a tactile, paper-textured aesthetic, MatchIQ replaces typical generic dashboard interfaces with a clean, editorial layout, clean serif/sans typography, and subtle micro-interactions.

---

## 🎨 Design Ethos & Foundations
MatchIQ follows a **Paper-textured, print-inspired design** with tactile surfaces, subtle rules, minimal colors, and high contrast.

*   **Colors**: Sleek minimalist palette featuring off-white paper tones (`#FFFFFF` surface), rich ink typography (`#111111` / `#111827`), thin separator lines, and curated semantic tones (Success green, Warning gold, and Danger red) that mimic ink stamps and rule lines on printed reports.
*   **Typography**: Montserrat (for display headers), Roboto (for highly legible body content), and PT Mono (for technical statistics, dates, and labels).
*   **Animations**: Smooth transitions, backdrop blurs, fading modals, and custom-styled scrolling panels for an effortless reading experience.

---

## 🚀 Key Features

### 📊 1. Analysis History Dashboard
*   **Central Archive**: View a chronological history of previous scans filed.
*   **Quick Metrics**: Clear view of the overall compatibility score (%), candidate name, evaluation date, and match verdict at a glance.
*   **Obsolescence Management**: Safely delete previous scans via an elegant confirmation modal.

### 📝 2. Resume Text Extraction
*   **Dual Input**: Upload files or paste text manually.
*   **Multi-Format Parsing**: Built-in support for extracting plaintext from `.pdf` documents (via `pdfreader`) and `.docx` documents (via `mammoth`).
*   **Size Constraint**: Enforces a 5MB maximum file size limit for stability and efficiency.
*   **Whitespace Sanitation**: Auto-cleans extraneous spacing before parsing to ensure pristine formatting for the AI engine.

### 🧠 3. Advanced AI compatibility Analysis
*   **Gemini Power**: Powered by the highly responsive and cost-effective `gemini-2.5-flash-lite` model.
*   **Deterministic Output**: Enforces structured JSON responses that represent a realistic technical recruiter/ATS review.
*   **Zod Schema Validation**: Uses strict schema verification (`zod`) to ensure every response fits the expected shape before updating the database.

### 📋 4. Detailed ATS Compatibility Reports
*   **Verdicts**: Match scores translate to clear verdicts (`Strong Match`, `Good Match`, `Partial Match`, `Weak Match`).
*   **Radial Progress**: Visual feedback through a circular SVG stroke indicator tailored with tone-based color mappings.
*   **Sub-Metric Ratings**: Four independent scores tracking *Keyword Match*, *Relevant Experience*, *Skills Fit*, and *Education*.
*   **Grouped Keywords**: Highlights keywords from the job description missing on the resume, classified by priority (*critical*, *important*, *nice-to-have*) with context explaining why each keyword matters.
*   **Section-by-Section Review**: Direct critique of summary, work experience, skills, and academic history.
*   **Actionable Rewrites**: Compares original resume bullet points with custom-tailored, job-aligned alternatives alongside explanation notes.
*   **Strengths & Quick Wins**: Displays the top 3 strengths of the candidate and 3 immediate actionable enhancements.
*   **Print Layout & Automatic Accordion Expansion**: Native print-friendly stylesheet powered by `react-to-print` inside `ReportWrapper.tsx` that automatically expands all closed accordion panels (`<details>` elements) before printing, saving their original states, and restoring them to their original open/closed status after printing is complete or cancelled.

### 🛡️ 5. Usage Safeguards & Security
*   **Rate Limits**: Implements a strict limit of 5 successful scans per user per day to keep API costs predictable.
*   **Notifications**: Integrated with toast notifications (`react-toastify`) that trigger when a user hits the daily threshold.
*   **Secure Authentication**: Session-based credentials authentication (email & password) built on NextAuth.js (v5) with `bcryptjs` hashing.

---

## 🛠️ Tech Stack

### Frontend & Core
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/) with a custom design configuration (PostCSS + Vite compiler)
*   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Printing & PDF Export**: [react-to-print](https://github.com/gregnb/react-to-print) for high-fidelity native print-sheet layout rendering and export.

### Backend, Database, & AI
*   **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
*   **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) (Beta)
*   **AI Integration**: [Google GenAI SDK](https://github.com/google-gemini/genai-js) (`@google/genai`)
*   **Document Extractors**: `pdfreader` (PDF content reader) & `mammoth` (.docx to text extractor)
*   **Security**: `bcryptjs` for secure password storage

---

## 🔌 API Route Map

### Auth Endpoints
*   `POST /api/auth/signup`: Validates form inputs, hashes password using `bcryptjs`, creates the user document in MongoDB, and returns success response.
*   `NextAuth Wildcard Handler`: Handles credentials authentication, token generation, and session lifecycle.

### Parsing Endpoints
*   `POST /api/resume/extract`: Receives `multipart/form-data` containing the file, verifies extension and size (<=5MB), parses content via `pdfreader` or `mammoth`, cleans whitespaces, and responds with plain text.

### Compatibility Scan Endpoints
*   `POST /api/scan`: Handles the main evaluation request. Validates the session, verifies the 5 daily scan limit, triggers the Gemini API call, parses/validates the response payload against the Zod schema, and updates the scan document in MongoDB.
*   `GET /api/scans`: Retrieves a chronological list of scans belonging to the active user session.
*   `GET /api/scans/[id]`: Returns the complete data structure of a single compatibility scan report.
*   `DELETE /api/scans/[id]`: Permanently deletes a scan record from the database.

---

## 🛠️ Local Development & Setup

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB Instance (Local or Atlas)
*   Google Gemini API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd matchiq
    ```

2.  **Install project dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the root directory and supply the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=a_secure_random_string_for_nextauth_sessions
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the local development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your web browser.

5.  **Build production package**:
    ```bash
    npm run build
    npm run start
    ```
