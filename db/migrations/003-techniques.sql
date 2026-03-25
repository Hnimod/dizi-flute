-- Add techniques column to songs table (JSON array of technique IDs)
ALTER TABLE songs ADD COLUMN techniques TEXT DEFAULT '[]';
