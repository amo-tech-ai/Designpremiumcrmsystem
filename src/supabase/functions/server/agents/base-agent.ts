/**
 * Base Agent Class
 * 
 * Provides common functionality for all AI agents:
 * - Google Gemini AI integration
 * - Structured JSON output
 * - Error handling
 * - Token counting (for cost tracking)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Agent {
  name: string;
  systemPrompt: string;
  model: string;
  temperature: number;
}

export interface AgentOptions {
  temperature?: number;
  model?: string;
  maxRetries?: number;
}

export abstract class BaseAgent implements Agent {
  abstract name: string;
  abstract systemPrompt: string;
  
  model: string;
  temperature: number;
  maxRetries: number;
  
  protected ai: GoogleGenerativeAI;
  
  constructor(options: AgentOptions = {}) {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable not set');
    }
    
    this.ai = new GoogleGenerativeAI(apiKey);
    this.model = options.model || 'gemini-2.0-flash-exp';
    this.temperature = options.temperature ?? 0.7;
    this.maxRetries = options.maxRetries || 2;
  }
  
  /**
   * Execute the AI agent with structured JSON output
   */
  async execute<T>(input: any): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const model = this.ai.getGenerativeModel({ 
          model: this.model,
          systemInstruction: this.systemPrompt,
        });
        
        const chat = model.startChat({
          generationConfig: {
            temperature: this.temperature,
            responseMimeType: 'application/json',
          },
        });
        
        const result = await chat.sendMessage(JSON.stringify(input));
        const response = result.response.text();
        
        // Parse and validate JSON
        const parsed = JSON.parse(response) as T;
        
        // Log successful execution
        await this.logExecution(input, parsed, attempt);
        
        return parsed;
      } catch (error) {
        lastError = error as Error;
        console.error(`${this.name} attempt ${attempt + 1} failed:`, error);
        
        // Don't retry on JSON parse errors
        if (error instanceof SyntaxError) {
          break;
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < this.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    }
    
    // All retries failed
    throw new Error(`${this.name} failed after ${this.maxRetries + 1} attempts: ${lastError?.message}`);
  }
  
  /**
   * Log agent execution for analytics and debugging
   */
  protected async logExecution(input: any, output: any, attempts: number): Promise<void> {
    try {
      // In production, log to ai_runs table or analytics service
      console.log(`[${this.name}] Executed successfully (attempts: ${attempts + 1})`);
    } catch (error) {
      // Don't fail execution if logging fails
      console.error('Failed to log execution:', error);
    }
  }
}
