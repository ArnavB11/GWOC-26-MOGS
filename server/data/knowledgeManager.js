/**
 * Knowledge Manager - Manages dynamic knowledge base updates
 * Merges static knowledge with dynamic knowledge from database
 * and maintains the Fuse.js search index
 */

import Fuse from 'fuse.js';
import { knowledge } from './knowledge.js';
import { generateKnowledgeFromDatabase } from './generateKnowledge.js';

// Global Fuse instance that gets updated
let fuseKnowledge = null;

// Fuse.js configuration
const fuseOptions = {
    keys: ['tags'],
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true
};

/**
 * Rebuilds the knowledge index by:
 * 1. Loading static knowledge
 * 2. Generating dynamic knowledge from database
 * 3. Merging both arrays
 * 4. Rebuilding Fuse.js index
 * 
 * @param {Object} db - SQLite database instance
 * @returns {Promise<Fuse>} - The rebuilt Fuse instance
 */
export async function rebuildKnowledgeIndex(db) {
    try {
        // Load static knowledge
        const staticKnowledge = knowledge;

        // Generate dynamic knowledge from database
        const dynamicKnowledge = await generateKnowledgeFromDatabase(db);

        // Merge static and dynamic knowledge
        const mergedKnowledge = [...staticKnowledge, ...dynamicKnowledge];

        // Rebuild Fuse.js index
        fuseKnowledge = new Fuse(mergedKnowledge, fuseOptions);

        console.log(`✅ Knowledge index rebuilt: ${staticKnowledge.length} static + ${dynamicKnowledge.length} dynamic = ${mergedKnowledge.length} total entries`);

        return fuseKnowledge;
    } catch (error) {
        console.error('❌ Error rebuilding knowledge index:', error);
        // Fallback to static knowledge only if dynamic generation fails
        if (!fuseKnowledge) {
            fuseKnowledge = new Fuse(knowledge, fuseOptions);
        }
        return fuseKnowledge;
    }
}

/**
 * Gets the current Fuse.js knowledge instance
 * @returns {Fuse|null} - Current Fuse instance or null if not initialized
 */
export function getFuseKnowledge() {
    return fuseKnowledge;
}

/**
 * Initializes the knowledge index (should be called on server start)
 * @param {Object} db - SQLite database instance
 * @returns {Promise<Fuse>} - The initialized Fuse instance
 */
export async function initializeKnowledge(db) {
    return await rebuildKnowledgeIndex(db);
}

