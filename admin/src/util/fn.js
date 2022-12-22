// export debug(e) {
//   console.log(`${e}`)
// }

// 根据记录数取记录集合
export const getListByPage=(list, page, size=10)=>{
  console.log('list'+list)
  return list.filter((item,i)=>{ return ((i<=page*size-1)&&(i>(page-1)*size-1)) })
}

// 取区间随机数[min,max]
export const random =(min,max)=>{
  return Math.floor(Math.random()*(max-min+1)+min)
}

// 同步延时函数
export const delay = (delayms) =>{
  return new Promise((resolve, reject) => { setTimeout(resolve, delayms) })
}


export const fileToBlob = async (file, w, h, q=0.7)=>{
    let f = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not create canvas context')
    ctx.drawImage(f, 0, 0, f.width, f.height, 0, 0, w, h)
    return  await new Promise(r => canvas.toBlob(r, "image/jpeg", q))
}

