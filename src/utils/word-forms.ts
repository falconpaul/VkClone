// getWordForm(1, ['год', 'года', 'лет']) === 'год'
// getWordForm(2, ['год', 'года', 'лет']) === 'года'
// getWordForm(5, ['год', 'года', 'лет']) === 'лет'
export const getWordForm = (n: number, forms: string[]) => {
    n %= 100
    if (Math.floor(n / 10) === 1) return forms[2]
    n %= 10
    if (n === 1) return forms[0]
    if (n >= 2 && n <= 4) return forms[1]
    return forms[2]
}
