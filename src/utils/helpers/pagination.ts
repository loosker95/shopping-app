export const pagination = ((page?: number, limit?: number) => {
    const pages = page
    const limits = limit
    const startIndex = (pages - 1) * limits
    const endIndex = pages * limits
})