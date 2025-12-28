/**
 * Test katakana character lookup
 */

import { findKatakana, ALL_KATAKANA } from '../lib/katakana';
import { splitJapaneseIntoCharacters } from '../lib/answerAnalysis';

describe('Katakana Lookup', () => {
  it('should find basic katakana characters', () => {
    const za = findKatakana('ザ');
    expect(za).toBeDefined();
    expect(za?.katakana).toBe('ザ');
    expect(za?.romanji).toContain('za');
  });

  it('should find combo katakana characters', () => {
    const hya = findKatakana('ヒャ');
    console.log('findKatakana(ヒャ):', hya);
    expect(hya).toBeDefined();
    expect(hya?.katakana).toBe('ヒャ');
    expect(hya?.romanji).toContain('hya');

    const pyo = findKatakana('ピョ');
    console.log('findKatakana(ピョ):', pyo);
    expect(pyo).toBeDefined();
    expect(pyo?.katakana).toBe('ピョ');
    expect(pyo?.romanji).toContain('pyo');
  });

  it('should have all combo characters in ALL_KATAKANA', () => {
    console.log('ALL_KATAKANA length:', ALL_KATAKANA.length);
    console.log('Combo characters:', ALL_KATAKANA.filter(c => c.type === 'combo').map(c => c.katakana));

    const hyaInArray = ALL_KATAKANA.some(c => c.katakana === 'ヒャ');
    const pyoInArray = ALL_KATAKANA.some(c => c.katakana === 'ピョ');
    const zaInArray = ALL_KATAKANA.some(c => c.katakana === 'ザ');

    expect(hyaInArray).toBe(true);
    expect(pyoInArray).toBe(true);
    expect(zaInArray).toBe(true);
  });

  it('should split ヒャピョザ correctly', () => {
    const chars = splitJapaneseIntoCharacters('ヒャピョザ');
    console.log('splitJapaneseIntoCharacters(ヒャピョザ):', chars);

    expect(chars).toHaveLength(3);
    expect(chars[0]).toBe('ヒャ');
    expect(chars[1]).toBe('ピョ');
    expect(chars[2]).toBe('ザ');

    // Can we find each one?
    const found0 = findKatakana(chars[0]);
    const found1 = findKatakana(chars[1]);
    const found2 = findKatakana(chars[2]);

    console.log('Found ヒャ:', found0);
    console.log('Found ピョ:', found1);
    console.log('Found ザ:', found2);

    expect(found0).toBeDefined();
    expect(found1).toBeDefined();
    expect(found2).toBeDefined();
  });
});
