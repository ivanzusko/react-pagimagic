const glue = (className: string, externalClassName?: string) => (mods?: string[]) => {
  const arr = externalClassName != null ? [className, externalClassName] : [className]

  if (mods != null) {
    return arr.reduce((memo: string[], item) => {
      const cry = mods.reduce((memo1: string[], item1: string) => {
        memo1.push(item + item1)

        return memo1
      }, [])
      const res = memo.concat(cry)

      return res
    }, []).join(' ')
  }

  return arr.join(' ')
}

export default glue
