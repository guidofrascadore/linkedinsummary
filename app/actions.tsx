'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

interface LinkedInSummaryParams {
  jobTitle: string;
  yearsOfExperience: number;
  industry: string;
  keySkills: string[];
  education: string;
  achievements?: string[];
  careerGoals: string;
  target: string;
  cta: string;
  toneOfVoice: string;
  isFirstPerson: boolean;
}

export async function generateLinkedInSummary({
  jobTitle,
  yearsOfExperience,
  industry,
  keySkills,
  education,
  achievements,
  careerGoals,
  target,
  cta,
  toneOfVoice,
  isFirstPerson
}: LinkedInSummaryParams) {
  const system = 
  `You are a professional social media manager. You write content with a ${toneOfVoice} tone of voice. 
  Your task is to create professional, engaging, and impactful LinkedIn summaries that highlight an individual's strengths, experiences, and career goals. 
  Follow these guidelines:
  Write in ${isFirstPerson ? 'first person' : 'third person'}
  Incorporate relevant industry keywords.
  Highlight unique strengths and experiences.
  Include significant achievements if provided.
  End with the provided call to action or create a new one based on the other infos provided.
  Optimize language for maximum impact and conversion on LinkedIn.
  ${toneOfVoice === 'enthusiastic' ? 'Use lists and emoji to emphasize arguments.' : ''}
  ${toneOfVoice === 'approachable' ? 'Use lists, multiple new lines, and short sentences to emphasize arguments.' : ''}
  Use spaces, new line, and punctuation to create an organized and effective LinkedIn summary.
  Use the training data provided to generate the LinkedIn summary.
  Each paragraph should not exceed 4 lines, maximum;
  Leave a blank line between each paragraph. The line break without a line break is not enough to break up a text;
  Use bullet points to list skills or achievements.
  `;

  const prompt = `Write a LinkedIn summary for a ${jobTitle} with ${yearsOfExperience} years of experience in ${industry}. 
  Key skills: ${keySkills.join(', ')}. 
  Education: ${education}. 
  ${achievements ? `Achievements: ${achievements.join(', ')}. ` : ''}
  Career goals: ${careerGoals}. 
  The target audience is: ${target}. 
  The call to action is: ${cta}.`;

  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-4o-mini'),
    system: system,
    prompt: prompt,
  });

  //console.log(process.env.OPENAI_API_KEY)

  return { text, finishReason, usage };
}

// Esempio di utilizzo:
// const result = await generateLinkedInSummary({
//   toneOfVoice: "confident and approachable",
//   jobTitle: "Senior Software Engineer",
//   yearsOfExperience: 8,
//   industry: "AI and Machine Learning",
//   keySkills: ["Python", "TensorFlow", "Cloud Computing", "Agile Methodologies"],
//   education: "MS in Computer Science",
//   achievements: ["Led a team that increased model accuracy by 30%", "Reduced infrastructure costs by 25%"],
//   careerGoals: "To lead innovative AI projects in a cutting-edge tech company",
//   target: "Tech recruiters and AI project managers",
//   cta: "Connect with me to discuss AI innovation opportunities"
// });