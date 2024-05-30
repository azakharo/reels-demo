export const isProduction = import.meta.env.PROD;

// Returns true only if the value is "true"
export const checkBoolEnvVar = (value: string | undefined): boolean =>
  value === 'true';
