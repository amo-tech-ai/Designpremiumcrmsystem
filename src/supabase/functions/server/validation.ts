// ============================================
// Gemini API Response Validation & Schemas
// Purpose: Validate and sanitize AI responses
// Usage: Import in edge functions for validation
// ============================================

// Zod-like validation helpers (simple implementation)
// Note: Deno doesn't support npm Zod directly, so we use manual validation

export interface SlideSchema {
  type: string;
  title: string;
  content: string[];
  notes: string;
  visualDescription?: string;
}

export interface DeckGenerationResponse {
  slides: SlideSchema[];
}

// Validation function
export function validateSlide(slide: any): { valid: boolean; errors: string[]; sanitized?: SlideSchema } {
  const errors: string[] = [];

  // Validate type
  const validTypes = ['Title', 'Problem', 'Solution', 'Market', 'Product', 'Traction', 'BusinessModel', 'Team', 'Vision', 'Ask', 'WhyNow', 'Competition'];
  if (!slide.type || !validTypes.includes(slide.type)) {
    errors.push(`Invalid slide type: ${slide.type}. Must be one of: ${validTypes.join(', ')}`);
  }

  // Validate title
  if (!slide.title || typeof slide.title !== 'string' || slide.title.trim().length === 0) {
    errors.push('Slide title is required and must be a non-empty string');
  }
  if (slide.title && slide.title.length > 100) {
    errors.push('Slide title too long (max 100 characters)');
  }

  // Validate content
  if (!Array.isArray(slide.content)) {
    errors.push('Slide content must be an array');
  } else if (slide.content.length === 0) {
    errors.push('Slide content cannot be empty');
  } else if (slide.content.length > 10) {
    errors.push('Slide content has too many bullets (max 10)');
  } else {
    // Validate each bullet
    for (let i = 0; i < slide.content.length; i++) {
      const bullet = slide.content[i];
      if (typeof bullet !== 'string' || bullet.trim().length === 0) {
        errors.push(`Bullet ${i + 1} must be a non-empty string`);
      }
      if (bullet && bullet.length > 300) {
        errors.push(`Bullet ${i + 1} too long (max 300 characters)`);
      }
    }
  }

  // Validate notes
  if (!slide.notes || typeof slide.notes !== 'string') {
    // Notes are optional but should be string
    slide.notes = '';
  }
  if (slide.notes && slide.notes.length > 1000) {
    errors.push('Speaker notes too long (max 1000 characters)');
  }

  // Validate visualDescription (optional)
  if (slide.visualDescription && typeof slide.visualDescription !== 'string') {
    errors.push('Visual description must be a string');
  }
  if (slide.visualDescription && slide.visualDescription.length > 500) {
    errors.push('Visual description too long (max 500 characters)');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize and return
  const sanitized: SlideSchema = {
    type: slide.type,
    title: slide.title.trim().slice(0, 100),
    content: slide.content.map((b: string) => b.trim().slice(0, 300)).filter((b: string) => b.length > 0),
    notes: (slide.notes || '').trim().slice(0, 1000),
    visualDescription: slide.visualDescription ? slide.visualDescription.trim().slice(0, 500) : undefined
  };

  return { valid: true, errors: [], sanitized };
}

export function validateDeckResponse(response: any): { valid: boolean; errors: string[]; sanitized?: DeckGenerationResponse } {
  const errors: string[] = [];

  // Check if slides array exists
  if (!response || typeof response !== 'object') {
    errors.push('Response must be an object');
    return { valid: false, errors };
  }

  if (!Array.isArray(response.slides)) {
    errors.push('Response must contain a "slides" array');
    return { valid: false, errors };
  }

  if (response.slides.length === 0) {
    errors.push('Slides array cannot be empty');
    return { valid: false, errors };
  }

  if (response.slides.length > 20) {
    errors.push('Too many slides (max 20)');
    return { valid: false, errors };
  }

  // Validate each slide
  const sanitizedSlides: SlideSchema[] = [];
  for (let i = 0; i < response.slides.length; i++) {
    const slide = response.slides[i];
    const validation = validateSlide(slide);
    
    if (!validation.valid) {
      errors.push(`Slide ${i + 1}: ${validation.errors.join(', ')}`);
    } else {
      sanitizedSlides.push(validation.sanitized!);
    }
  }

  // If any critical errors, return invalid
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: { slides: sanitizedSlides }
  };
}

