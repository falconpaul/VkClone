import { getWordForm } from "./word-forms"

export const calculateAge = (date: string) => {
    const [d1, m1, y1] = date.split('.').map(x => +x)
    const now = new Date()
    const d2 = now.getDate()
    const m2 = now.getMonth()
    const y2 = now.getFullYear()
    return (y2 - y1) - +(m2 < m1 || m2 === m1 && d1 < d2)
}

export const getAgeString = (date: string) => {
    const age = calculateAge(date)
    const word = getWordForm(calculateAge(date), ['год', 'года', 'лет'])
    return `${age} ${word}`
}
