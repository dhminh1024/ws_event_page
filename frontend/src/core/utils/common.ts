import { parse } from 'date-fns'

export const parseDate = (strDate?: string, format?: string) => {
    if (!strDate) return new Date()
    return parse(
        strDate.replace(/\.\d{3,}/, ''),
        format || 'yyyy-MM-dd HH:mm:ss',
        new Date(),
    )
}