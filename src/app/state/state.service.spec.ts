import { StateService } from './state.service';

describe('StateService', () => {

  const key = 'foo';
  let value: string;

  beforeEach(() => {
    value = Math.random().toString(36).substring(9);
  });

  const originDetectLocalStorage = StateService.detectLocalStorage;
    
  describe('set()', () => {
    it('should persist value in local storage', () => {
      StateService.set(key, value);
      expect(value).toEqual(localStorage.getItem(key));
    });

    describe('if no local storage detected', () => {
      beforeEach(() => {
        StateService.detectLocalStorage = () => {return false}
      });

      afterEach(() => {
        StateService.detectLocalStorage = originDetectLocalStorage;
      });

      it('should fall back to persisting value in cookie', () => {
        StateService.set(key, value);
        expect(document.cookie).toContain(`${key}=${value}`);
      }); 
    });
  });

  describe('get()', () => {
    it('should return value from local storage', () => {
      localStorage.setItem(key, value);
      expect(StateService.get(key)).toEqual(value);
    });

    describe('if no local storage detected', () => {
      beforeEach(() => {
        StateService['detectLocalStorage'] = () => {return false}
      });

      afterEach(() => {
        StateService['detectLocalStorage'] = originDetectLocalStorage;
      });

      it('should fall back to returning value in cookie', () => {
        StateService.setCookie(key, value);
        expect(value).toEqual(StateService.get(key));
      }); 

    });
  });

});
