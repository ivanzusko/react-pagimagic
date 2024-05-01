import glue from '../glue';

describe('glue', () => {
  it('should glue the default class names', () => {
    const className = undefined;
    const str = glue('Pagimagic', className)(['__nav-item', '__nav-item--test', '__nav-item--more-test']);
    
    expect(str).toBe('Pagimagic__nav-item Pagimagic__nav-item--test Pagimagic__nav-item--more-test');
  });

  it('should glue the default and custom class names', () => {
    const className = 'test-class-name';
    const str = glue('Pagimagic', className)(['__nav-item', '__nav-item--test', '__nav-item--more-test']);
    
    expect(str).toBe('Pagimagic__nav-item Pagimagic__nav-item--test Pagimagic__nav-item--more-test test-class-name__nav-item test-class-name__nav-item--test test-class-name__nav-item--more-test');
  });
});
