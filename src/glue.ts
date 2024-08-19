const glue = (className: string, externalClassName?: string) => (mods?: string[]) => {
  const arr = externalClassName ? [className, externalClassName] : [className];
  
  if (mods) {
    return arr.reduce((memo: string[], item) => {
      const cry = mods.reduce((memo1: string[], item1: string) => {
        memo1.push(item + item1);

        return memo1;
      }, []);
      let res = memo.concat(cry);

      return res;
    }, []).join(' ');
  }
  
  return arr.join(' ');
};

export default glue;
