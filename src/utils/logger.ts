/**
 * Logger Utility
 * 
 * Conditionally logs messages based on environment.
 * In production, only errors are logged.
 * In development, all log levels are enabled.
 */

// Safely access environment variables with fallbacks
// In some environments import.meta.env might be undefined
const getEnv = () => {
  try {
    return import.meta.env || {};
  } catch {
    return {};
  }
};

const env = getEnv();
const isDevelopment = env.DEV ?? true; // Default to true if unknown, to see logs
const isProduction = env.PROD ?? false;

interface LogMetadata {
  timestamp?: Date;
  context?: string;
  [key: string]: any;
}

class Logger {
  private formatMessage(level: string, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const context = metadata?.context ? `[${metadata.context}]` : '';
    return `${timestamp} ${level} ${context} ${message}`;
  }

  /**
   * Debug level logging - only in development
   */
  debug(message: string, ...args: any[]) {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Info level logging - only in development
   */
  log(message: string, ...args: any[]) {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Info alias
   */
  info(message: string, ...args: any[]) {
    this.log(message, ...args);
  }

  /**
   * Warning level - logged in all environments
   */
  warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  /**
   * Error level - logged in all environments
   */
  error(message: string, error?: Error | unknown, ...args: any[]) {
    console.error(`[ERROR] ${message}`, error, ...args);
    
    // TODO: Send to error tracking service in production
    if (isProduction && error instanceof Error) {
      // trackError(message, error);
    }
  }

  /**
   * Success messages - only in development
   */
  success(message: string, ...args: any[]) {
    if (isDevelopment) {
      console.log(`✅ ${message}`, ...args);
    }
  }

  /**
   * API call logging - only in development
   */
  api(method: string, endpoint: string, data?: any) {
    if (isDevelopment) {
      console.log(`[API] ${method} ${endpoint}`, data);
    }
  }

  /**
   * Database operation logging - only in development
   */
  db(operation: string, table: string, data?: any) {
    if (isDevelopment) {
      console.log(`[DB] ${operation} on ${table}`, data);
    }
  }

  /**
   * Performance timing
   */
  time(label: string) {
    if (isDevelopment) {
      console.time(label);
    }
  }

  timeEnd(label: string) {
    if (isDevelopment) {
      console.timeEnd(label);
    }
  }

  /**
   * Group logging - only in development
   */
  group(label: string) {
    if (isDevelopment) {
      console.group(label);
    }
  }

  groupEnd() {
    if (isDevelopment) {
      console.groupEnd();
    }
  }

  /**
   * Table logging - only in development
   */
  table(data: any) {
    if (isDevelopment) {
      console.table(data);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for convenience
export default logger;

// Type-safe context logger factory
export const createContextLogger = (context: string) => ({
  debug: (message: string, ...args: any[]) => logger.debug(`[${context}] ${message}`, ...args),
  log: (message: string, ...args: any[]) => logger.log(`[${context}] ${message}`, ...args),
  info: (message: string, ...args: any[]) => logger.info(`[${context}] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => logger.warn(`[${context}] ${message}`, ...args),
  error: (message: string, error?: any, ...args: any[]) => logger.error(`[${context}] ${message}`, error, ...args),
  success: (message: string, ...args: any[]) => logger.success(`[${context}] ${message}`, ...args),
  api: (method: string, endpoint: string, data?: any) => logger.api(method, `${context}/${endpoint}`, data),
});
