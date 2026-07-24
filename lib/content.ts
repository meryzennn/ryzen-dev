import fs from 'fs'
import path from 'path'
import { ContentSchema, type Content } from './schemas'

export function loadContent(): Content {
  const contentPath = path.join(process.cwd(), 'data', 'content.json')

  try {
    const fileContent = fs.readFileSync(contentPath, 'utf-8')
    const jsonData = JSON.parse(fileContent)

    // Validate with Zod
    const validatedContent = ContentSchema.parse(jsonData)

    return validatedContent
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in content.json: ${error.message}`)
    }

    if (error.name === 'ZodError') {
      const zodError = error as any
      const formattedErrors = zodError.errors
        .map((err: any) => `  - ${err.path.join('.')}: ${err.message}`)
        .join('\n')
      throw new Error(`Content validation failed:\n${formattedErrors}`)
    }

    throw error
  }
}
