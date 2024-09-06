# LinkedIn Summary Generator

This project is a tool for generating personalized LinkedIn summaries using AI. It's built with Next.js, uses the Vercel AI SDK, and is deployed on Vercel.

**Try it out: [https://www.linkedinsummary.com/](https://www.linkedinsummary.com/)**

## Project Overview

The LinkedIn Summary Generator is a web application that allows users to input their professional details and receive an AI-generated LinkedIn summary. It uses OpenAI's GPT model to create engaging and personalized summaries based on the user's input.

![alt text](https://www.linkedinsummary.com/og-image.png)

## Key Components

### `page.tsx`

This is the main page component of the application. It contains:

- A form for users to input their professional details
- State management for form inputs using React hooks
- A function to handle the summary generation process
- UI components for displaying the form and generated summary

Key features:
- Responsive design using Tailwind CSS
- Integration with custom UI components (likely from a UI library)
- Markdown rendering for the generated summary

### `actions.ts`

This server-side file contains the core functionality for generating the LinkedIn summary. It includes:

- A TypeScript interface `LinkedInSummaryParams` defining the expected input parameters
- An async function `generateLinkedInSummary` that:
  - Constructs a system prompt for the AI model
  - Builds a user prompt based on the input parameters
  - Uses the Vercel AI SDK to generate text with OpenAI's GPT-4 model
  - Returns the generated text along with finish reason and usage information

## How It Works

1. Users fill out the form on the main page with their professional details.
2. When they click "Generate Summary", the `handleRewrite` function in `page.tsx` is triggered.
3. This function calls the `generateLinkedInSummary` function from `actions.ts`.
4. The AI generates a summary based on the provided information.
5. The generated summary is displayed on the page, formatted as Markdown.

## Setup and Deployment

This project is set up to be easily deployed on Vercel:

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (particularly the OpenAI API key)
4. Deploy to Vercel using the Vercel CLI or by connecting your GitHub repository

## Local Development

To run the project locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js
- React
- Vercel AI SDK
- OpenAI GPT-4
- Tailwind CSS
- TypeScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).