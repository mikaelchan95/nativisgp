import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TalentSubmission {
  candidate_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  resume_url?: string;
  areas_of_interest: string[];
  cover_message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { submission } = await req.json() as { submission: TalentSubmission };

    const areasText = submission.areas_of_interest.join(', ');

    const emailSubject = `New Talent Pool Submission: ${submission.candidate_name}`;
    const emailBody = `
New Talent Pool Submission Received

Candidate Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${submission.candidate_name}
Email: ${submission.email}
Phone: ${submission.phone}
${submission.linkedin_url ? `LinkedIn: ${submission.linkedin_url}` : ''}

Areas of Interest:
${areasText}

Why they're interested in Nativis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${submission.cover_message}

${submission.resume_url ? `Resume: ${submission.resume_url}` : 'No resume uploaded'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })}

Please review this submission in your Supabase dashboard.
`.trim();

    const mailtoLink = `mailto:din@nativisgp.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification prepared",
        mailtoLink: mailtoLink,
        data: {
          recipient: "din@nativisgp.com",
          subject: emailSubject,
          candidateName: submission.candidate_name
        }
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing talent submission:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
