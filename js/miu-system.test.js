(() => {
  const { M, I, U, rule1, rule2, rule3, rule4 } = MIU;
  
  describe('Rule 1', () => {
    it('should add U when the last letter is I', () => {
      expect(
        rule1([M,U,I])
      ).toEqual([M,U,I,U]);
    });
    
    it('should throw a TypeError when the last letter isn\'t I', () => {
      expect(() => {
        rule1([M,I,U]);
      }).toThrow(TypeError);
    });
  });
  
  describe('Rule 2', () => {
    it('should duplicate the ending when the first letter is M', () => {
      expect(
        rule2([M,U,U,I])
      ).toEqual([M,U,U,I,U,U,I]);
    });
    
    /* disable this limitation for interactive
    it('should throw a RangeError when the array is larger than 50 characters', () => {
      const arr = [];
      for (let i = 0; i < 51; i++) {
        arr.push(M);
      }
      expect(() => {
        rule2(arr);
      }).toThrow(RangeError);
    });
    */
    
    it('should throw a TypeError when the first letter is not M', () => {
      expect(() => {
        rule2([I,U]);
      }).toThrow(TypeError);
    });
  });
  
  describe('Rule 3', () => {
    it('should replace III with U', () => {
      expect(
        rule3([M,I,I,I,U])
      ).toEqual([[M,U,U]]);
    });
    
    it('should give multiple results when there are multiple solutions', () => {
      expect(
        rule3([M,I,I,I,I,U,I,I,I])
      ).toEqual([
        [M,U,I,U,I,I,I],
        [M,I,U,U,I,I,I],
        [M,I,I,I,I,U,U],
      ]);
    });
    
    it('should throw a TypeError when there are no instances of III', () => {
      expect(() => {
        rule3([M,U,I])
      }).toThrow(TypeError);
    });
  });
  
  describe('Rule 4', () => {
    it('should drop UU', () => {
      expect(
        rule4([M,U,U,I])
      ).toEqual([[M,I]]);
    });
    
    it('should give multiple results when there are multiple solutions and clean up results', () => {
      expect(
        rule4([M,U,U,U,I,U,U])
      ).toEqual([
        [M,U,I,U,U],
        [M,U,U,U,I],
      ]);
    });
    
    it('should throw a TypeError when there are no instances of UU', () => {
      expect(() => {
        rule4([M,U,I,I]);
      }).toThrow(TypeError);
    })
  });
})();