export const pareseError = (error: any) => {
    const errorMsg = error.error.includes(":") ? error.error.split(":")[0] : null
    console.log({error: error.error})
        
        return errorMsg

}