// Fallback slides in case of complete failure
export function generateFallbackSlides(businessContext: string): SlideSchema[] {
  return [
    {
      type: 'Title',
      title: 'Your Startup Name',
      content: [
        'Tagline: Transforming the future',
        'Founded: 2024',
        'Location: San Francisco, CA'
      ],
      notes: 'Introduce your company with energy and confidence.',
      visualDescription: 'Modern tech startup logo with gradient colors'
    },
    {
      type: 'Problem',
      title: 'The Problem',
      content: [
        'Challenge 1: Market inefficiency',
        'Challenge 2: High costs',
        'Challenge 3: Poor user experience'
      ],
      notes: 'Explain the pain points your customers face.',
      visualDescription: 'Frustrated users dealing with complex workflows'
    },
    {
      type: 'Solution',
      title: 'Our Solution',
      content: [
        'AI-powered platform',
        '10x faster than alternatives',
        'Simple and intuitive interface'
      ],
      notes: 'Show how your product solves the problem elegantly.',
      visualDescription: 'Clean software interface with happy users'
    },
    {
      type: 'Market',
      title: 'Market Opportunity',
      content: [
        'TAM: $10B+ addressable market',
        'SAM: $1B serviceable market',
        'Growing 25% annually'
      ],
      notes: 'Demonstrate the size and growth of your market.',
      visualDescription: 'Upward trending graph with market data'
    },
    {
      type: 'Traction',
      title: 'Traction',
      content: [
        'Beta users: 500+',
        'Monthly growth: 20%',
        'Customer testimonials: 4.8/5'
      ],
      notes: 'Highlight your momentum and validation.',
      visualDescription: 'Growth charts and happy customer quotes'
    },
    {
      type: 'Team',
      title: 'Our Team',
      content: [
        'CEO: 10 years industry experience',
        'CTO: Stanford CS, ex-Google',
        'Advisors: Top VCs and founders'
      ],
      notes: 'Show why your team is uniquely positioned to win.',
      visualDescription: 'Professional team photo with credentials'
    },
    {
      type: 'Ask',
      title: 'The Ask',
      content: [
        'Raising: $1M seed round',
        'Use of funds: Product 40%, Sales 30%, Hiring 30%',
        'Next milestone: $1M ARR in 12 months'
      ],
      notes: 'Be specific about what you need and how you\'ll use it.',
      visualDescription: 'Clean funding allocation chart'
    }
  ];
}

// Retry configuration
export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number; // milliseconds
  maxDelay: number; // milliseconds
  backoffMultiplier: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 8000, // 8 seconds
  backoffMultiplier: 2
};

// Retry with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
  context: string = 'operation'
): Promise<T> {
  let lastError: any;
  let delay = config.initialDelay;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      console.log(`[Retry] ${context} - Attempt ${attempt}/${config.maxAttempts}`);
      return await fn();
    } catch (error: any) {
      lastError = error;
      console.error(`[Retry] ${context} - Attempt ${attempt} failed:`, error.message);

      // If this was the last attempt, throw
      if (attempt === config.maxAttempts) {
        console.error(`[Retry] ${context} - All ${config.maxAttempts} attempts failed`);
        throw new Error(`${context} failed after ${config.maxAttempts} attempts: ${error.message}`);
      }

      // Wait before retrying
      console.log(`[Retry] ${context} - Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Increase delay for next attempt (exponential backoff)
      delay = Math.min(delay * config.backoffMultiplier, config.maxDelay);
    }
  }

  throw lastError;
}

// Input sanitization
export function sanitizeInput(input: string, maxLength: number = 5000): string {
  if (!input || typeof input !== 'string') return '';
  
  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove any potential script tags or dangerous HTML
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, ''); // Remove inline event handlers
  
  return sanitized;
}

// URL validation (enhanced)
export function validateURL(url: string): { valid: boolean; error?: string; sanitized?: string } {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  const trimmed = url.trim();
  
  // Check length
  if (trimmed.length > 2000) {
    return { valid: false, error: 'URL too long (max 2000 characters)' };
  }

  // Security checks
  const dangerous = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = trimmed.toLowerCase();
  for (const protocol of dangerous) {
    if (lowerUrl.startsWith(protocol)) {
      return { valid: false, error: `Dangerous protocol detected: ${protocol}` };
    }
  }

  // Must start with http:// or https://
  if (!lowerUrl.startsWith('http://') && !lowerUrl.startsWith('https://')) {
    return { valid: false, error: 'URL must start with http:// or https://' };
  }

  // Try to parse as URL
  try {
    new URL(trimmed);
    return { valid: true, sanitized: trimmed };
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// Rate limiting helpers
export interface RateLimitInfo {
  userId: string;
  endpoint: string;
  count: number;
  windowStart: Date;
  limit: number;
  windowMinutes: number;
}

export function checkRateLimit(info: RateLimitInfo): { allowed: boolean; remaining: number; resetAt: Date } {
  const now = new Date();
  const windowMs = info.windowMinutes * 60 * 1000;
  const windowEnd = new Date(info.windowStart.getTime() + windowMs);
  
  // If we're past the window, allow and reset would happen
  if (now >= windowEnd) {
    return {
      allowed: true,
      remaining: info.limit - 1,
      resetAt: new Date(now.getTime() + windowMs)
    };
  }
  
  // Check if under limit
  if (info.count < info.limit) {
    return {
      allowed: true,
      remaining: info.limit - info.count - 1,
      resetAt: windowEnd
    };
  }
  
  // Over limit
  return {
    allowed: false,
    remaining: 0,
    resetAt: windowEnd
  };
}

// Cost tracking
export interface APICallCost {
  endpoint: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUSD: number;
  timestamp: Date;
}

export function estimateGeminiCost(inputChars: number, outputChars: number): number {
  // Gemini 1.5 Pro pricing (approximate)
  // Input: $0.00025 / 1K characters
  // Output: $0.0005 / 1K characters
  
  const inputCost = (inputChars / 1000) * 0.00025;
  const outputCost = (outputChars / 1000) * 0.0005;
  
  return inputCost + outputCost;
}

export function logAPICall(cost: APICallCost): void {
  console.log(`[API Cost] ${cost.endpoint} - ${cost.model}`);
  console.log(`  Input: ${cost.inputTokens} chars, Output: ${cost.outputTokens} chars`);
  console.log(`  Estimated cost: $${cost.estimatedCostUSD.toFixed(4)}`);
}
