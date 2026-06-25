import resumeData from './resume.json';

export const resume = resumeData;

export const resumeLinks = {
  email: `mailto:${resume.email}`,
  website: `https://${resume.website}`,
  github: `https://${resume.github}`,
  linkedin: 'https://www.linkedin.com/in/nmaass/',
};

export const bookingUrl = 'https://calendar.app.google/tSLRNcWWUGzvcrnf7';
