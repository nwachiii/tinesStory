import slugifyLib from 'slugify';

export const generateSlug = (title: string): string => {
  return slugifyLib(title, {
    lower: true,
    strict: true,
    trim: true,
  });
};

export const generateUniqueSlug = async (
  title: string,
  model: any,
  existingId?: string
): Promise<string> => {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await model.findOne({ slug });
    
    if (!existing || (existingId && existing._id.toString() === existingId)) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

