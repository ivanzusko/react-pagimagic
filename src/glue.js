const glue = (className, johnny) => mods => {
  const arr = johnny ? [className, johnny] : [className];
  
  if (mods) {
    return arr.reduce((memo, item) => {
      const cry = mods.reduce((memo1, item1) => {
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
