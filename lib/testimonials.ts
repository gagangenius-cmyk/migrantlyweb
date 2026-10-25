export interface Testimonial {
  quote: string;
  name: string;
  /** Optional line under the name, e.g. "Skilled Worker, Canada". */
  detail?: string;
  /** Optional photo in /public, with the person's permission. */
  photo?: string;
}

/**
 * Add real client testimonials here, with the client's permission. While this list is empty the
 * home page shows Migrantly's commitments instead. Do not add placeholder or invented reviews.
 */
export const testimonials: Testimonial[] = [];
