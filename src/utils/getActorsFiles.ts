import fs from 'fs';
import { promisify } from 'util';

const directoryPath = '../../data';

type validActors = 'lymrith' | 'robo' | 'bernum' | 'girion' | 'hiroto' | 'ezeri';

export const getActorsFiles = async (actorString: validActors) => {
  const readdir = promisify(fs.readdir);
  try {
    const files = await readdir(directoryPath);
    const regexPattern = new RegExp(`^fvtt-Actor-${actorString.toLowerCase()}.*\\.json$`);
    const matchingFiles = files.filter((file) => regexPattern.test(file));
    return {
      payload: matchingFiles,
      createdTime: new Date(matchingFiles[-1]['createdTime'])
    };
  } catch (err) {
    console.error('Error reading directory:', err);
  }
};